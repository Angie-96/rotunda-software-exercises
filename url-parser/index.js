const form = document.querySelector("form");
const resultContainer = document.querySelector(".result");
const resultElem = document.querySelector(".result code");

form.addEventListener("submit", displayResult);

function displayResult(event) {
  const urlFormatString = document.getElementById("formatString").value;
  const urlInstance = document.getElementById("urlInstance").value;

  resultElem.textContent = parseVariables(urlFormatString, urlInstance);
  resultContainer.style.opacity = 1;

  event.preventDefault();
}

function parseVariables(urlFormatString, urlInstance) {
  const paramRegex = /([a-zA-Z]+=[a-zA-Z0-9]+)/g;
  const varRegex = /(?<=\/)[\w:-]+/g;

  const varKeys = urlFormatString.match(varRegex);
  const varValues = urlInstance.match(varRegex);

  const getVarObj = () => {
    if (varKeys?.length !== varValues?.length) {
      return {
        error:
          "The number of variables and their values do not match or there are none",
      };
    }

    return varKeys.reduce((acc, varKey, i) => {
      if (varKey.startsWith(":")) {
        return { ...acc, [varKey.substring(1)]: varValues[i] };
      }
      return acc;
    }, {});
  };

  let resultVars = getVarObj();

  const paramsKeys = urlInstance.match(paramRegex);

  const getParamsObj = () => {
    return paramsKeys?.reduce((acc, paramKey) => {
      const paramKeyValue = paramKey.split("=");
      return { ...acc, [paramKeyValue[0]]: paramKeyValue[1] };
    }, {});
  };

  let resultParams = getParamsObj();

  const result = { ...resultVars, ...resultParams };

  return JSON.stringify(result, null, 4);
}

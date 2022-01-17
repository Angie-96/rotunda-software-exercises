const form = document.querySelector("form");
const resultContainer = document.querySelector(".result");
const resultElem = document.querySelector(".result code");

form.addEventListener("submit", displayResult);

function displayResult(event) {
  const urlFormatString = document.getElementById("formatString").value;
  const urlInstance = document.getElementById("urlInstance").value;

  resultElem.textContent = parseURL(urlFormatString, urlInstance);
  resultContainer.style.opacity = 1;

  event.preventDefault();
}

function parseURL(urlFormatString, urlInstance) {
  const getVariables = (str) => {
    const strWithoutParams = str.split("?")[0];
    return strWithoutParams?.split("/").slice(1);
  };

  const getParams = (str) => {
    const paramsStr = str.split("?")[1];
    return paramsStr?.split("&");
  };

  const varKeys = getVariables(urlFormatString);
  const varValues = getVariables(urlInstance);

  const paramsKeys = getParams(urlInstance);

  const parseVariables = () => {
    if (varKeys?.length !== varValues?.length) {
      return {
        error:
          "The number of variables and their values do not match or there are none",
      };
    }

    return varKeys?.reduce((acc, varKey, i) => {
      if (varKey.startsWith(":")) {
        return { ...acc, [varKey.substring(1)]: varValues[i] };
      }
      return acc;
    }, {});
  };

  let resultVars = parseVariables();

  const parseParams = () => {
    return paramsKeys?.reduce((acc, paramKey) => {
      const paramKeyValue = paramKey.split("=");
      return { ...acc, [paramKeyValue[0]]: paramKeyValue[1] };
    }, {});
  };

  let resultParams = parseParams();

  return JSON.stringify({ ...resultVars, ...resultParams }, null, 4);
}

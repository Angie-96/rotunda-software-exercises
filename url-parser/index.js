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
  let result = {};

  const varRegex = /(?<=\:)([^/]+)(?=\/*)/gi;
  const paramRegex = /([a-zA-Z]+=[a-zA-Z0-9]+)/g;
  const urlInstanceRegex = /(?<=\/)(?!api\b)[\w-]+/g;

  const varKeys = urlFormatString.match(varRegex);
  const varValues = urlInstance.match(urlInstanceRegex);

  const convertToObj = (keys, values) => {
    if (
      keys.length != values.length ||
      keys.length == 0 ||
      values.length == 0
    ) {
      return {};
    }

    return Object.assign(...keys.map((k, i) => ({ [k]: values[i] })));
  };

  result = convertToObj(varKeys, varValues);

  const paramsKeys = urlInstance.match(paramRegex);
  paramsKeys.forEach((el) => (result[el.split("=")[0]] = el.split("=")[1]));

  return JSON.stringify(result, undefined, 4);
}

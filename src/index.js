import { TCString } from "@iabtcf/core";

function getConsentString() {
  const consentStringInput =
    document.getElementById("consentstringinput").value;

  try {
    const decodedString = TCString.decode(consentStringInput);
    console.log(decodedString);

    for (let key in decodedString) {
      if (decodedString.hasOwnProperty(key)) {
        addResult(key, decodedString[key]);
      }
    }
  } catch (error) {
    alert("Invalid consent string");
    return;
  }
}

function addResult(key, value) {
  const resultDiv = document.getElementById("result");

  const ulElement = document.createElement("ul");
  ulElement.classList.add("list-group", "mb-3", "list-group-horizontal");

  const liElementKey = document.createElement("li");
  liElementKey.classList.add("list-group-item");

  const textNodeKey = document.createTextNode(key);
  liElementKey.appendChild(textNodeKey);

  const liElementValue = document.createElement("li");
  liElementValue.classList.add("list-group-item");

  const textNodeValue = document.createTextNode(value);
  liElementValue.appendChild(textNodeValue);

  ulElement.appendChild(liElementKey);
  ulElement.appendChild(liElementValue);

  resultDiv.insertAdjacentElement("afterend", ulElement);
}

const submitButton = document.getElementById("consentstringsubmit");
submitButton.addEventListener("click", () => {
  getConsentString();
});

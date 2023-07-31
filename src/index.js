import { TCString } from "@iabtcf/core";
import accordion from "./templates/accordion.njk";
import tabledata from "./templates/tabledata.njk";
import results from "./templates/results.njk";

function getConsentString() {
  const consentStringInput = document
    .getElementById("consentstringinput")
    .value.trim();
  try {
    const decodedString = TCString.decode(consentStringInput);
    processConsentString(decodedString);
  } catch (error) {
    console.log(error);
    alert("Invalid consent string");
    return;
  }
}

function processConsentString(decodedString) {
  console.log(decodedString);
  addResultHtmlWrapper();

  for (let key in decodedString) {
    if (decodedString.hasOwnProperty(key)) {
      if (!shouldShowToUser(key)) {
        continue;
      }

      if (
        typeof decodedString[key] !== "object" ||
        key == "created" ||
        key == "lastUpdated"
      ) {
        addResult(key, decodedString[key]);
      } else if (typeof decodedString[key] == "object") {
        addListResult(key, decodedString[key]);
      }
    }
  }
}

function addResultHtmlWrapper() {
  var resultsHtmlWrapper = results();

  document.getElementById("result").innerHTML = resultsHtmlWrapper;
}

function addResult(key, value) {
  console.log(key);

  var tableDataHtml = tabledata({
    key: key,
    value: value,
  });

  var nodeToInsert = document.createElement("tr");
  nodeToInsert.classList.add("mb-3");
  nodeToInsert.innerHTML = tableDataHtml;

  document.getElementById("tableresult").appendChild(nodeToInsert);
}

function shouldShowToUser(name) {
  const namesToShow = {
    specialFeatureOptins: true,
    purposeConsents: true,
    purposeLegitimateInterests: true,
    vendorConsents: true,
    vendorLegitimateInterests: true,
    created: true,
    lastUpdated: true,
    cmpId_: true,
    cmpVersion_: true,
    consentScreen_: true,
    consentLanguage_: true,
    vendorListVersion_: true,
    policyVersion_: true,
    isServiceSpecific_: true,
    useNonStandardStacks_: true,
    purposeOneTreatment_: true,
    publisherCountryCode_: true,
  };

  return namesToShow.hasOwnProperty(name);
}

function addListResult(key, obj) {
  var tableDataHtml = "";
  obj.forEach((v, i) => {
    tableDataHtml += tabledata({
      key: i,
      value: v,
    });
  });

  var fullAccHtml = accordion({
    tabledata: tableDataHtml,
    category: key,
    id: "Collapse" + key,
  });

  const accordionInDom = document.getElementById("dataAccordion");

  var nodeToInsert = document.createElement("div");
  nodeToInsert.innerHTML = fullAccHtml;
  accordionInDom.appendChild(nodeToInsert);
}

const submitButton = document.getElementById("consentstringsubmit");
submitButton.addEventListener("click", () => {
  getConsentString();
});

"use strict";

let tipPercent = undefined;
let billValue = undefined;
let ppl = undefined;

const bill = document.querySelector("#bill");
const customIp = document.querySelector("#tip");
const numberOfPPL = document.querySelector("#number-of-ppl");

const tipContainer = document.querySelector(".tip-options");
const tipOptions = document.querySelectorAll(".tip-option");
const resInfoValues = document.querySelectorAll(".res-info-value span");
const tipPerPerson = resInfoValues[0];
const totalPerPerson = resInfoValues[1];
const errorIdx = document.querySelectorAll(".error");
const resetBtn = document.querySelector("#reset-btn");

// function for rendering error
const generateError = function (idx, msg) {
   errorIdx[idx].textContent = `${msg}`;
   errorIdx[idx].classList.remove("error-hidden");
};

// function for resetting error
const resetError = function (idx) {
   errorIdx[idx].textContent = "";
   errorIdx[idx].classList.add("error-hidden");
};

// function for resetting tip options
const resetTip = function () {
   tipOptions.forEach((tip) => {
      if (tip.classList.contains("custom-tip")) tip.value = "";
      tip.classList.remove("active");
   });
};

// function for resetting result tab
const resetResult = function () {
   tipPerPerson.textContent = "0.00";
   totalPerPerson.textContent = "0.00";
};

// function for rendering result
const renderResult = (billValue, tipPercent, ppl) => {
   let tipAmount = parseFloat((billValue * tipPercent) / 100);
   let totalBill = parseFloat(billValue + tipAmount);
   tipPerPerson.textContent = parseFloat(tipAmount / ppl).toFixed(2);
   totalPerPerson.textContent = parseFloat(totalBill / ppl).toFixed(2);
};

// function for resetting app
const reset = function () {
   bill.value = "";
   numberOfPPL.value = "";
   resetResult();
   errorIdx.forEach((err, idx) => resetError(idx));
   resetTip();
   tipPercent = ppl = billValue = undefined;
};

// function for validating bill input
const validateBill = function (billEvent) {
   if (billEvent.value < 0) {
      generateError(0, "Bill can't be less than 0");
      billEvent.value = "";
      billValue = undefined;
   } else {
      resetError(0);
      billValue = parseFloat(billEvent.value);
   }
};

// function for validating custom tip input
const validateTip = function (tipEvent) {
   if (tipEvent.value < 0) {
      generateError(1, "Tip can't be less than 0");
      tipEvent.value = "";
      tipPercent = undefined;
   } else {
      resetError(1);
      tipPercent = parseFloat(tipEvent.value);
   }
};

// function for validating number of ppl input
const validatePPl = function (pplEvent) {
   if (pplEvent.value < 1) {
      generateError(2, "Can't be less than 0");
      pplEvent.value = "";
      ppl = undefined;
      return false;
   } else {
      resetError(2);
      ppl = parseFloat(pplEvent.value);
      return true;
   }
};

// EVENT DELEGATION: on tip-option container
tipContainer.addEventListener("click", function (e) {
   const tip = e.target.closest(".tip-option");
   numberOfPPL.value = "";
   resetTip();
   if (!tip.classList.contains("#tip")) {
      tipPercent = parseFloat(tip.textContent);
      resetTip();
      tip.classList.add("active");
      resetError(1);
   }
});

// taking bill input
bill.addEventListener("input", function (e) {
   validateBill(e.target);
});

// taking custom input
customIp.addEventListener("input", function (e) {
   validateTip(e.target);
});

// taking number of ppl input & rendering result
numberOfPPL.addEventListener("input", function (e) {
   if (!validatePPl(e.target)) return;
   if (!billValue) {
      generateError(0, "Please input bill");
      e.target.value = "";
      return;
   }
   if (!tipPercent) {
      if (!customIp.value) {
         generateError(1, "Please select tip %");
         e.target.value = "";
         return;
      } else {
         tipPercent = parseFloat(customIp.value);
      }
   }
   renderResult(billValue, tipPercent, ppl);
});

// reset button logic
resetBtn.addEventListener("click", reset);

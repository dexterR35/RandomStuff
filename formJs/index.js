
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDiOqUAHF9DX9x-VdRhaGPc2_Yfj305Jxc",
  authDomain: "netbet-ea33f.firebaseapp.com",
  databaseURL:
    "https://netbet-ea33f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "netbet-ea33f",
  storageBucket: "netbet-ea33f.appspot.com",
  messagingSenderId: "184670151760",
  appId: "1:184670151760:web:08506858f2b8843fb19d55",
  measurementId: "G-7FX1PZEFQW",
};
document.addEventListener("DOMContentLoaded", function () {
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const dataForm = document.getElementById("dataForm");
const submitBtn = document.getElementById("submitBtn");
const messageDiv = document.getElementById("messageDiv");

const phoneInput = document.getElementById("_phone");

const inputDiv = document.querySelectorAll("input");
const labelDiv = document.querySelectorAll("label");
const parentInput = document.querySelectorAll(".float-label-input");

const dataForms = document.getElementById("dataForm");
const textChange = document.querySelector(".text-if");
const titleChange = document.querySelector(".title-if");
const hRef = document.getElementById("hRef");
const imageSwitch = document.querySelector("img");

function validateAndSetColor(inputElement) {
if (inputElement) {
const isValid = inputElement.value.trim() !== "";
inputElement.style.borderColor = isValid ? "var(--color_blue)" : "var(--color_red)";
return isValid;
}
return false;
}
function attachInputEventListeners(inputElements) {
Object.values(inputElements).forEach((inputElement) => {
if (inputElement) {  // Check if the element exists
  inputElement.addEventListener("input", () => {
    validateAndSetColor(inputElement);
    checkFormValidity(inputElements);
  });
} else {
  console.log("Input element not found:", inputElement);
}
});
}

function validatePhoneInput(phoneInput) {
let phoneValue = phoneInput.value.replace(/\D/g, "");
const maxLength = 10;
const prefix = "07";

if (phoneValue.length > maxLength) {
phoneValue = phoneValue.slice(0, maxLength);
phoneInput.value = phoneValue;
}

const isValid =
phoneValue.startsWith(prefix) && phoneValue.length === maxLength;
phoneInput.style.borderColor = isValid ? "var(--color_blue)" : "var(--color_red)";

if (isValid) {
messageDiv.innerHTML = "Numar valid";
messageDiv.classList.add("success");
} else {
messageDiv.innerHTML = "Adauga un Numar valid";
messageDiv.classList.remove("success");
}

phoneInput.addEventListener("blur", () => {
messageDiv.innerHTML = "";
});

return isValid;
}

function checkFormValidity(inputElements) {
const areAllValid = Object.values(inputElements).every((inputElement) =>
validateAndSetColor(inputElement)
);
if (areAllValid) {
submitBtn.disabled = false;
submitBtn.classList.remove("_disabled");
submitBtn.style.background = "var(--button_color)";
} else {
submitBtn.disabled = true;
submitBtn.classList.add("_disabled");
submitBtn.style.background = "gray";
}
}

if (dataForm) {
dataForm.style.display = "block";
textChange.innerHTML =
"Te rugăm să completezi formularul de mai jos pentru a intra în posesia premiului.";
titleChange.innerHTML = "Felicitări!";
submitBtn.innerHTML = "TRIMITE";
}

function handleFormSubmission() {

const inputElements = {
name: document.getElementById("_name"),
lastName: document.getElementById("_lastName"),
phone: document.getElementById("_phone"),
county: document.getElementById("_county"),
city: document.getElementById("_city"),
street: document.getElementById("_street"),
building: document.getElementById("_building"),
houseNr: document.getElementById("_houseNr"),
stair: document.getElementById("_stair"),
floor: document.getElementById("_floor"),
appartement: document.getElementById("_appartement"),
postalCode: document.getElementById("_postalCode"),
userName: document.getElementById("_userName")
};

attachInputEventListeners(inputElements);

phoneInput.addEventListener("input", () => {
validatePhoneInput(phoneInput);
});

submitBtn.disabled = true;
submitBtn.style.backgroundColor = "gray";

submitBtn.addEventListener("click", async (event) => {
event.preventDefault();

const isPhoneNumberValid = /^07\d{8}$/.test(inputElements.phone.value);
const areAllValid = Object.values(inputElements).every((inputElement) =>
  validateAndSetColor(inputElement)
);

if (!isPhoneNumberValid) {
  messageDiv.innerHTML = "Adauga un numar valid";
  return;
}

if (!areAllValid) {
  messageDiv.innerHTML = "Vă rugăm să completați toate câmpurile";
  return;
}

const data = {
  destinatar_nume: inputElements.name.value,
  destinatar_prenume: inputElements.lastName.value,
  destinatar_telefon: inputElements.phone.value,
  destinatar_judet: inputElements.county.value,
  destinatar_oras: inputElements.city.value,
  destinatar_strada: inputElements.street.value,
  destinatar_bloc: inputElements.building.value,
  destinatar_nr: inputElements.houseNr.value,
  destinatar_scara: inputElements.stair.value,
  destinatar_etaj: inputElements.floor.value,
  destinatar_apartament: inputElements.appartement.value,
  destinatar_codpostal: inputElements.postalCode.value,
  destinatar_userName: inputElements.userName.value
};

try {
  const docRef = await addDoc(
    collection(db, "euro_2024_premii"),
    data
  );

  if (dataForm) {
    dataForm.reset();
    updateContent();
    Object.values(inputElements).forEach((inputElement) => {
      if (inputElement) {
        inputElement.style.borderColor = "";
      }
    });
  }
  console.log(data, "added successfully");
  return "Data added successfully";
} catch (error) {
  console.log(`Error adding data: ${error}`);
  messageDiv.classList.remove("success");
}
});
}

handleFormSubmission();

inputDiv.forEach((input) => {
input.classList.add(
"w-full",
"bg-white",
"focus:outline-none",
"focus:shadow-outline",
"border",
"border-gray-400",
"py-[12px]",
"px-[10px]",
"block",
"appearance-none",
"leading-normal",
"focus:var(--color_blue)",
"rounded-md",
"shadow_custom",
"text-field-input"
);
});

parentInput.forEach((parent) => {
parent.classList.add("lg:mt-[30px]", "mt-[23px]", "relative");
});

labelDiv.forEach((label) => {
label.classList.add(
"absolute",
"top-[14px]",
"left-[5px]",
"focus:shadow-outline",
"text-gray-400",
"text-[14px]",
"lg:text-[16px]",
"pointer-events-none",
"transition",
"duration-200",
"ease-in-out",
"bg-transparent",
"px-3",
"text-gray-600",
"rounded-t-lg"
);
});

function updateContent() {
dataForms.style.display = "none";
textChange.innerHTML =
"Ai completat formularul. Premiile ți-au fost alocate.";
titleChange.innerHTML = "Felicitări!";
submitBtn.innerHTML = "Continua";
submitBtn.removeAttribute("id", "submitBtn");
hRef.setAttribute("href", "https://www.google.ro");
hRef.setAttribute("target", "_self");
hRef.style.margin = "auto";
imageSwitch.style.display = "none";
}

$(".text-field-input").on("focus", function () {
$(this).closest(".float-label-input").addClass("focused");
});

$(".text-field-input").on("blur", function () {
if ($(this).val() === "") {
$(this).closest(".float-label-input").removeClass("focused");
}
});
});

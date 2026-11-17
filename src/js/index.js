import { getActivites, filterActiviteParTheme } from "./main.js";

// =====================================
let activites = [];
// =====================================

const btnSendNom = document.getElementById("send-nom");
const nomComplet = document.getElementById("nom");
const popupNomComplet = document.getElementById("popup-nom-complet");
const containerActivites = document.getElementById("container-activites");
const searchInput = document.getElementById("search-input");
const filtrageTheme = document.getElementById("filtrage-theme");
const btnCreateActivite = document.getElementById("btn-create-activite");
const formCreateParticipant = document.getElementById(
  "form-create-participant",
);
const openPopup = document.getElementById("open-popup");
const closePopup = document.getElementById("close-popup");

const passDataToVariable = async () => {
  activites = await getActivites();
  AffichageActivites(activites);
  checkName();
};

// AFFICHAGE DE L'ACTIVITE:
const AffichageActivites = (acts) => {
  containerActivites.innerHTML = ``;

  acts.forEach((ac) => {
    containerActivites.innerHTML += `
        <article class="bg-red-300 rounded-2xl py-2 px-4">
            <h3 class="text-[20px] font-semibold">${ac.titre}</h3>
            <p class="text-[17px] line-clamp-2 my-1">${ac.description}</p>
            <p class="line-clamp-1 my-1">Objectife : ${ac.objectifs}</p>
            <p>Auteur : ${ac.auteur}</p>
            <div class="mt-4">
                <span class="bg-amber-200 p-1 rounded-lg">Duree : ${ac.duree} min</span>
                <span class="bg-amber-200 p-1 rounded-lg">Theme : ${ac.theme}</span>
            </div>
            <div id=".btns" class="mt-3">
                <button class="bg-red-600 cursor-pointer mt-3 py-1 px-4 rounded-md text-white">supprime</button>
                <button class="bg-green-500 cursor-pointer mt-3 py-1 px-4 rounded-md text-white">Modifier</button>
            </div>
        </article>
    `;
  });
};

// CHECK THE NAME
const checkName = () => {
  const nom = localStorage.getItem("nom");
  if (nom === null || nom === "") {
    console.log("nom :", nom);
    console.log("popup : ", popupNomComplet);
    popupNomComplet.classList.remove("hidden");
    return;
  }
  if (nom !== "") return popupNomComplet.classList.add("hidden");
};

// Add Nom Complet =>
btnSendNom.addEventListener("click", () => {
  const isValid = validationInput();
  if (!isValid) return;
  localStorage.setItem("nom", nomComplet.value);
  checkName();
});

// FUNCTION VALIDATION =>
const validationInput = () => {
  const val = nomComplet.value;
  if (val === "") {
    nomComplet.nextElementSibling.innerText = "Nom et un champ obligatiore";
    return false;
  }
  if (val.length <= 5) {
    nomComplet.nextElementSibling.innerText =
      "le champ doit remplire par un nom complet minimum 5 caractere [A-Z]";
    return false;
  }
  nomComplet.nextElementSibling.innerText = "";
  return true;
};

//// : Filtrage & Searche :

//// SEARCH INPUT =>
searchInput.addEventListener("input", (e) => {
  const filtredActivites = activites.filter((act) =>
    act.titre.toLowerCase().includes(e.target.value.toLowerCase()),
  );
  AffichageActivites(filtredActivites);
});

//// FILTARGE PAR THEME =>
filtrageTheme.addEventListener("change", async (e) => {
  console.log(e.target.value);
  const filtredActivites = await filterActiviteParTheme(e.target.value);
  AffichageActivites(filtredActivites);
});

// OPEN POPUP =>
openPopup.addEventListener("click", () => {
  formCreateParticipant.classList.remove("hidden");
});
// CLOSE POPUP =>
closePopup.addEventListener("click", () => {
  formCreateParticipant.classList.add("hidden");
});

passDataToVariable();

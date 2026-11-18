import {
  getActivites,
  filterActiviteParTheme,
  createActivite,
  deleteActivite,
  updateActivite,
} from "./main.js";
import Swal from "sweetalert2";
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
const formCreateActivite = document.getElementById("form-create-activite");
const formUpdateActivite = document.getElementById("form-update-activite");
const openPopup = document.getElementById("open-popup");
const closePopup = document.getElementById("close-popup");
const btnUpdateActivite = document.getElementById("btn-update-activite");
const cancelUpdate = document.getElementById("cancel-update");

const passDataToVariable = async () => {
  activites = await getActivites();
  console.log(activites);
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
            <div id="btns" class="mt-3" data-id="${ac.id}">
                <button data-desc="btn-delete" class="bg-red-600 cursor-pointer mt-3 py-1 px-4 rounded-md text-white">supprime</button>
                <button data-desc="btn-modifier" class="bg-green-500 cursor-pointer mt-3 py-1 px-4 rounded-md text-white">Modifier</button>
            </div>
        </article>
    `;
  });
  AddListenerToBtns();
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
  formCreateActivite.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
  document.body.classList = "overflow-y-hidden";
});
// EVENET To CLOSE POPUP =>
closePopup.addEventListener("click", () => FnClosePopup());

// FUNCTION TO CLOSE POPUP =>
const FnClosePopup = () => {
  formCreateActivite.classList.add("hidden");
  document.body.classList = "overflow-y-auto";
};

// CREATE ACTIVITE :
btnCreateActivite.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const forms = document.forms["create-participant"];
    const { titre, objectifs, duree, description, theme } = forms;
    await createActivite({
      titre: titre.value,
      objectifs: objectifs.value,
      duree: parseInt(duree.value),
      description: description.value,
      theme: theme.value,
      auteur: localStorage.getItem("nom"),
    });
    forms.reset();
    FnClosePopup();
    Swal.fire({
      title: "creer une activite avec succes",
      icon: "success",
    });
  } catch (err) {
    console.log("err from btn create  : ", err);
  } finally {
    passDataToVariable();
  }
});

// ADD LISTENER TO BUTTONS =>
const AddListenerToBtns = () => {
  document.querySelectorAll("#btns").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      // DELETE =>
      if (e.target.dataset.desc === "btn-delete") {
        const id = e.currentTarget.dataset.id;

        const result = await Swal.fire({
          title: "Êtes-vous sûr de vouloir supprimer cette activité ?",
          icon: "question",
          showDenyButton: true,
          confirmButtonText: "ok",
          denyButtonText: `cancel`,
        });

        if (!result.isConfirmed) return;

        await deleteActivite(parseInt(id));
        await Swal.fire({ title: "Saved!", icon: "success" });
        await passDataToVariable();

        return;
      }
      if (e.target.dataset.desc === "btn-modifier") {
        formUpdateActivite.classList.remove("hidden");
        formUpdateActivite.setAttribute(
          "data-activite-id",
          e.currentTarget.dataset.id,
        );
        document.body.classList.add("overflow-y-hidden");
        window.scrollTo({ top: 0, behavior: "smooth" });
        const activiteModifier = activites.find(
          (act) => act.id == e.currentTarget.dataset.id,
        );
        RemplireFormulaire(activiteModifier);
        return;
      }
    });
  });
};

passDataToVariable();

const RemplireFormulaire = (activite) => {
  const { activiteId, titre, theme, objectifs, duree, description } =
    document.forms["update-participant"];
  activiteId.value = activite.id;
  titre.value = activite.titre;
  theme.value = activite.theme;
  objectifs.value = activite.objectifs;
  duree.value = activite.duree;
  description.value = activite.description;
};

btnUpdateActivite.addEventListener("click", async (e) => {
  e.preventDefault();

  const { activiteId, titre, theme, objectifs, duree, description } =
    document.forms["update-participant"];
  console.log(activiteId);

  const resulta = await updateActivite(activiteId.value, {
    titre: titre.value,
    theme: theme.value,
    objectifs: objectifs.value,
    duree: parseInt(duree.value),
    description: description.value,
  });
  if (resulta.status === 200) {
    formUpdateActivite.classList.add("hidden");
    document.body.classList = "overflow-y-auto";
    return;
  }
});

// CLOSE UPDATE FORMULAIRE =>
cancelUpdate.addEventListener("click", (e) => {
  e.preventDefault();
  formUpdateActivite.classList.add("hidden");
  document.body.classList = "overflow-y-auto";
});

``;

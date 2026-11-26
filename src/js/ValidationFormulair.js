// Validation de titre :

export const validation = (titre, objectifs, duree, description, theme) => {
  let errors = {};
  const msgTitre = validationTitre(titre.value);
  if (msgTitre) errors.titre = { message: msgTitre };
  const msgObjectifs = validationObjectifs(objectifs.value);
  if (msgObjectifs) errors.objectifs = { message: msgObjectifs };
  const msgDuree = validationDuree(duree.value);
  if (msgDuree) errors.duree = { message: msgDuree };
  const msgDescription = validationDescription(description.value);
  if (msgDescription) errors.description = { message: msgDescription };
  const msgTheme = validationTheme(theme.value);
  if (msgTheme) errors.theme = { message: msgTheme };
  return errors;
};

export const validationTitre = (titre) => {
  if (!titre.trim()) {
    return "Titre et obligatiore !";
  }
  if (titre.length < 5 || titre.length > 100) {
    return "Titre doit etre min 5 a 100 caractere ";
  }
};

//  Validation d'objectifs :
export const validationObjectifs = (objectifs) => {
  if (!objectifs.trim()) return "Objectif est obligatiore !";
};

// validation d'uree
export const validationDuree = (duree) => {
  if (!duree.trim()) return "La Duree et Obligatiore !";
  if (!/^\d+$/.test(duree.trim())) return "La Duree Doit Etre un Nombre !";
  const value = Number(duree);
  if (value < 10 || value > 20) return "La Duree doit etre entre 10 et 20";
};

// Validation de la description :
export const validationDescription = (description) => {
  if (!description.trim()) return "La Description et Obligatiore !";
  if (description.trim().length < 20 || description.trim().length > 1000)
    return "La description doit contenir entre 20 et 1 000 caractères";
};

export const validationTheme = (theme) => {
  const themes = ["apprentissage", "jeu", "exercice", "autre"];
  if (!theme.includes(theme))
    return "Le thème doit correspondre à une option proposée";
};

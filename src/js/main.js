import { api } from "../axios.js";

const URI = "/api/activites";

export const getActivites = async () => {
  const res = await api.get(`${URI}`);
  return res.data;
};

export const filterActiviteParTheme = async (theme) => {
  const res = await api.get(`${URI}?theme=${theme}`);
  return res.data;
};

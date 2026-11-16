import { api } from "../axios.js";

export const getActivites = async () => {
  const res = await api.get("/api/activites");
  return res.data;
};

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

export const createActivite = async (data) => {
  try {
    return await api.post(`${URI}`, data);
  } catch (err) {
    console.log(err.response);
    // throw new Error(err.response)
  }
};

export const deleteActivite = async (id) => {
  await api.delete(`${URI}/${id}`);
};

export const updateActivite = async (id, data) => {
  try {
    return await api.put(`${URI}/${id}`, data);
  } catch (err) {
    console.log(err);
    console.log(err.response);
  }
};

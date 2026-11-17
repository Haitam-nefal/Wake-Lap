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
    console.log(data);
    const res = await api.post(`${URI}`, data);
    console.log(res);
  } catch (err) {
    console.log(err.response);
  }
};

export const deleteActivite = async (id) => {
  console.log(id);
  await api.delete(`${URI}/${id}`);
  // console.log(res);
};

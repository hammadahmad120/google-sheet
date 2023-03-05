import Axios from "./axiosConfig";

export function getSheets() {
  return Axios.get("/chapter");
}

export function getSheetByName(sheet) {
  return Axios.get(`/chapter/${sheet}`);
}

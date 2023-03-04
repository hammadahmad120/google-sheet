import Axios from "./axiosConfig";

export function getResult(answers) {
  return Axios.post("/results/generateResult", answers);
}

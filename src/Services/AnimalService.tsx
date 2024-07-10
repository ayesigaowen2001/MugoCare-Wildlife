import axios from "axios";

export class AnimalService {
  static getAllAnimals() {
    return axios.get("https://randomuser.me/api/", {
      params: { results: 50 },
    });
  }
}

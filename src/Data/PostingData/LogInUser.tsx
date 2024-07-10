import axios from "axios";

interface LoginData {
  username: string;
  password: string;
}

export const loginUser = (loginData: LoginData) => {
  return axios.post(
    "https://wildlife-tracker.onrender.com/login/login",
    loginData
  );
};

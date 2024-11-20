import axios from "axios";

const http = axios.create({
  baseURL: "https://app-furniture-demostracao.glitch.me/",
});

export default http;

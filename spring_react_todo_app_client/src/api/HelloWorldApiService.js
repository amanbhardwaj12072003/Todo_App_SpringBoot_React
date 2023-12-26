import { apiClient } from "./apiClient";

export const retrieveHelloWorld = (token) =>
  apiClient.get("/hello-world", {
    headers: {
      Authorization: token,
    },
  });

export const retrieveHelloWorldBean = (token) =>
  apiClient.get("/hello-world-bean", {
    headers: {
      Authorization: token,
    },
  });

export const retrieveHelloWorldPathVariable = (username, token) =>
  apiClient.get(`/hello-world/path-variable/${username}`, {
    headers: {
      Authorization: token,
    },
  });


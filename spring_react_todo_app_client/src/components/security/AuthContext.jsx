import { createContext, useContext, useState } from "react";
import {
  executeBasicAuthenticationService,
  executeJwtAuthenticationService,
} from "../../api/AuthenticationApiService";
import { apiClient } from "../../api/apiClient";

// 1: Create a context
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// 2: Share the created context with the other component
export default function AuthProvider({ children }) {
  const [Authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);

  // JWT Authentication Service
  async function login(username, password) {
    try {
      const response = await executeJwtAuthenticationService(
        username,
        password
      );
      if (response.status === 200) {
        const jwtToken = "Bearer " + response.data.token;
        setAuthenticated(true);
        setUsername(username);
        setToken(jwtToken);

        // Intercepting all the http requests and add header to them using something called axios interceptor
        apiClient.interceptors.request.use((config) => {
          console.log("Intercepting and adding token");
          config.headers.Authorization = jwtToken;
          return config;
        });
        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      logout();
      return false;
    }
  }

  function logout() {
    setAuthenticated(false);
    setUsername(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{ Authenticated, login, logout, username, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* Hard Coded Authentication 
function login(username, password) {
  if (username === "Aman" && password === "Aman0081") {
    setAuthenticated(true);
    setUsername(username);
    return true;
  } else {
    setAuthenticated(false);
    setUsername(null);
    return false;
  }
} */

/* Basic Authentication Service 
  async function login(username, password) {
    const basicAuthenticationToken =
      "Basic " + window.btoa(username + ":" + password);

    try {
      const response = await executeBasicAuthenticationService(
        basicAuthenticationToken
      );
      if (response.status === 200) {
        setAuthenticated(true);
        setUsername(username);
        setToken(basicAuthenticationToken);

        // Intercepting all the http requests and add header to them using something called axios interceptor
        apiClient.interceptors.request.use((config) => {
          console.log("Intercepting and adding token");
          config.headers.Authorization = basicAuthenticationToken;
          return config;
        });
        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      logout();
      return false;
    }
  } */

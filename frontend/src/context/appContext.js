import { createContext, useReducer } from "react";
import reducer from "./reducer";

export const AppContext = createContext();

const initialState = {
  token: localStorage.getItem("token") || null,
  user: localStorage.getItem("user") || null,
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setAuth = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", user);
    dispatch({ type: "SET_AUTH", payload: { token, user } });
  };

  const clearAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "CLEAR_AUTH" });
  };
  return (
    <AppContext.Provider value={{ state, setAuth, clearAuth }}>
      {children}
    </AppContext.Provider>
  );
};
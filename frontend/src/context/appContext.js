// import { createContext, useReducer } from "react";
// import reducer from "./reducer";

// export const AppContext = createContext();

// const initialState = {
//   token: localStorage.getItem("token") || null,
//   user: localStorage.getItem("user") || null,
// };

// export const AppProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const setAuth = (token, user) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", user);
//     dispatch({ type: "SET_AUTH", payload: { token, user } });
//   };

//   const clearAuth = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     dispatch({ type: "CLEAR_AUTH" });
//   };
//   return (
//     <AppContext.Provider value={{ state, setAuth, clearAuth }}>
//       {children}
//     </AppContext.Provider>
//   );
// };


// frontend/src/context/appContext.js
import { createContext, useReducer, useEffect } from "react";
import reducer from "./reducer";

export const AppContext = createContext();

const initialState = {
  token: null,
  user: null,
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Sólo en el cliente (navegador) leemos localStorage
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const token = localStorage.getItem("token") || null;
        const user = localStorage.getItem("user") || null;
        if (token || user) {
          dispatch({ type: "SET_AUTH", payload: { token, user } });
        }
      }
    } catch (err) {
      // No hacer fallar el build si algo raro sucede
      console.warn("No access to localStorage during initialization:", err.message);
    }
  }, []);

  const setAuth = (token, user) => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", user);
      }
    } catch (e) { /* ignore */ }

    dispatch({ type: "SET_AUTH", payload: { token, user } });
  };

  const clearAuth = () => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } catch (e) { /* ignore */ }

    dispatch({ type: "CLEAR_AUTH" });
  };

  return (
    <AppContext.Provider value={{ state, setAuth, clearAuth }}>
      {children}
    </AppContext.Provider>
  );
};

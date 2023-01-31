/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext, useEffect, useState } from "react";

const CurrentUserContext = createContext();

export default CurrentUserContext;

export function CurrentUserContextProvider({ children }) {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const myHeader = new Headers();
    myHeader.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      headers: myHeader,
    };

    fetch("http://localhost:5000/api/users/bytoken", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.warn(result);
        setUser(result);
      })
      .catch((error) => console.warn("error", error));
  }, [token]);

  console.warn(user);
  return (
    <CurrentUserContext.Provider value={{ token, user, setUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export const useCurrentUserContext = () => useContext(CurrentUserContext);

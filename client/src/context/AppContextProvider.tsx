import React from "react";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

type AppContextType = {
  token: string;
  setToken: (token: string) => void;
  userId: string;
  setUserId: (userId: string) => void;
};

export const AppContext = React.createContext<AppContextType>({
  token: "",
  setToken: () => { return },
  userId: "",
  setUserId: () => { return },
});

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = React.useState<string>("");
  const [userId, setUserId] = React.useState<string>("");
  const context = {
    token,
    setToken,
    userId,
    setUserId,
  };

  React.useEffect(() => {
    const token = Cookies.get('token');
    if (token && token !== 'undefined' && token !== 'null' && token !== '') {
      setToken(token);
    }
  }, []);

  React.useEffect(() => {
    if (!token) {
      return;
    }

    Cookies.set('token', token, { expires: 1 });
    const decodedToken = jwtDecode(token) as { userId: string };
    setUserId(decodedToken.userId);
  }, [token]);

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default AppContextProvider;

import { createContext, useContext, useState } from "react";
import authService from "../services/authService";
import tokenMethod from "../utils/token";
import { message } from "antd";

const AuthContext = createContext({});
const AuthContextProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
const handleLogin = async (loginData, callback) => {
    try {
      const res = await authService.login(loginData);
      const {
        token: { accessToken, refreshToken },
      } = res?.data || {};
      tokenMethod.set({ accessToken, refreshToken });
      if (!!tokenMethod) {
        message.success("Login successful");
        setIsLogged(true);
        return true;
      }
    } catch (error) {
      message.error("Login failed");
      return false;
    } finally {
      callback?.();
    }
  };
  // const [isLogged, setIsLogged] = useState(false);
  return (
    <AuthContext.Provider value={{ isLogged,handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
  
};
export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);

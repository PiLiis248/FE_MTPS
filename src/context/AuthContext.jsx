import { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/authService";
import tokenMethod from "../utils/token";
import { message } from "antd";

const AuthContext = createContext({});
const AuthContextProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [profile, setProfile] = useState(null);
  const [role, setRole] = useState(null);

  const handleLogin = async (loginData, callback) => {
    try {
      const res = await authService.login(loginData);
      const {
        token: { accessToken },
      } = res?.data || {};

      // Set tokens in local storage
      tokenMethod.set({ accessToken });

      // Set logged in state
      setIsLogged(true);

      // Fetch profile after login
      handleGetProfile();

      // Show success message
      message.success("Login successful");

      return true;
    } catch (error) {
      // Show error message
      message.error("Login failed");

      return false;
    } finally {
      // Execute callback if provided
      callback?.();
    }
  };

  const handleGetProfile = async () => {
    try {
      const res = await authService.getProfile();
      if (res?.data) {
        setProfile(res.data);
        setRole(res.data.role);
      }
    } catch (error) {
      console.error("Error fetching profile", error);
    }
  };

  useEffect(() => {
    // Check if user is logged in on mount
    const accessToken = tokenMethod.get()?.accessToken;
    if (accessToken) {
      setIsLogged(true);
      handleGetProfile();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLogged, profile, role,handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);

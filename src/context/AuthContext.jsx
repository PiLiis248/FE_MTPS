import { createContext } from "react";

const AuthContext = createContext({});
const AuthContextProvider = ({ children }) => {
  // const [isLogged, setIsLogged] = useState(false);
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};
export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);

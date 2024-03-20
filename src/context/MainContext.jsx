import { createContext } from "react";

const MainContext = createContext({});
const MainContextProvider = ({ children }) => {
  return <MainContext.Provider>{children}</MainContext.Provider>;
};
export default MainContextProvider;
export const useMainContext = () => useContext(MainContext);

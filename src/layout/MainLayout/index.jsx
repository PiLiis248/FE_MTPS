import MainContextProvider from "../../context/MainContext";
import AuthContextProvider from "../../context/AuthContext";
const MainLayout = () => {
  return (
    <MainContextProvider>
      <AuthContextProvider>
        <div className="page-wrapper"></div>
      </AuthContextProvider>
    </MainContextProvider>
  );
};

export default MainLayout;

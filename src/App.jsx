import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./component/PrivateRoute";
import { PATHS } from "./constants/path";
import MainLayout from "./layout/MainLayout";
import LoginPage from "./pages/LoginPage";
import StudentHomePage from "./pages/StudentHomePage"; // Your existing HomePage
import TrainingPointDetail from "./pages/TrainingPointDetail"; // Import the Profile Page component, adjust the path as needed

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<LoginPage />} /> */}
        <Route path={PATHS.LOGIN} element={<LoginPage />}/>
        <Route path="/" element={<PrivateRoute redirectPath={PATHS.LOGIN} />}>
          <Route element={<MainLayout />}>
            <Route path={PATHS.HOME} element={<StudentHomePage />} />
            <Route path={PATHS.DETAIL} element={<TrainingPointDetail />} />

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

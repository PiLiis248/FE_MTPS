import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./component/PrivateRoute";
import { PATHS } from "./constants/path";
import MainLayout from "./layout/MainLayout";
import LoginPage from "./pages/LoginPage";
import StudentHomePage from "./pages/StudentHomePage";
import TrainingPointDetail from "./pages/TrainingPointDetail";
import CreatePost from "./pages/CreatePost";
import TestPage from "./pages/TestPage";
import ListAttendeesPage from "./pages/ListAttendeesPage";
import FacultyPage from "./pages/FacultyPage"; // Import the FacultyPage component
import { useAuthContext } from "./context/AuthContext";
import ViewPage from "./pages/ViewPage";
import UpdatePoint from "./pages/UpdatePoint";

const App = () => {
  const { profile } = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.LOGIN} element={<LoginPage />} />
        <Route path="/" element={<PrivateRoute redirectPath={PATHS.LOGIN} />}>
          <Route element={<MainLayout />}>
            {/* Check profile role */}
            {profile && profile.role === "faculty" ? (
              <Route path={PATHS.HOME} element={<FacultyPage />} />
            ) : (
              <>
                <Route path={PATHS.HOME} element={<StudentHomePage />} />
                <Route path={PATHS.DETAIL} element={<TrainingPointDetail />} />
                <Route path={`${PATHS.TEST}/:testId`} element={<TestPage />} />
                <Route path={PATHS.CREATE_POST} element={<CreatePost />} />
                <Route path={PATHS.VIEWEXPIRED} element={<ViewPage />} />
                <Route path={PATHS.UPDATE_POINT} element={<UpdatePoint />} />

                <Route
                  path={`${PATHS.LIST_ATTENDEES}/:id`}
                  element={<ListAttendeesPage />}
                />
              </>
            )}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

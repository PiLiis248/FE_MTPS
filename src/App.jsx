import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./component/PrivateRoute";
import { PATHS } from "./constants/path";
import MainLayout from "./layout/MainLayout";
import LoginPage from "./pages/LoginPage";
import StudentHomePage from "./pages/StudentHomePage"; // Your existing HomePage
import TrainingPointDetail from "./pages/TrainingPointDetail"; // Import the Profile Page component, adjust the path as needed
import CreatePost from "./pages/CreatePost";
import CreateTest from "./pages/TestCreationPage";
import TestPage from "./pages/TestPage";
import ListAttendeesPage from "./pages/ListAttendeesPage";

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
            <Route path={`${PATHS.TEST}/:testId`} element={<TestPage />} />
            <Route path={PATHS.CREATE_POST} element={<CreatePost />} />
            <Route path={PATHS.CREATE_TEST} element={<CreateTest />} />
            <Route path={`${PATHS.LIST_ATTENDEES}/:postId`} element={<ListAttendeesPage />} />

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

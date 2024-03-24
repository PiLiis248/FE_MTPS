// import React from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import LoginPage from "./pages/LoginPage";
// import StudentHomePage from "./pages/StudentHomePage"; // Your existing HomePage
// import TrainingPointDetail from "./pages/TrainingPointDetail"; // Import the Profile Page component, adjust the path as needed

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<StudentHomePage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/tpdetail" element={<TrainingPointDetail />} /> {/* Add the route for the Profile Page */}
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import StudentHomePage from "./pages/StudentHomePage"; // Your existing HomePage
import TrainingPointDetail from "./pages/TrainingPointDetail"; // Import the Profile Page component, adjust the path as needed
import TestPage from "./pages/TestPage"; // Import the TestPage component, adjust the path as needed
import MainLayout from "./layout/MainLayout";

const App = () => {
  // return (
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/" element={<LoginPage />} ><Route path="/" element={<StudentHomePage />} /> <Route/>
        
  //       <Route path="/login" element={<LoginPage />} />
  //       <Route path="/detail" element={<TrainingPointDetail />} />
  //       {/* Add the route for the TestPage */}
  //       <Route path="/test/:testId" element={<TestPage />} />
  //     </Routes>
  //   </BrowserRouter>
  // );

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<LoginPage />} /> */}
        <Route path="/" element={<LoginPage />}>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<StudentHomePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

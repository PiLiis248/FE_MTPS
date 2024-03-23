// import React from 'react';
// import '../../../public/assets/css/trainingPoint.css';

// // Mock data based on the provided details
// const postsData = [
//   {
//     id: "post01",
//     name: "HOẠT ĐỘNG HỌC THUẬT 'TÌM HIỂU VỀ QUẢN LÝ CÔNG TRÌNH THỂ THAO - LẦN 2 NĂM 2024'",
//     point: 15,
//   },
//   {
//     id: "post02",
//     name: "Hoạt động trực tuyến: 'Tìm hiểu về Đoàn TNCS Hồ Chí Minh'",
//     point: 5,
//   },
//   {
//     id: "post03",
//     name: "TÌM HIỂU CÔNG TRÌNH TRỌNG ĐIỂM 'SÔNG SÀI GÒN- CON SÔNG CỦA THÀNH PHỐ TÔI'-LẦN 2'",
//     point: 10,
//   },
//   // Include more posts as necessary
// ];

// const activitiesData = [
//   { id: "ac001", postId: "post01", studentId: "001001", achievePoint: 15 },
//   { id: "ac006", postId: "post02", studentId: "001001", achievePoint: 5 },
//   { id: "ac010", postId: "post03", studentId: "001001", achievePoint: 10 },
//   // Include more activities as necessary
// ];

// const TrainingPointDetail = () => {
//   // Function to calculate the total points
//   const calculateTotalPoints = () => {
//     return activitiesData.reduce((total, activity) => {
//       const post = postsData.find(post => post.id === activity.postId);
//       return total + (post ? post.point : 0);
//     }, 0);
//   };

//   return (
//     <div className="training-point-detail">
//       <h2>Training Point Detail</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Post Name</th>
//             <th>Points</th>
//           </tr>
//         </thead>
//         <tbody>
//           {activitiesData.map((activity) => {
//             const post = postsData.find(post => post.id === activity.postId);
//             return post ? (
//               <tr key={activity.id}>
//                 <td>{post.name}</td>
//                 <td>{post.point}</td>
//               </tr>
//             ) : null;
//           })}
//           <tr>
//             <td><strong>Total Points</strong></td>
//             <td><strong>{calculateTotalPoints()}</strong></td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TrainingPointDetail;


import React, { useState, useEffect } from 'react';
import Sidebar from '../../component/SideBar';
import '../../../public/assets/css/trainingPoint.css';

// Mock data based on the provided details
const postsData = [
  {
    id: "post01",
    name: "HOẠT ĐỘNG HỌC THUẬT 'TÌM HIỂU VỀ QUẢN LÝ CÔNG TRÌNH THỂ THAO - LẦN 2 NĂM 2024'",
    point: 15,
  },
  {
    id: "post02",
    name: "Hoạt động trực tuyến: 'Tìm hiểu về Đoàn TNCS Hồ Chí Minh'",
    point: 5,
  },
  {
    id: "post03",
    name: "TÌM HIỂU CÔNG TRÌNH TRỌNG ĐIỂM 'SÔNG SÀI GÒN- CON SÔNG CỦA THÀNH PHỐ TÔI'-LẦN 2'",
    point: 10,
  },
  // Include more posts as necessary
];

const activitiesData = [
  { id: "ac001", postId: "post01", studentId: "001001", achievePoint: 15 },
  { id: "ac006", postId: "post02", studentId: "001001", achievePoint: 5 },
  { id: "ac010", postId: "post03", studentId: "001001", achievePoint: 10 },
  // Include more activities as necessary
];

const TrainingPointDetail = () => {
  // Function to calculate the total points
  const calculateTotalPoints = () => {
    return activitiesData.reduce((total, activity) => {
      const post = postsData.find(post => post.id === activity.postId);
      return total + (post ? post.point : 0);
    }, 0);
  };

  // Mock student data and progress calculation for demonstration
  const [studentData, setStudentData] = useState({});
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const mockStudentData = {
      id: "001001",
      name: "Jacob Garcia",
      email: "001001@gmail.com",
      trainingPoint: calculateTotalPoints() // Assuming this is the total points
    };
    setStudentData(mockStudentData);
    setProgress((mockStudentData.trainingPoint / 100) * 100);
  }, []);

  return (
    <div className="homepage-container">
      <Sidebar username={studentData.name} email={studentData.email} progress={progress} />
      <div className="main-content training-point-detail">
        <table>
          <thead>
            <tr>
              <th>Post Name</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {activitiesData.map((activity) => {
              const post = postsData.find(post => post.id === activity.postId);
              return post ? (
                <tr key={activity.id}>
                  <td>{post.name}</td>
                  <td>{post.point}</td>
                </tr>
              ) : null;
            })}
            <tr>
              <td><strong>Total Points</strong></td>
              <td><strong>{calculateTotalPoints()}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainingPointDetail;

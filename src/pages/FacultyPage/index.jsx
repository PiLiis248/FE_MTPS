import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import profileService from "../../services/profileService";
import Sidebar from "../../component/SideBar";
import studentService, { facultyService } from "../../services/facultyService";
import "../../../public/assets/css/faculty.css";
import { List } from "antd";
const FacultyPage = () => {
  const { profile } = useAuthContext();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // Fetch students from MongoDB
        const response = await facultyService.getAllStudents();
        const filteredStudents = response?.data.formattedStudents.filter(
          (student) => student.facultyName === profile.name
        );
        setStudents(filteredStudents);
      } catch (error) {
        console.error("Error fetching students:", error.message);
      }
    };

    if (profile.role === "faculty") {
      fetchStudents();
    }
  }, []);
  //   console.log(students);
  return (
    <div className="faculty-page">
      <Sidebar />
      <h1 className="title-page">List of Students</h1>
      <div className="list-student">
        <div className="group-title">
          <div className="group-title-name">Name & Email</div>
          <div className="group-title-score">Training point</div>
        </div>
        <List
          itemLayout="horizontal"
          dataSource={students}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                className="info"
                title={item.name}
                description={item.email}
              />
              <div className="training-point">{item.trainingPoint}</div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default FacultyPage;

import { List } from "antd";
import React, { useEffect, useState } from "react";
import "../../../public/assets/css/faculty.css";
import Sidebar from "../../component/SideBar";
import { useAuthContext } from "../../context/AuthContext";
import { facultyService } from "../../services/facultyService";
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

    if (profile && profile.role === "faculty") {
      fetchStudents();
    }
  }, [profile]);
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

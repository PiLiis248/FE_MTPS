import React, { useEffect, useState } from "react";
import Sidebar from "../../component/SideBar";
import { Button, Input, Modal, Space, Table, message } from "antd";
import profileService from "../../services/profileService";
import { useAuthContext } from "../../context/AuthContext";

const UpdatePoint = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [studentDataPoint, setStudentDataPoint] = useState(null);
  const [studentInfo, setStudentInfo] = useState([]);
  const [studentPoint, setStudentPoint] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState();
  const [role, setRole] = useState();
  const [modalStudentId, setModalStudentId] = useState("");
  const [modalName, setModalName] = useState("");
  const [modalPoint, setModalPoint] = useState("");
  const { profile } = useAuthContext();
  const showModal = (studentId) => {
    setModalStudentId(studentId);
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    if (modalStudentId && modalName && modalPoint) {
      try {
        await profileService.updateDiscipline(
          modalStudentId,
          modalName,
          parseFloat(modalPoint)
        );
        message.success("Discipline updated successfully");
      } catch (error) {
        console.error("Error updating discipline:", error);
        message.error("Error updating discipline");
      }
    }
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const fetchStudentData = async () => {
      if (profile?.facultyName) {
        const roleUp =
          profile.facultyName.charAt(0).toUpperCase() +
          profile.facultyName.slice(1);
        setRole(roleUp);
        try {
          const res = await profileService.getStudent(roleUp);
          setData(res?.data);
        } catch (error) {
          console.error("Error fetching student data:", error);
        }
      }
    };
    fetchStudentData();
  }, [profile]);
  useEffect(() => {
    if (data && Array.isArray(data)) {
      const arrayData = data.map((item, index) => ({
        ...item.st,
        key: item.st._id || index,
      }));

      const arrayPoint = data.map((item) => ({
        studentId: item.point.studentId,
        discipline: item.point.discipline,
        key: item.point._id,
      }));
      setStudentInfo(arrayData);
      setStudentPoint(arrayPoint);
    }
  }, [data]);
  const handleChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      try {
        const response = await profileService.searchStudent({
          studentId: value,
          faculty: role,
        });
        if (response.status === 200 && response.data.length > 0) {
          const data = response?.data;
          const dataInfo = [];
          dataInfo.push(data[0]?.st);
          setStudentData(dataInfo);
          setStudentDataPoint(data[0]?.point.discipline);
        } else {
          setStudentData(null);
          message.error("Student not found");
        }
      } catch (error) {
        console.error("Error searching student:", error);
        message.error("Error occurred while searching for student");
      }
    } else {
      setStudentData(null);
    }
  };
  const tableData = studentData ? studentData : studentInfo;
  // console.log(studentInfo);
  const expandedRowRender = (record) => {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Point",
        dataIndex: "point",
        key: "point",
      },
    ];
    let studentDiscipline;
    if (studentData) {
      studentDiscipline = studentDataPoint;
    } else {
      studentDiscipline = studentPoint.find(
        (student) => student.studentId === record.id
      );
    }
    let disciplineData;

    if (!Array.isArray(studentDiscipline)) {
      disciplineData = studentDiscipline?.discipline || [];
    } else {
      disciplineData = studentDiscipline;
    }
    return (
      <Table columns={columns} dataSource={disciplineData} pagination={false} />
    );
  };
  const columns = [
    {
      title: "Student ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "operation",
      render: (text, record) => (
        <Button onClick={() => showModal(record.id)}>Edit</Button>
      ),
    },
  ];
  return (
    <div className="update-page">
      <Sidebar className="sidebar-create" />
      <div className="update-page-main">
        <Input
          className="update-input"
          style={{ width: "30%", marginBottom: "40px" }}
          value={searchTerm}
          onChange={handleChange}
        />
        <Table
          className="update-table"
          columns={columns}
          expandable={{
            expandedRowRender,
            defaultExpandedRowKeys: ["0"],
          }}
          dataSource={tableData}
        />
      </div>

      <Modal
        title="Update"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          className="input-name"
          placeholder="Enter content"
          value={modalName}
          onChange={(e) => setModalName(e.target.value)}
        ></Input>
        <Input
          className="input-point"
          placeholder="Enter negative point: -3..."
          value={modalPoint}
          onChange={(e) => setModalPoint(e.target.value)}
        ></Input>
      </Modal>
    </div>
  );
};

export default UpdatePoint;

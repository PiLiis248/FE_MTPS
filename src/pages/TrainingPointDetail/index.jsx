import { Table } from "antd";
import React, { useEffect, useState } from "react";
import "../../../public/assets/css/trainingPoint.css";
import Sidebar from "../../component/SideBar";
import { useAuthContext } from "../../context/AuthContext";
import useQuery from "../../hooks/useQuery";
import postService from "../../services/postService";
import profileService from "../../services/profileService";
const TrainingPointDetail = () => {
  const {
    data: postData,
    loading: postLoading,
    error: postError,
  } = useQuery(postService.getPost);
  const [dataPoint, setDataPoint] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [studentID, setStudentID] = useState(null);
  const [newData, setNewData] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const posts = postData?.post || [];
  const { profile } = useAuthContext();

  const handleGetPoint = async (studentID) => {
    try {
      const res = await profileService.getPoint(studentID);
      if (res && res.data) {
        setDataPoint(res.data);
      } else {
        console.error("Student not found or data missing");
      }
    } catch (error) {
      console.error("Error in handleGetPoint:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  useEffect(() => {
    if (profile && profile.id) {
      setStudentID(profile.id);
      handleGetPoint(profile.id);
    }
  }, [profile, profile?.id]);

  // const totalPoints = calculateTotalPoints();
  useEffect(() => {
    // Tải trước dữ liệu cho các bản ghi trong bảng chính
    const fetchData = async () => {
      const preloadedData = {};
      for (const record of newData) {
        const { post } = record;
        if (post && post.listPost) {
          const postList = [];
          for (const postID of post.listPost) {
            try {
              const response = await postService.getPostSpecific(postID[0]);
              if (response && response.data) {
                const { name, point } = response.data;
                postList.push({ key: postID[0], name, point });
              }
            } catch (error) {
              console.error(
                `Error fetching post data for postID: ${postID[0]}`,
                error
              );
            }
          }
          const totalPoints = postList.reduce(
            (acc, item) => acc + item.point,
            0
          );
          // console.log(totalPoints);
          preloadedData[record.key] = postList;
        }
      }
      setDataSource(preloadedData);
    };

    fetchData();
  }, [newData]);

  const expandedRowRender = (record) => {
    const postList = dataSource[record.key] || [];

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
    let totalPointForRecord = 0;
    for (const post of postList) {
      totalPointForRecord += post.point;
    }
    if (totalPointForRecord > 20) {
      totalPointForRecord = 20;
    }
    setTotalPoints((prevTotal) => prevTotal + totalPointForRecord);
    return <Table columns={columns} dataSource={postList} pagination={false} />;
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
  ];
  const listData = [];
  useEffect(() => {
    if (dataPoint) {
      const newData = Object.entries(dataPoint)
        .filter(([key, value]) => key !== "studentId" && key !== "_id")
        .map(([name, post], index) => ({
          key: index + 1,
          name: name.charAt(0).toUpperCase() + name.slice(1),
          post,
        }));
      setNewData(newData);

      newData
        .filter(
          (item) =>
            item.name !== "Discipline" &&
            item.name !== "Reward" &&
            item.name !== "Pioneering"
        )
        .forEach((pt) => {
          if (pt.post && pt.post.listPost) {
            listData.push(pt.post.listPost);
          }
        });
    }
  }, [dataPoint]);

  return (
    <div className="homepage-container">
      <Sidebar />
      <div className="main-content training-point-detail">
        <Table
          columns={columns}
          expandable={{
            expandedRowRender,
            defaultExpandedRowKeys: ["0"],
          }}
          dataSource={newData}
        />
        <div className="total-point">Total point: {totalPoints}</div>
      </div>
    </div>
  );
};

export default TrainingPointDetail;

import { Table } from "antd";
import React, { useEffect, useState } from "react";
import "../../../public/assets/css/trainingPoint.css";
import Sidebar from "../../component/SideBar";
import { useAuthContext } from "../../context/AuthContext";
import useQuery from "../../hooks/useQuery";
import postService from "../../services/postService";
import profileService from "../../services/profileService";

const TrainingPointDetail = () => {
  const { data: postData, loading: postLoading, error: postError } = useQuery(
    postService.getPost
  );

  const [dataPoint, setDataPoint] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [studentID, setStudentID] = useState(null);
  const [newData, setNewData] = useState([]);
  const [extraData, setExtraData] = useState([]);
  const [sumPoint, setSumPoint] = useState(0);
  const { profile } = useAuthContext();


  const handleGetPoint = async (studentID) => {
    try {
      const res = await profileService.getPoint(studentID);
      if (res && res.data) {
        setDataPoint(res.data);
        const newData = Object.keys(res.data)
          .filter(
            (key) =>
              key !== "studentId" && key !== "_id" && key !== "__v"
          )
          .map((name, index) => ({
            key: index + 1,
            categories: name.charAt(0).toUpperCase() + name.slice(1),
            post: res.data[name],
          }));
        setNewData(newData);
        const listData = newData
          .filter(
            (item) =>
              item.name !== "Discipline" &&
              item.name !== "Reward" &&
              item.name !== "Pioneering"
          )
          .reduce((acc, pt) => {
            if (pt.post && pt.post) {
              return [...acc, ...pt.post];
            }
            return acc;
          }, []);

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

  useEffect(() => {
    const fetchData = async () => {
      const totalPointsArray = [];
      const preloadedData = {};
      const dataLastCategories = [];
      for (const record of newData) {
        const { post } = record;
        if (Array.isArray(post)) {
          const postList = [];
          const isArrayObject = post.every(
            (item) => typeof item === "object" && !Array.isArray(item)
          );
          if (isArrayObject) {
            for (const postItem of post) {
              dataLastCategories.push({
                key: postItem.name,
                point: postItem.point,
              });
            }
          } else {
            for (const postID of post) {
              try {
                const response = await postService.getPostSpecific(postID);
                if (response && response.data) {
                  const { name, point } = response.data;
                  postList.push({ key: postID, name, point });
                }
              } catch (error) {
                console.error(
                  `Error fetching post data for postID: ${postID[0]}`,
                  error
                );
              }
            }
          }
          let totalPoints = postList.reduce((acc, item) => acc + item.point, 0);
          totalPoints = Math.min(totalPoints, 20);
          totalPointsArray.push(totalPoints);
          preloadedData[record.key] = postList;
        }
      }
      setExtraData(dataLastCategories);
      setDataSource(preloadedData);
      const sumExtra = extraData.reduce((acc, item) => acc + item.point, 0);
      const sumPoint = totalPointsArray.reduce(
        (acc, points) => acc + points,
        0
      );
      const sumAll = sumPoint + sumExtra;
      setSumPoint(sumAll);
      updateTrainingPoint(profile.id, sumAll);
    };
    fetchData();
  }, [newData, extraData]);

  const updateTrainingPoint = async (userId, totalPoints) => {
    try {
      const response = await profileService.updateTrainingPoint(
        userId,
        totalPoints
      );
    } catch (error) {
      console.error(
        "Error updating training point:",
        error.response.data.error
      );
    }
  };

  const expandedRowRender = (record) => {
    if (
      record.categories === "Discipline" ||
      record.categories === "Reward" ||
      record.categories === "Pioneering"
    ) {
      const extraColumns = [
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
      const data = record.post.map((item, index) => ({
        key: index,
        name: item.name,
        point: item.point,
      }));
      const totalPoints = data.reduce((sum, item) => sum + item.point, 0);
      const totalColumn = {
        title: "Total",
        dataIndex: "total",
        key: "total",
      };
      const dataWithTotal = [
        ...data,
        { key: "total", name: "Total", point: totalPoints, total: totalPoints },
      ];

      const columnsWithTotal = [...extraColumns, totalColumn];
      return (
        <Table
          columns={columnsWithTotal}
          dataSource={dataWithTotal}
          pagination={false}
        />
      );
    } else {
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

      return (
        <Table columns={columns} dataSource={postList} pagination={false} />
      );
    }
  };
  const columns = [
    {
      title: "Categories",
      dataIndex: "categories",
      key: "categories",
    },
  ];
  
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
        <div className="total-point">Total point: {sumPoint}</div>
      </div>
    </div>
  );
};

export default TrainingPointDetail;

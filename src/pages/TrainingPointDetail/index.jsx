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
  const [extraData, setExtraData] = useState([]);
  const [sumPoint, setSumPoint] = useState(0);
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

  useEffect(() => {
    const fetchData = async () => {
      const totalPointsArray = [];
      const preloadedData = {};
      const dataLastCategories = [];
      for (const record of newData) {
        const { post } = record;
        if (typeof post === "object" && post.listPost) {
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
          let totalPoints = postList.reduce((acc, item) => acc + item.point, 0);
          totalPoints = Math.min(totalPoints, 20);
          totalPointsArray.push(totalPoints);
          preloadedData[record.key] = postList;
        } else {
          dataLastCategories.push({
            key: record.categories,
            point: post,
          });
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
    };

    fetchData();
  }, [newData]);
  const expandedRowRender = (record) => {
    if (
      record.categories === "Discipline" ||
      record.categories === "Reward" ||
      record.categories === "Pioneering"
    ) {
      const extraColumns = [
        {
          title: "Point",
          dataIndex: "point",
          key: "point",
        },
      ];
      const data = [{ key: record.key, point: record.post }];
      return (
        <Table columns={extraColumns} dataSource={data} pagination={false} />
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
  const listData = [];
  useEffect(() => {
    if (dataPoint) {
      const newData = Object.entries(dataPoint)
        .filter(([key, value]) => key !== "studentId" && key !== "_id")
        .map(([name, post], index) => ({
          key: index + 1,
          categories: name.charAt(0).toUpperCase() + name.slice(1),
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
        <div className="total-point">Total point: {sumPoint}</div>
      </div>
    </div>
  );
};

export default TrainingPointDetail;

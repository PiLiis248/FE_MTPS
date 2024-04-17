import { List, Progress, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../public/assets/css/style.css"; // Adjust paths as necessary
import Post from "../../component/PostForm";
import Sidebar from "../../component/SideBar";
import { PATHS } from "../../constants/path";
import { useAuthContext } from "../../context/AuthContext";
import useQuery from "../../hooks/useQuery";
import postService from "../../services/postService";
import profileService from "../../services/profileService"; // Import profileService

const StudentHomePage = () => {
  const { profile } = useAuthContext();
  const [dataPoint, setDataPoint] = useState(null);
  const [studentID, setStudentID] = useState(null);
  const [newData, setNewData] = useState([]);
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const [statusJoined, setStatusJoined] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);

  const {
    data: postData,
    loading: postLoading,
    error: postError,
  } = useQuery(postService.getPost);

  useEffect(() => {
    if (postData && postData.post && profile) {
      let filteredPosts = [];
      let facultyName = null;

      if (profile.role === "assistant") {
        const filteredPosts = postData.post.filter(
          (pt) => pt.facultyName === profile.facultyName
        );
        setPost(filteredPosts.length > 0 ? filteredPosts : null);
      } else if (profile.role === "student") {
        if (
          !!profile &&
          !!profile.activities &&
          Array.isArray(profile.activities)
        ) {
          facultyName = profile.facultyName;

          postData.post.forEach((pt) => {
            if (
              pt.status === true ||
              (pt.status === false && pt.facultyName === facultyName)
            ) {
              if (!profile.activities.includes(pt.id)) {
                filteredPosts.push(pt);
              }
            }
          });
          setPost(filteredPosts.length > 0 ? filteredPosts : null);
          let calculatedTotalPoints = 0;
          profile.activities.forEach((activityId) => {
            const post = postData.post.find((pt) => pt.id === activityId);
            if (post) {
              calculatedTotalPoints += post.point;
            }
          });
          setTotalPoints(calculatedTotalPoints);
          if (profile.role === "student") {
            if (profile.trainingPoint + calculatedTotalPoints < 100) {
              updateTrainingPoint(profile.id, calculatedTotalPoints);
              setTotalPoints(profile.trainingPoint);
            } else if (profile.trainingPoint + calculatedTotalPoints > 100) {
              updateTrainingPoint(profile.id, 100);
              setTotalPoints(profile.trainingPoint);
            }
          }
        }
      }
    }
  }, [postData, profile]);

  const updateTrainingPoint = async (userId, totalPoints) => {
    try {
      const response = await profileService.updateTrainingPoint(
        userId,
        totalPoints
      );
      console.log(response.data.message);
    } catch (error) {
      console.error(
        "Error updating training point:",
        error.response.data.error
      );
    }
  };
  const [joined, setJoined] = useState({});
  const handleJoinActivity = async (postId, stuId) => {
    try {
      const postToUpdate = post.find((pt) => pt.id === postId);

      if (postToUpdate.stdJoin && postToUpdate.stdJoin.includes(profile.id)) {
        message.info("You have already joined this activity.");
        return;
      }

      const response = await postService.updatePost(postId, {
        stdJoin: [...postToUpdate.stdJoin, stuId],
      });
      message.success("Joined activity !");

      const updatedPostData = {
        numberParticipants: postToUpdate.numberParticipants - 1,
      };
      await postService.updatePost(postId, updatedPostData);

      setPost((prevPosts) =>
        prevPosts.map((prevPost) => {
          if (prevPost.id === postId) {
            return {
              ...prevPost,
              numberParticipants: prevPost.numberParticipants - 1,
            };
          }
          return prevPost;
        })
      );

      setJoined((prevState) => ({
        ...prevState,
        [postId]: true,
      }));
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Error updating post:", error.response.data.error);
      } else {
        console.error("Error updating post:", error.message);
      }
    }
  };

  useEffect(() => {
    if (profile && postData && postData.post) {
      postData.post.forEach((pt) => {
        if (pt.stdJoin && pt.stdJoin.includes(profile.id)) {
          setJoined((prevState) => ({
            ...prevState,
            [pt.id]: true,
          }));
        }
      });
    }
  }, [profile, postData]);

  const handleTakeTest = async (testId) => {
    navigate(`${PATHS.TEST}/${testId}`);

    // Update the state to indicate that the test has been taken
    setToke((prevState) => ({
      ...prevState,
      [testId]: true,
    }));
  };

  const handleListAttendees = async (id) => {
    navigate(`${PATHS.LIST_ATTENDEES}/${id}`);
  };

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
  }, [profile]);
  useEffect(() => {
    if (dataPoint) {
      const newData = Object.entries(dataPoint)
        .filter(
          ([key]) =>
            key !== "studentId" &&
            key !== "_id" &&
            key !== "discipline" &&
            key !== "reward" &&
            key !== "pioneering"
        )
        .map(([name, point], index) => ({
          key: index + 1,
          name: name.charAt(0).toUpperCase() + name.slice(1),
        }));
      setNewData(newData);
    }
  }, [dataPoint]);
  return (
    <div className="homepage-container">
      <Sidebar />
      <div className="table-mini">
        <List
          className="list-noti"
          style={{
            position: "fixed",
            bottom: "60px",
            left: "40px",
            width: "280px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "10px",
          }}
          itemLayout="horizontal"
          dataSource={newData}
          renderItem={(item, index) => {
            const category = dataPoint[item.name.toLowerCase()];
            const totalPoint = category ? category.total : 0;
            const percent = (totalPoint / 20) * 100;
            return (
              <List.Item>
                <List.Item.Meta title={item.name} />
                <Progress type="circle" percent={percent} size={40} />
              </List.Item>
            );
          }}
        />
      </div>
      <div className="main-content">
        <div className="progress-box">
          {profile && profile.role === "student" && (
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${totalPoints}%` }}
              ></div>
            </div>
          )}
          {!!profile && profile.role === "student" && (
            <div className="progress-text">{totalPoints}%</div>
          )}
        </div>
        <div className="posts-container">
          {post &&
            post.reverse().map((pt) => (
              <div key={pt.id} className="post-wrapper">
                <div className="post-item">
                  <Post
                    id={pt.id}
                    name={pt.name}
                    facultyName={pt.facultyName}
                    desc={pt.desc}
                    startTime={pt.startTime}
                    startDate={pt.startDate}
                    endTime={pt.endTime}
                    endDate={pt.endDate}
                    location={pt.location}
                    numberParticipants={pt.numberParticipants}
                    testId={pt.testId}
                    onJoinActivity={() => handleJoinActivity(pt.id, profile.id)}
                    statusJoined={joined[pt.id] || false}
                    onTakeTest={() => handleTakeTest(pt.testId, profile.id)}
                    onListAttendees={() => handleListAttendees(pt.id)}
                    postId={pt.id}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default StudentHomePage;

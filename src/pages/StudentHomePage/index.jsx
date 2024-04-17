import { List, Progress, Select, message } from "antd";
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
  const [totalPoints, setTotalPoints] = useState(0);
  const [postBackup, setPostBackup] = useState(null);

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
          setPostBackup(filteredPosts.length > 0 ? filteredPosts : null);
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
  const calculateCategoryPoints = async (category) => {
    let totalPointsByCategory = 0;

    if (category && Array.isArray(category.listPost)) {
      const promises = category.listPost.map(async (it) => {
        const postId = it[0];

        try {
          const response = await postService.getPostSpecific(postId);
          const postData = response.data;
          totalPointsByCategory += postData.point;
        } catch (error) {
          console.error(`Lỗi khi lấy dữ liệu cho postID ${postId}:`, error);
        }
      });
      await Promise.all(promises);
    }

    return totalPointsByCategory;
  };

  const calculateProgress = async (dataPoint) => {
    const maxPoints = 20;

    const categories = Object.keys(dataPoint).filter((key) => {
      return (
        key !== "studentId" &&
        key !== "_id" &&
        key !== "reward" &&
        key !== "pioneering" &&
        key !== "discipline"
      );
    });

    const progressData = await Promise.all(
      categories.map(async (categoryName) => {
        const categoryData = dataPoint[categoryName];
        if (categoryData && Array.isArray(categoryData.listPost)) {
          const totalPointsByCategory = await calculateCategoryPoints(
            categoryData
          );
          console.log(totalPointsByCategory);
          const percent = (totalPointsByCategory / maxPoints) * 100;
          return {
            name: categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
            percent,
          };
        }
        return {
          name: categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
          percent: 0,
        };
      })
    );

    return progressData;
  };

  useEffect(() => {
    const updateProgressData = async () => {
      if (dataPoint) {
        const progressData = await calculateProgress(dataPoint);
        setNewData(progressData);
      }
    };
    updateProgressData();
  }, [dataPoint]);
  const options = [
    { value: "Academic", label: "Academic" },
    { value: "Volunteer", label: "Volunteer" },
    { value: "MentalPhysical", label: "MentalPhysical" },
  ];
  const handleChange = async (value) => {
    if (value.length === 0) {
      setPost(postBackup);
    } else {
      const lowercaseCategories = value.map((category) => {
        if (category === "MentalPhysical") {
          return "mentalPhysical";
        }
        return category.toLowerCase();
      });

      try {
        const response = await postService.getPostByCategory(
          lowercaseCategories
        );
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching posts by category:", error);
      }
    }
  };
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
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta title={item.name} />
              <Progress type="circle" percent={item.percent} size={40} />
            </List.Item>
          )}
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
        <div
          className="filter-bar"
          style={{ width: "40%", marginLeft: "20px", marginTop: "20px" }}
        >
          <Select
            mode="tags"
            style={{
              width: "100%",
            }}
            placeholder="Select categories"
            onChange={handleChange}
            options={options}
          />
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
                    category={pt.category}
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

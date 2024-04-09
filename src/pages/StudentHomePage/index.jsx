import React, { useState, useEffect } from "react";
import "../../../public/assets/css/style.css"; // Adjust paths as necessary
import Post from "../../component/PostForm";
import useQuery from "../../hooks/useQuery";
import postService from "../../services/postService";
import testService from "../../services/testService";
import profileService from "../../services/profileService"; // Import profileService
import { useAuthContext } from "../../context/AuthContext";
import Sidebar from "../../component/SideBar";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/path";

const StudentHomePage = () => {
  const { profile } = useAuthContext();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const [statusJoined, setStatusJoined] = useState(false);

  const [totalPoints, setTotalPoints] = useState(0); // State to store total points

  // Fetch posts using useQuery hook
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
          // Check if profile.activities is not null/undefined and is an array
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

          console.log(postData);

          // Calculate total points
          let calculatedTotalPoints = 0;
          profile.activities.forEach((activityId) => {
            const post = postData.post.find((pt) => pt.id === activityId);
            if (post) {
              calculatedTotalPoints += post.point;
            }
          });
          setTotalPoints(calculatedTotalPoints);

          // Update training point on the backend
          if (profile.role === "student") {
            updateTrainingPoint(profile.id, calculatedTotalPoints);
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

    setToke((prevState) => ({
      ...prevState,
      [testId]: true,
    }));
  };

  const handleListAttendees = async (id) => {
    navigate(`${PATHS.LIST_ATTENDEES}/${id}`);
  };

  return (
    <div className="homepage-container">
      <Sidebar />
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
                    statusJoined={joined[pt.id] || false} // Use the joined state for the specific post
                    onTakeTest={() => handleTakeTest(pt.testId, profile.id)}
                    onListAttendees={() => handleListAttendees(pt.id)}
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

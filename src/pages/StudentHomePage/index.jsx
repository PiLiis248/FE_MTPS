import React, { useState, useEffect } from 'react';
import '../../../public/assets/css/style.css'; // Adjust paths as necessary
import Post from '../../component/PostForm';
import useQuery from '../../hooks/useQuery';
import postService from '../../services/postService';
import testService from '../../services/testService';
import profileService from '../../services/profileService'; // Import profileService
import { useAuthContext } from '../../context/AuthContext';
import Sidebar from '../../component/SideBar';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../constants/path';

const StudentHomePage = () => {
    const { profile } = useAuthContext();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    const [totalPoints, setTotalPoints] = useState(0); // State to store total points

    // Fetch posts using useQuery hook
    const { data: postData, loading: postLoading, error: postError } = useQuery(
        postService.getPost
    );

    useEffect(() => {
        if (postData && postData.post && profile) {
            let filteredPosts = [];
            let facultyName = null;

            if (profile.role === 'assistant') {
                const filteredPosts = postData.post.filter(pt => pt.facultyName === profile.facultyName);
                setPost(filteredPosts.length > 0 ? filteredPosts : null);
            } else if (profile.role === 'student') {
                if (!!profile && !!profile.activities && Array.isArray(profile.activities)) { // Check if profile.activities is not null/undefined and is an array
                    facultyName = profile.facultyName;

                    postData.post.forEach(pt => {
                        if (pt.status === true || pt.status === false && pt.facultyName === facultyName) {
                            if (!profile.activities.includes(pt.id)) {
                                filteredPosts.push(pt);
                            }
                        }
                    });
                    setPost(filteredPosts.length > 0 ? filteredPosts : null);
                    console.log(postData);

                    // Calculate total points
                    let calculatedTotalPoints = 0;
                    profile.activities.forEach(activityId => {
                        const post = postData.post.find(pt => pt.id === activityId);
                        if (post) {
                            calculatedTotalPoints += post.point;
                        }
                    });
                    setTotalPoints(calculatedTotalPoints);
                    

                    // Update training point on the backend
                    if (profile.role === 'student') {
                        updateTrainingPoint(profile.id, calculatedTotalPoints);
                    }
                }
            }
        }
    }, [postData, profile]);
    
    // Function to update training point on the backend
    const updateTrainingPoint = async (userId, totalPoints) => {
        try {
            const response = await profileService.updateTrainingPoint(userId, totalPoints);
            console.log(response.data.message);
        } catch (error) {
            console.error('Error updating training point:', error.response.data.error);
        }
    };

    const [joined, setJoined] = useState({}); // Use an object to store joined status for each post
    const [toke, setToke] = useState({}); // Use an object to store joined status for each post
    
    const handleJoinActivity = async (postId, stuId) => {
        try {
            const postToUpdate = post.find(pt => pt.id === postId);
            
            // Check if profile.id already exists in pt.stdJoin
            if (postToUpdate.stdJoin && postToUpdate.stdJoin.includes(profile.id)) {
                message.info("You have already joined this activity.");
                return; // Exit the function early if user has already joined
            }
    
            // Call the API to update stdJoin
            const response = await postService.updatePost(postId, { stdJoin: [...postToUpdate.stdJoin, stuId] });
            message.success("Joined activity !");
    
            // Decrease numberParticipants in the backend
            const updatedPostData = { numberParticipants: postToUpdate.numberParticipants - 1 };
            await postService.updatePost(postId, updatedPostData);
    
            // Update the post state to reflect the changes
            setPost(prevPosts => prevPosts.map(prevPost => {
                if (prevPost.id === postId) {
                    return { ...prevPost, numberParticipants: prevPost.numberParticipants - 1 };
                }
                return prevPost;
            }));
    
            // Update joined status for the specific post
            setJoined(prevState => ({
                ...prevState,
                [postId]: true // Set joined status to true for this post
            }));
        } catch (error) {
            if (error.response && error.response.data) {
                console.error('Error updating post:', error.response.data.error);
            } else {
                console.error('Error updating post:', error.message);
            }
        }
    };
    
    useEffect(() => {
        // Check if profile and postData are available
        if (profile && postData && postData.post) {
            // Loop through each post in postData.post array
            postData.post.forEach(pt => {
                // Check if profile.id exists in the stdJoin array of the post
                if (pt.stdJoin && pt.stdJoin.includes(profile.id)) {
                    // If profile.id exists in stdJoin, set joined status to true for that post
                    setJoined(prevState => ({
                        ...prevState,
                        [pt.id]: true
                    }));
                }
            });
        }
    }, [profile, postData]);


    const handleTakeTest = async (testId) => {
        navigate(`${PATHS.TEST}/${testId}`)

        // Update the state to indicate that the test has been taken
        setToke(prevState => ({
            ...prevState,
            [testId]: true
        }));

    }

   
    const handleListAttendees = async (id) => {
        navigate(`${PATHS.LIST_ATTENDEES}/${id}`)
    }

    return (
        <div className="homepage-container">
            <Sidebar />
            <div className="main-content">
                <div className="progress-box">
                    {profile && profile.role === 'student' && (
                        <div className="progress-bar">
                            <div className="progress" style={{ width: `${totalPoints}%` }}></div>
                        </div>
                    )}
                    {!!profile && profile.role === 'student' && (
                        <div className="progress-text">
                            {totalPoints}%
                        </div>
                    )}
                </div>
                <div className="posts-container">
                    {post && post.reverse().map(pt => (
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
                                    statusTake={toke[pt.id] || false} // Use the joined state for the specific post
                                    onListAttendees={() => handleListAttendees(pt.id)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default StudentHomePage;

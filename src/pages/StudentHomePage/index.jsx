import React, { useState, useEffect } from 'react';
import '../../../public/assets/css/style.css'; // Adjust paths as necessary
import Post from '../../component/PostForm';
import useQuery from '../../hooks/useQuery';
import postService from '../../services/postService';
import profileService from '../../services/profileService'; // Import profileService
import { useAuthContext } from '../../context/AuthContext';
import Sidebar from '../../component/SideBar';

const StudentHomePage = () => {
    const { profile } = useAuthContext();
    const [post, setPost] = useState(null);
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
                            filteredPosts.push(pt);
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
                    {post && post.map(pt => (
                        <div key={pt.id} className="post-wrapper">
                            <div className="post-item">
                                <Post
                                    key={pt.id}
                                    name={pt.name}
                                    facultyName={pt.facultyName}
                                    desc={pt.desc}
                                    startTime={pt.startTime}
                                    endTime={pt.endTime}
                                    location={pt.location}
                                    numberParticipants={pt.numberParticipants}
                                    testId={pt.testId}
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

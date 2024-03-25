import React, { useState, useEffect } from 'react';
import '../../../public/assets/css/style.css'; // Adjust paths as necessary
import Sidebar from '../../component/SideBar';
import Post from '../../component/PostForm';
import useQuery from '../../hooks/useQuery';
import postService from '../../services/postService';
import '../../../public/assets/css/post.css';
import { useAuthContext } from '../../context/AuthContext';

const StudentHomePage = () => {
    const { profile } = useAuthContext();
 
    const [post, setPost] = useState(null);

    // Fetch posts using useQuery hook
    const { data: postData, loading: postLoading, error: postError } = useQuery(
        postService.getPost
    );

  
    useEffect(() => {
        if (postData && postData.post) {
            // Initialize an array to store filtered posts
            let filteredPosts = [];
            let facultyId = null; // Declare facultyId variable outside the if-else block
    
            if (!!profile) {
                facultyId = profile.facultyId; // Assign value to facultyId if profile exists
            }
    
            // Iterate over each post in postData.post
            postData.post.forEach(pt => {
                // Check if pt and pt.facultyId exist before accessing pt.facultyId
                if (pt.status === true || pt.status === false && pt.facultyId === facultyId) {
                    // If facultyId matches, add the post to filteredPosts
                    filteredPosts.push(pt);
                }
            });
    
            // Update the state to reflect the filtered posts
            setPost(filteredPosts.length > 0 ? filteredPosts : null);
        }
    }, [postData, profile]);
    
    return (
        <div className="homepage-container">
            <Sidebar  />
            <div className="main-content">
                <div className="progress-box">
                    <div className="progress-bar">
                        {!!profile ? (<div className="progress" style={{ width: `${profile.trainingPoint}%` }}></div>):(<div className="progress"></div>)}
                        
                    </div>
                    {!!profile ? (
                        <div className="progress-text">
                            {profile.trainingPoint}% {/* Rounded value displayed */}
                        </div>
                    ) : (
                        <div className="progress-text"></div>
                    )}
                    
                </div>
                <div className="posts-container">
                    {post && post.map(pt => (
                        <div key={pt.id} className="post-wrapper">
                            <div className="post-item">
                                <Post
                                     key={pt.id}
                                     name={pt.name}
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

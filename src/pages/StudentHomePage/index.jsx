import React from 'react';
import '../../../public/assets/css/style.css'; // Import your CSS file for styling
import Sidebar from '../../component/SideBar'; // Adjust the import path as necessary
import Post from '../../component/PostForm'; // Adjust the import path for your Post component
import useQuery from '../../hooks/useQuery';
import postService from '../../services/postService';
import '../../../public/assets/css/post.css';


// Simulated mock data for posts

const StudentHomePage = () => {
    const {
        data: postData,
        refetch: postRefetch,
        loading: postLoading,
        error: postError,
      } = useQuery(postService.getPost);
      const posts = postData?.post || [];
      console.log(posts);

    return (
        <div className="homepage-container">
            <Sidebar /> {/* Use the Sidebar component */}
            <div className="main-content">
                <div className="progress-box">
                    <div className="progress-bar">
                        {/* Progress bar */}
                        <div className="progress"></div>
                    </div>
                    <div className="progress-text">
                        {/* Progress text */}
                        50% {/* This value can be dynamically set */}
                    </div>
                </div>
                {/* Main content including posts */}

                <div className="posts-container">
                    {!!posts ? posts.map((post) => (
                        <div key={post.id} className="post-wrapper">
                            <div className="post-item">
                                <Post
                                     key={post.id}
                                     name={post.name}
                                     desc={post.desc}
                                     startTime={post.startTime}
                                     endTime={post.endTime}
                                     location={post.location}
                                     numberParticipants={post.numberParticipants}
                                     testId={post.testId}
                                />
                            </div>
                        </div>
                    )): ""}
                </div>
            </div>
        </div>
    );
}

export default StudentHomePage;

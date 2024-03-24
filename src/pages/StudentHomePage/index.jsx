import React, { useState, useEffect } from 'react';
import '../../../public/assets/css/style.css'; // Adjust paths as necessary
import Sidebar from '../../component/SideBar';
import Post from '../../component/PostForm';
import useQuery from '../../hooks/useQuery';
import postService from '../../services/postService';
import '../../../public/assets/css/post.css';

const StudentHomePage = () => {
    const { data: postData, refetch: postRefetch, loading: postLoading, error: postError } = useQuery(postService.getPost);
    const posts = postData?.post || [];

    const [studentData, setStudentData] = useState({});
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const mockStudentData = {
            id: "001001",
            name: "Jacob Garcia",
            email: "001001@gmail.com",
            trainingPoint: 50
        };
        setStudentData(mockStudentData);
        setProgress((mockStudentData.trainingPoint / 100) * 100);
    }, []);

    // if (postLoading) return <div className='loading'>Loading...</div>;
    if (postLoading) {
        return (
            <div className="loading">
                <div className="spinner"></div>
                <div className="loading-text">Loading...</div>
            </div>
        );
    }
    if (postError) return <div>Error loading posts</div>;

    return (
        <div className="homepage-container">
            <Sidebar username={studentData.name} email={studentData.email} progress={progress} />
            <div className="main-content">
                <div className="progress-box">
                    <div className="progress-bar">
                        <div className="progress" style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className="progress-text">
                        {Math.round(progress)}% {/* Rounded value displayed */}
                    </div>
                </div>
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

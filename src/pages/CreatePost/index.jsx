// CreatePost.js

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../../public/assets/css/create_post.css'; // Ensure you create this CSS file for styling
import SideBar from '../../component/SideBar'; // Import AssistantSidebar component
import { PATHS } from '../../constants/path';
import { useAuthContext } from '../../context/AuthContext'; // Import useAuthContext hook
import { postService } from '../../services/postService';

const CreatePost = () => {
    const { profile } = useAuthContext(); // Get the profile from the authentication context
    const navigate = useNavigate();

    // Load facultyName from localStorage if available, otherwise use the one from profile
    const initialFacultyName = localStorage.getItem('facultyName') || (profile ? profile.facultyName : '');

    const [formData, setFormData] = useState({
        name: '',
        facultyName: initialFacultyName,
        desc: '',
        status: true,
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        point: '',
        location: '',
        numberParticipants: '',
        testId: null,
    });

    useEffect(() => {
        // Save facultyName to localStorage when it changes
        localStorage.setItem('facultyName', formData.facultyName);
    }, [formData.facultyName]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCreateActivity = async (e) => {
        e.preventDefault();
        try {
            const response = await postService.createPost(formData);
            navigate(PATHS.HOME);
            console.log(response.data);
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

   

    return (
        <div className="create-post-container">
            <SideBar className="sidebar-create" />
            <div className="form-create">
                <h2>Post Form</h2>
                <form onSubmit={handleCreateActivity}>
                    <div className="form-group">
                        <label htmlFor="name"><strong>Topic event:</strong></label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="facultyName"><strong>Faculty:</strong></label>
                        <input type="text" id="facultyName" name="facultyName" value={formData.facultyName} onChange={handleChange} readOnly={!!profile} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="desc"><strong>Content:</strong></label>
                        <textarea id="desc" name="desc" value={formData.desc} onChange={handleChange}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="startDate"><strong>Open Form Date:</strong></label>
                        <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} />
    
                        <label htmlFor="startTime"><strong>Open Form Time:</strong></label>
                        <input type="time" id="startTime" name="startTime" value={formData.startTime} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="endDate"><strong>Close Form Date:</strong></label>
                        <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} />
                    
                        <label htmlFor="endTime"><strong>Close Form Time:</strong></label>
                        <input type="time" id="endTime" name="endTime" value={formData.endTime} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="location"><strong>Event information:</strong></label>
                        <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} placeholder='<place> _ <date> _ <time>'/>
                    </div>
                    {/* Dropdown for Training Point */}
                    <div className="form-group">
                        <label htmlFor="point"><strong>Training Point:</strong></label>
                        <select id="point" name="point" value={formData.point} onChange={handleChange}>
                            <option value="3">3</option>
                            <option value="5">5</option>
                            <option value="8">8</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="numberParticipants"><strong>Number of Participants:</strong></label>
                        <input type="number" id="numberParticipants" name="numberParticipants" value={formData.numberParticipants} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="status"><strong>Post Status:</strong></label>
                        <div className="switch-container">
                            <span className={formData.status ? 'private' : 'public'}>Private</span>
                            <label className="switch">
                                <input type="checkbox" name="status" checked={formData.status} onChange={() => setFormData(prevState => ({ ...prevState, status: !formData.status }))} />
                                <span className="slider round"></span>
                            </label>
                            <span className={formData.status ? 'public' : 'private'}>Public</span>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="create-buttons">
                            <button className="create-activity-button" onClick={handleCreateActivity}>Create Activity</button>
                            <Link to={PATHS.CREATE_TEST} className="create-test-link">
                                <button className="create-test-button">Create Test</button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;

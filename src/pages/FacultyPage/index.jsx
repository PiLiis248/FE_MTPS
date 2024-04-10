import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import profileService from '../../services/profileService';
import Sidebar from '../../component/SideBar';
import studentService from '../../services/facultyService';

const FacultyPage = () => {
    const { profile } = useAuthContext();
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                // Fetch students from MongoDB
                const response = await studentService.getAllStudents();
                // Filter students based on facultyName
                const filteredStudents = response.data.students.filter(student => student.facultyName === profile.name);
                setStudents(filteredStudents);
            } catch (error) {
                console.error("Error fetching students:", error.message);
            }
        };

        if (profile.role === "faculty") {
            fetchStudents();
        }
    }, [profile]);

    return (
        <div>
            <Sidebar/>
            <h1>List of Students</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Training Points</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.trainingPoint}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FacultyPage;

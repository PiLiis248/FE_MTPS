import React, { useEffect, useState } from 'react';
import "../../../public/assets/css/listAttendees.css"
import { Link, useParams, useNavigate } from 'react-router-dom';
import { PATHS } from '../../constants/path';
import { useAuthContext } from '../../context/AuthContext';
import postService from '../../services/postService';

const ListAttendeesPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentList, setCurrentList] = useState(null);

    useEffect(() => {
        const fetchListAttendees = async () => {
            try {
                const response = await postService.getAttendees(id);
                setCurrentList(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching list attendees data:', error);
            }
        };

        fetchListAttendees();
    }, [id]);


    return (
        <div>
            <hr />
            <Link to={PATHS.HOME} className='back-btn'>Back Home Page</Link>
            <h2>List of Attendees</h2>
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Time Joined</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(currentList.attendees).map((attendee, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{attendee.name}</td>
                            <td>{attendee.email}</td>
                            <td>{attendee.timeJoined}</td>
                            <td>{attendee.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListAttendeesPage;
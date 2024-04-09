import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PATHS } from '../../constants/path';
import { useAuthContext } from '../../context/AuthContext';
import postService from '../../services/postService';
import "../../../public/assets/css/listAttendees.css"

const ListAttendeesPage = () => {
  const { id } = useParams();
  const { profile } = useAuthContext();
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

  if (!currentList) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link to={PATHS.HOME} className='back-btn'>Back Home Page</Link>
      <ul className="attendees-list">
        {currentList.attendees.map((attendeeData, index) => (
          <li key={index} className="attendees-list-item">
            <div className="attendees-list-header">
              <span>Attendees: {attendeeData.attendees.length}</span>
            </div>
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Student</th>
                  <th>Student Email</th>
                  <th>Time Join Activity</th>
                  <th>Test Score</th>
                </tr>
              </thead>
              <tbody>
                {attendeeData.attendees.map((attendee, index) => (
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListAttendeesPage;
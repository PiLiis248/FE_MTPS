import React, { useEffect, useState } from 'react';
import "../../../public/assets/css/listAttendees.css"
import { Link, useParams, useNavigate } from 'react-router-dom';
import { PATHS } from '../../constants/path';
import { useAuthContext } from '../../context/AuthContext';
import postService from '../../services/postService';
import { List } from 'antd';

const ListAttendeesPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [currentList, setCurrentList] = useState(null);
    const [currentData, setCurrentData] = useState(null);

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
  console.log(currentList);
  useEffect(() => {
    if (currentList) {
      const aten = currentList.filteredAttendees;
      console.log(aten);
      const attendeesArray = aten.map((atten) => atten.attendees);
      setCurrentData(attendeesArray);
    }
  }, [currentList]);
  //   console.log(currentData);
  return (
    <div className="listatten-page">
      <Link to={PATHS.HOME} className="back-btn">
        Back Home Page
      </Link>
      <h2 className="title_list">List of Attendees</h2>
      {currentData && (
        <List className='attendees-container'
          itemLayout="horizontal"
          dataSource={currentData}
          renderItem={(attendees, index) => (
            <div className="list-attendees" key={index}>
              <div className="title-group">
                <div className="title-name">
                  Student
                </div>
                <div className="test-score">
                  Test Score
                </div>
              </div>
              {attendees &&
                attendees.map((item, index) => (
                  <List.Item key={index} className='list-student'>
                    <List.Item.Meta className='meta-student'
                      title={item.name}
                      description={item.email}
                    />
                    <div className="testscore">{item.testScore}</div>
                  </List.Item>
                ))}
            </div>
          )}
        />
      )}
    </div>
  );
};

export default ListAttendeesPage;
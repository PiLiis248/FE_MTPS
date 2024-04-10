import { List } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../../public/assets/css/listAttendees.css";
import { PATHS } from "../../constants/path";
import postService from "../../services/postService";
const ListAttendeesPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [currentList, setCurrentList] = useState(null);
  const [currentData, setCurrentData] = useState(null);

  useEffect(() => {
    const fetchListAttendees = async () => {
      try {
        const response = await postService.getAttendees(postId);
        setCurrentList(response?.data?.filteredAttendees);
      } catch (error) {
        console.error("Error fetching list attendees data:", error);
      }
    };

    fetchListAttendees();
  }, [postId]);
  useEffect(() => {
    if (currentList) {
      const attendeesArray = currentList.map((atten) => atten.attendees);
      setCurrentData(attendeesArray);
    }
  }, [currentList, setCurrentData]);
  return (
    <div className="listatten-page">
      <Link to={PATHS.HOME} className="back-btn">
        Back Home Page
      </Link>
      <h2 className="title_list">List of Attendees</h2>
      {currentData && (
        <List
          itemLayout="horizontal"
          dataSource={currentData}
          renderItem={(attendees, index) => (
            <div className="list-attendees" key={index}>
              {attendees &&
                attendees.map((item, index) => (
                  <List.Item key={index}>
                    <List.Item.Meta
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

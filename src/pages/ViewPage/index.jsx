import React, { useEffect, useState } from "react";
import Sidebar from "../../component/SideBar";
import assistantService from "../../services/assistantService";
import { Button, List } from "antd";
import useQuery from "../../hooks/useQuery";
import { PATHS } from "../../constants/path";
import { useNavigate } from "react-router-dom";

const ViewPage = () => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState();
  useEffect(() => {}, []);
  const {
    data: postData,
    loading: postLoading,
    error: postError,
  } = useQuery(assistantService.getExpiredPost);
  useEffect(() => {
    if (postData) {
      setDataSource(postData.expiredpost);
    }
  }, [postData]);

   // Function to handle clicking "List Attendees" button
   const handleListAttendees = (id) => {
    navigate(`${PATHS.LIST_ATTENDEES}/${id}`);
  };

  return (
    <div className="view-page">
      <Sidebar className="sidebar-create" />
      <div
        className="view-page-list"
        style={{ marginLeft: "380px", padding: "30px 60px" }}
      >
        <List
          itemLayout="horizontal"
          dataSource={dataSource}
          renderItem={(item, index) => (
            <List.Item style={{ display: "flex" }}>
              <List.Item.Meta
                style={{ flex: "2" }}
                title={item?.postFields.name}
                description={item?.postFields.desc}
              />
              <div
                className="info"
                style={{ display: "flex", flex: "3", columnGap: "30px" }}
              >
                <div
                  className="info_start"
                  style={{ display: "flex", columnGap: "10px" }}
                >
                  <div className="info_start-date">
                    {item?.postFields.startDate}
                  </div>
                  <div className="info_start-time">
                    {item?.postFields.startTime}
                  </div>
                </div>
                <div className="div">-</div>
                <div
                  className="info_end"
                  style={{ display: "flex", columnGap: "10px" }}
                >
                  <div className="info_end-date">
                    {item?.postFields.endDate}
                  </div>
                  <div className="info_end-time">
                    {item?.postFields.endTime}
                  </div>
                </div>
                <div>
                  <Button
                    onClick={() => handleListAttendees(item.id)}
                    type="primary"
                    style={{
                      marginLeft: '100px', 
                      backgroundColor: 'yellow', 
                      color: 'black',
                    }}
                  >
                    List Attendees
                  </Button>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default ViewPage;

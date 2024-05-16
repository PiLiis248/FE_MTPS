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
    <div
      className="view-page"
      style={{ marginLeft: "430px", padding: "30px 40px" }}
    >
      <Sidebar className="sidebar-create" />
      <div className="view-page-list">
        <div className="content">
          <div className="content__name">Post name</div>
          <div className="content__time">Time event</div>
          <div className="content__atten">List Attendees</div>
        </div>
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
              </div>
              <div className="other">
                <Button
                  onClick={() => handleListAttendees(item?.postFields.id)}
                  type="primary"
                  style={{
                    backgroundColor: "yellow",
                    color: "black",
                  }}
                >
                  List Attendees
                </Button>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default ViewPage;

import React, { useEffect } from 'react';
import '../../../public/assets/css/trainingPoint.css';
import Sidebar from '../../component/SideBar';
import { useAuthContext } from '../../context/AuthContext';
import useQuery from '../../hooks/useQuery';
import postService from '../../services/postService';

const TrainingPointDetail = () => {
  const { data: postData, loading: postLoading, error: postError } = useQuery(
    postService.getPost
  );
  const posts = postData?.post || [];
  const { profile } = useAuthContext();

  // Function to calculate the total points
  const calculateTotalPoints = () => {
    let total = 0;
    if (!!profile) {
      profile.activities.forEach(activityId => {
        const post = posts.find(pt => pt.id === activityId);
        if (post) {
          total += post.point;
        }
      });
    }
    return total;
  };

  // Calculate total points
  const totalPoints = calculateTotalPoints();

  return (
    <div className="homepage-container">
      <Sidebar />
      <div className="main-content training-point-detail">
        <table>
          <thead>
            <tr>
              <th>Post Name</th>
              <th>Faculty</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
          {!!profile && posts ? (
            profile.activities.flatMap((item) => 
              posts.map((pt, index) => {
                if (pt.id === item) {
                  return (
                    <tr key={index}>
                      <td>{pt.name}</td>
                      <td>{pt.facultyName}</td>
                      <td>{pt.point}</td>
                    </tr>
                  );
                }
                return null;
              }).filter(row => row !== null)
            )
          ) : ('')}
            <tr>
              <td><strong>Total Points</strong></td>
              <td><strong></strong></td>
              <td><strong>{calculateTotalPoints()}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainingPointDetail;

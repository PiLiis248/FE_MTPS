import React, { useState, useEffect } from 'react';
import Sidebar from '../../component/SideBar';
import '../../../public/assets/css/trainingPoint.css';
import { useAuthContext } from '../../context/AuthContext';
import useQuery from '../../hooks/useQuery';
import postService from '../../services/postService';

const TrainingPointDetail = () => {

  // Fetch posts using useQuery hook
  const { data: postData, loading: postLoading, error: postError } = useQuery(
    postService.getPost
  );
  
  const posts = postData?.post || [];
  const {profile} = useAuthContext();
 

  // Function to calculate the total points
  const calculateTotalPoints = () => {
    let total = 0; // Initialize total
    
    // Assuming profile.activities is an array of post IDs,
    // and posts is an array of post objects with id and point properties
    if (!!profile) {
      profile.activities.forEach(activityId => {
        const post = posts.find(pt => pt.id === activityId);
        if (post) {
          total += post.point;
        }
      });
      
      return total; // Return the calculated total
    }
    
  };
  
  return (
    <div className="homepage-container">
      <Sidebar />
      <div className="main-content training-point-detail">
        <table>
          <thead>
            <tr>
              <th>Post Name</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
          {!!profile && posts ? (
            profile.activities.flatMap((item) => // Use flatMap to flatten the resulting array
              posts.map((pt, index) => {
                if (pt.id === item) {
                  return (
                    <tr key={index}>
                      <td>{pt.name}</td>
                      <td>{pt.point}</td>
                    </tr>
                  );
                }
                return null; // Return null for non-matching cases
              }).filter(row => row !== null) // Filter out the nulls
            )
          ) : ('')}
            <tr>
              <td><strong>Total Points</strong></td>
              <td><strong>{calculateTotalPoints()}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainingPointDetail;

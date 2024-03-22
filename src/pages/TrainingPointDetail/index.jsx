import React from 'react';
import '../../../public/assets/css/style.css';

const TrainingPointDetail = () => {
    // Mock data for training point details
    const trainingPointData = [
        { id: "tpt001001", total: 20, studentId: "001001", activities: ["ac001", "ac006", "ac010"] },
        { id: "tpt001002", total: 15, studentId: "001002", activities: ["ac002", "ac007", "ac012"] }
    ];

    // Mock data for activity details
    const activityData = [
        { id: "ac001", postId: "post01", studentId: "001001", achievePoint: 5 },
        { id: "ac002", postId: "post01", studentId: "001002", achievePoint: 5 }
    ];

    // Function to get post name based on post ID
    const getPostName = (postId) => {
        // Assuming there is a mapping of post IDs to post names
        // You can implement your own logic here
        // For example, fetching from a database or using a predefined mapping
        return "Post " + postId.slice(-2); // Example: "Post 01", "Post 02", etc.
    };

    return (
        <div className="training-point-detail">
            <h2>Training Point Detail</h2>
            <table>
                <thead>
                    <tr>
                        <th>Post Name</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {trainingPointData.map((trainingPoint) => (
                        <React.Fragment key={trainingPoint.id}>
                            {trainingPoint.activities.map((activityId) => (
                                <tr key={activityId}>
                                    <td>{getPostName(activityData.find(activity => activity.id === activityId)?.postId)}</td>
                                    <td>{activityData.find(activity => activity.id === activityId)?.achievePoint}</td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TrainingPointDetail;

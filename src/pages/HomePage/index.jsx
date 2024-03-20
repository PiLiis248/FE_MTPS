// pages/HomePage/index.jsx
import React from 'react';
import '././assets/style.css'; // Import your CSS file for styling

const HomePage = () => {
    return (
        <div className="homepage-container">
            <div className="sidebar">
                {/* Sidebar content goes here */}
                <h2>Sidebar (1/3 width)</h2>
            </div>
            <div className="main-content">
                {/* Main content goes here */}
                <h2>Main Content (2/3 width)</h2>
            </div>
        </div>
    );
}

export default HomePage;


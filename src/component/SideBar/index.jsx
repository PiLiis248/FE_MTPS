import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ChangePasswordComponent from '../ChangePassword'; // Adjust the import path as necessary
import '../../../public/assets/css/userInfoDialog.css'
import '../../../public/assets/css/style.css'


// const Sidebar = () => {
//     const [isDialogOpen, setDialogOpen] = useState(false);
//     const [isChangePasswordOpen, setChangePasswordOpen] = useState(false); // State for change password dialog
//     const user = {
//         name: "John Doe",
//         email: "johndoe@example.com",
//     };

//     const navigate = useNavigate();

//     // Function to handle logout
//     const handleLogout = () => {
//         // Clear user session or authentication tokens if any
//         // For example: localStorage.removeItem("authToken");

//         // Redirect to login page
//         navigate("/login");
//     };

//     // Function to toggle the user info dialog state
//     const toggleDialog = () => {
//         setDialogOpen(!isDialogOpen);
//     };

//     // Function to toggle the change password dialog
//     const toggleChangePasswordDialog = (e) => {
//         e.stopPropagation(); // Prevent triggering toggleDialog
//         setChangePasswordOpen(!isChangePasswordOpen);
//     };

//     return (
//         <div className="sidebar">
//             <div className="user-info" onClick={toggleDialog}>
//                 <div className="username">{user.name}</div>
//                 <div className="email">{user.email}</div>
//                 <button className="change-password-btn" onClick={toggleChangePasswordDialog}>Change Password</button>
//             </div>
            
//             {isDialogOpen && <UserInfoDialog user={user} onClose={toggleDialog} />}
//             {isChangePasswordOpen && <ChangePasswordComponent onClose={toggleChangePasswordDialog} />}
//             <ul className="sidebar-menu">
//                 <li className="sidebar-item"><Link to="/">Home</Link></li>
//                 <li className="sidebar-item"><Link to="/tptdetail">Training Point Detail</Link></li>
//                 <li className="sidebar-item" onClick={handleLogout}><Link to="/logout">Logout</Link></li>
//             </ul>
//         </div>
//     );
// }

// export default Sidebar;


const Sidebar = ({ username, email, progress }) => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/login");
    };

    const toggleDialog = () => {
        setDialogOpen(!isDialogOpen);
    };

    const toggleChangePasswordDialog = (e) => {
        e.stopPropagation();
        setChangePasswordOpen(!isChangePasswordOpen);
    };

    return (
        <div className="sidebar">
            <div className="user-info" onClick={toggleDialog}>
                <div className="username">{username}</div>
                <div className="email">{email}</div>
                <button className="change-password-btn" onClick={toggleChangePasswordDialog}>Change Password</button>
            </div>
            
            {isDialogOpen && <UserInfoDialog user={{ name: username, email }} onClose={toggleDialog} />}
            {isChangePasswordOpen && <ChangePasswordComponent onClose={toggleChangePasswordDialog} />}
            <ul className="sidebar-menu">
                <li className="sidebar-item"><Link to="/">Home</Link></li>
                <li className="sidebar-item"><Link to="/detail">Training Point Detail</Link></li>
                <li className="sidebar-item" onClick={handleLogout}><Link to="/logout">Logout</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ChangePasswordComponent from '../ChangePassword'; // Adjust the import path as necessary
import '../../../public/assets/css/userInfoDialog.css'
import '../../../public/assets/css/style.css'
import { useAuthContext } from '../../context/AuthContext';
import { PATHS } from '../../constants/path';


const Sidebar = () => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isChangePasswordOpen, setChangePasswordOpen] = useState(false);
    const { profile } = useAuthContext();
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

    // return (
    //     <div className="sidebar">
    //         <div className="user-info" onClick={toggleDialog}>
    //             <div className="username">{profile.name}</div>
    //             <div className="email">{profile.email}</div>
    //             <button className="change-password-btn" onClick={toggleChangePasswordDialog}>Change Password</button>
    //         </div>
            
    //         {isDialogOpen && <UserInfoDialog user={{ name: profile.name, email }} onClose={toggleDialog} />}
    //         {isChangePasswordOpen && <ChangePasswordComponent onClose={toggleChangePasswordDialog} />}
    //         <ul className="sidebar-menu">
    //             <li className="sidebar-item"><Link to="/">Home</Link></li>
    //             <li className="sidebar-item"><Link to="/detail">Training Point Detail</Link></li>
    //             <li className="sidebar-item" onClick={handleLogout}><Link to="/logout">Logout</Link></li>
    //         </ul>
    //     </div>
    // );

    return (
        <div className="sidebar">
            {profile && (
                <>
                    <div className="user-info" onClick={toggleDialog}>
                        <div className="username">{profile.name}</div>
                        <div className="email">{profile.email}</div>
                        <button className="change-password-btn" onClick={toggleChangePasswordDialog}>Change Password</button>
                    </div>
                    
                    {isDialogOpen && <UserInfoDialog user={{ name: profile.name, email: profile.email }} onClose={toggleDialog} />}
                    {isChangePasswordOpen && <ChangePasswordComponent onClose={toggleChangePasswordDialog} />}
                </>
            )}
            <ul className="sidebar-menu">
                <li className="sidebar-item"><Link to={PATHS.HOME}>Home</Link></li>
                <li className="sidebar-item"><Link to={PATHS.DETAIL}>Training Point Detail</Link></li>
                <li className="sidebar-item" onClick={handleLogout}><Link to={PATHS.LOGIN}>Logout</Link></li>
            </ul>
        </div>
    );
    
};

export default Sidebar;
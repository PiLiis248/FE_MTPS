// src/components/UserInfoDialog/index.jsx

import React from 'react';
import '../../../public/assets/css/userInfoDialog.css'; // Adjust the path based on your actual file structure

const UserInfoDialog = ({ isOpen, onClose, onPasswordChange, user }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="user-info">
          <img src={user.avatarUrl} alt="Avatar" className="avatar" />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
        <button onClick={onPasswordChange} className="change-password-btn">Change Password</button>
        <button onClick={onClose} className="cancel-btn">Cancel</button>
      </div>
    </div>
  );
};

export default UserInfoDialog;

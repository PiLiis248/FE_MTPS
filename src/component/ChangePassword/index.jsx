// ChangePasswordComponent.jsx

import React, { useState } from 'react';
import '../../../public/assets/css/style.css'

const ChangePasswordComponent = ({ onClose }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('The new passwords do not match.');
            return;
        }
        // Here, integrate the actual change password logic,
        // for example, calling an API to change the password.
        // On success:
        alert('Password successfully changed.');
        onClose(); // Close the modal/dialog
        // On failure:
        // setError('An error occurred. Please try again.');
    };

    return (
        <div className="change-password-modal">
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Change Password</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default ChangePasswordComponent;

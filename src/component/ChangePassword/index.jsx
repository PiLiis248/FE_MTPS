import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import '../../../public/assets/css/userInfoDialog.css';
import { profileService } from '../../services/profileService'; // Import profileService for API calls
import { useAuthContext } from '../../context/AuthContext';
import { PATHS } from '../../constants/path';

const ChangePasswordComponent = ({ onClose }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { profile } = useAuthContext();
    const navigate = useNavigate(); // Initialize the navigate function

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('The new passwords do not match.');
            return;
        }
        
        try {
            if(!!profile) {
                // Call the API to change password
                await profileService.changePassword(profile.id, currentPassword, newPassword);
            }
            // On success
            alert('Password successfully changed.');
            navigate(PATHS.LOGIN);
        } catch (error) {
            // On failure
            setError('Current password is not correct. Please try again.');
            console.error('Error changing password:', error.response.data.error);
        }
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

import React, { useState } from 'react';
import { IoKeyOutline, IoPersonCircleOutline, IoTrashOutline, IoLogOutOutline } from "react-icons/io5";
import { MdOutlineSecurity, MdOutlinePalette } from "react-icons/md";
import axios from 'axios';
import "./SettingsPage.css"

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [message, setMessage] = useState('');

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirect to login
    };

    return (
        <div className="settings-wrapper">
            <div className="settings-header">
                <h2>Settings</h2>
                <p>Manage your account settings and preferences.</p>
            </div>

            <div className="settings-content">
                {/* Internal Navigation */}
                <div className="settings-tabs">
                    <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>
                        <IoPersonCircleOutline /> Profile
                    </button>
                    <button className={activeTab === 'security' ? 'active' : ''} onClick={() => setActiveTab('security')}>
                        <IoKeyOutline /> Security
                    </button>
                    <button className={activeTab === 'preferences' ? 'active' : ''} onClick={() => setActiveTab('preferences')}>
                        <MdOutlinePalette /> Preferences
                    </button>
                </div>

                <div className="settings-panel">
                    {activeTab === 'profile' && (
                        <div className="panel-item">
                            <h3>Profile Information</h3>
                            <div className="setting-row">
                                <label>Full Name</label>
                                <input type="text" placeholder="Your Name" defaultValue="Joshua" />
                            </div>
                            <div className="setting-row">
                                <label>Email Address</label>
                                <input type="email" placeholder="email@example.com" />
                            </div>
                            <button className="save-btn">Update Profile</button>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="panel-item">
                            <h3>Security Settings</h3>
                            <div className="setting-row">
                                <label>Current Password</label>
                                <input type="password" />
                            </div>
                            <div className="setting-row">
                                <label>New Password</label>
                                <input type="password" />
                            </div>
                            <button className="save-btn">Change Password</button>
                        </div>
                    )}

                    {activeTab === 'preferences' && (
                        <div className="panel-item">
                            <h3>App Preferences</h3>
                            <div className="setting-row toggle-row">
                                <div>
                                    <h4>Dark Mode</h4>
                                    <p>Adjust the appearance of the app.</p>
                                </div>
                                <input type="checkbox" className="toggle-switch" />
                            </div>
                            <div className="setting-row">
                                <h4>Export Contacts</h4>
                                <p>Download your contacts in CSV format.</p>
                                <button className="secondary-btn">Download .csv</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="settings-footer">
                <button className="logout-btn-alt" onClick={handleLogout}>
                    <IoLogOutOutline /> Logout from all devices
                </button>
                <button className="danger-btn">
                    <IoTrashOutline /> Delete Account
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;
import React, { useState, useEffect } from 'react';
import Modal from './modal/Modal';
import "./Home.css";
import { IoIosContact, IoIosLogOut, IoIosStar } from "react-icons/io";
import { PiBagFill, PiTagChevronDuotone } from 'react-icons/pi';
import { FcSettings } from 'react-icons/fc';
import { BsQuestionOctagonFill } from 'react-icons/bs';
import { IoSearchOutline } from 'react-icons/io5';
import { LuUserRoundPlus } from 'react-icons/lu';
import AddPage from './addpage/AddPage';
import axios from 'axios';
import EditContact from './Editcontact/EditContact';
import SettingsPage from './setting/SettingsPage';

const Home = () => {
    const [state, setState] = useState(false); // Modal state
    const [state2, setState2] = useState(false); // AddPage state
    const [view, setView] = useState('all'); // Handles: 'all', 'work', 'personal', 'settings', 'support'
    const [selectedContact, setSelectedContact] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [editState, setEditState] = useState(false);

    const fetchContacts = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://127.0.0.1:8000/api/get_contacts/", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setContacts(response.data);
        } catch (err) {
            console.log("Error fetching contacts:", err);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const renderView = () => {
        // 1. Check for special pages first
        if (view === 'settings') {
            return <SettingsPage />;
        }
        
        if (view === 'support') {
            return (
                <div style={{padding: '20px'}}>
                    <h2>Help & Support</h2>
                    <p>Contact us at: support@contactapp.com</p>
                </div>
            );
        }

        // 2. Handle Contact Filtering logic
        let displayedContacts = contacts;

        if (view === 'work') {
            displayedContacts = contacts.filter((contact) => {
                const cat = contact.Category?.name?.toLowerCase();
                return cat === "work" || cat === "office";
            });
        } else if (view === 'personal') {
            displayedContacts = contacts.filter((contact) => {
                const cat = contact.Category?.name?.toLowerCase();
                return cat !== "work" && cat !== "office";
            });
        }

        return (
            <>
                <div className="top-bar">
                    <select><option>All category</option></select>
                    <div className="search-box">
                        <IoSearchOutline className="search-icon" />
                        <input type="text" placeholder='Search' />
                    </div>
                    <button><IoIosLogOut /> LogOut</button>
                </div>

                <div className='contact-list'>
                    {displayedContacts.length > 0 ? displayedContacts.map((contact) => (
                        <div className='contact-card' key={contact.id}>
                            <img src="profile.webp" alt="profile" className="profile-img" />
                            <h3>{contact.name}</h3>
                            <p className="category">{contact.Category?.name || "No Category"}</p>
                            <button className="view-btn" onClick={() => {
                                setSelectedContact(contact);
                                setState(true);
                            }}>View</button>
                        </div>
                    )) : <p>No {view} contacts available.</p>}
                </div>
            </>
        );
    };

    return (
        <div className='main'>
            <section className='sec1'>
                <div className='div-con'>
                    <h2 onClick={() => setView('all')} style={{ cursor: 'pointer' }}>Contacts</h2>
                    <h4>Software Developer</h4>
                </div>
                <div className='div-con2'>
                    <ol>
                        <li className={`sidebar-item ${view === 'all' ? 'active' : ''}`}>
                            <button onClick={() => setView('all')}><IoIosContact /> All Contacts</button>
                        </li>
                        <li className={`sidebar-item ${view === 'work' ? 'active' : ''}`}>
                            <button onClick={() => setView('work')}><PiBagFill /> Work</button>
                        </li>
                        <li className={`sidebar-item ${view === 'personal' ? 'active' : ''}`}>
                            <button onClick={() => setView('personal')}><PiTagChevronDuotone /> Personal</button>
                        </li>
                    </ol>
                </div>
                <div className='div-con3'>
                    <ol>
                        <li className={`sidebar-item ${view === 'settings' ? 'active' : ''}`}>
                            <button onClick={() => setView('settings')}><FcSettings /> Settings</button>
                        </li>
                        <li className={`sidebar-item ${view === 'support' ? 'active' : ''}`}>
                            <button onClick={() => setView('support')}><BsQuestionOctagonFill /> Support</button>
                        </li>
                    </ol>
                </div>
            </section>

            <section className='sec2'>
                {renderView()}

                <div className="add-btn-container">
                    <button className="floating-add-btn" onClick={() => setState2(true)}>
                        <LuUserRoundPlus />
                    </button>
                </div>

                {state && <Modal state={setState} contact={selectedContact} />}
                {state2 && <AddPage closeAddpage={setState2} />}
                {editState && <EditContact contact={selectedContact} closeEdit={setEditState} />}
            </section>
        </div>
    );
}

export default Home;
import React, { useState } from 'react';
import axios from 'axios';

import { MdOutlineCancel } from "react-icons/md";

import "./Model.css";

import EditContact from '../editcontact/EditContact';

const Modal = ({ state, contact }) => {

    // ================= NULL CHECK =================

    if (!contact) return null;

    // ================= EDIT PAGE STATE =================

    const [editState, setEditState] = useState(false);

    // ================= DELETE FUNCTION =================

    const handleDelete = async () => {

        try {

            const token = localStorage.getItem("token");

            await axios.delete(

                `http://127.0.0.1:8000/api/delete_contacts/${contact.id}/`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            alert("Deleted Successfully ✅");

            state(false);

            window.location.reload();

        } catch (err) {

            console.log(err);

            alert("Delete Failed ❌");

        }

    };

    // ================= MAIN UI =================

    return (

        <div className='modal'>

            {/* CLOSE BUTTON */}

            <button
                className='btn'
                onClick={() => state(false)}
            >
                <MdOutlineCancel />
            </button>

            {/* PROFILE IMAGE */}

            <img
                src="profile.webp"
                alt="profile"
                className='profile-img'
            />

            {/* CONTACT DETAILS */}

            <div className='contact-card'>

                <h2>{contact.name}</h2>

                <p>
                    <strong>Phone:</strong> {contact.Number}
                </p>

                <p>
                    <strong>Email:</strong> {contact.email}
                </p>

                <p>
                    <strong>Category:</strong>{" "}
                    {contact.Category?.name || "No Category"}
                </p>

            </div>

            {/* BUTTONS */}

            <div className='modal-btns'>

                <button
                    className='edit-btn'
                    onClick={() => setEditState(true)}
                >
                    Edit
                </button>

                <button
                    className='delete-btn'
                    onClick={handleDelete}
                >
                    Delete
                </button>

            </div>

            {/* EDIT CONTACT PAGE */}

            {editState && (

                <EditContact

                    contact={contact}

                    closeEdit={setEditState}

                />

            )}

        </div>

    );
};

export default Modal;
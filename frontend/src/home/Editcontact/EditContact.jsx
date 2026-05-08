import React, { useState } from 'react'

import axios from 'axios'

import "./Editcontact.css"

const EditContact = ({ contact, closeEdit }) => {

    const [form, setForm] = useState({

        name: contact.name,

        number: contact.Number,

        email: contact.email,

        category: contact.Category?.name || ""

    });

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleUpdate = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            await axios.put(

                `http://127.0.0.1:8000/api/update_contact/${contact.id}/`,

                form,

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            alert("Contact Updated Successfully ✅");

            closeEdit(false);

            window.location.reload();

        } catch (err) {

            console.log(err);

            alert("Update Failed ❌");

        }

    };

    return (

        <div className='edit-container'>

            <div className='edit-card'>

                <h2>Edit Contact</h2>

                <form onSubmit={handleUpdate}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="number"
                        placeholder="Phone Number"
                        value={form.number}
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={form.category}
                        onChange={handleChange}
                    />

                    <div className='edit-btns'>

                        <button type='submit'>
                            Update
                        </button>

                        <button
                            type='button'
                            onClick={() => closeEdit(false)}
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>

    )
}

export default EditContact
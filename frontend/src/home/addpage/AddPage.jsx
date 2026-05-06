import React, { useState } from 'react'
import { IoPersonOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
import { PiTagDuotone } from "react-icons/pi";
import {ImCancelCircle} from "react-icons/im"
import "./AddPage.css"
import axios from 'axios'


const AddPage = ({closeAddpage}) => {

  const [form, setForm] = useState({
    name: "",
    number: "",
    email: "",
    category: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://127.0.0.1:8000/api/add_contact/", form);
      alert("Contact Added Successfully ✅");
    } catch (err) {
      alert("Error adding contact ❌");
    }
  }

  return (
    <div className="add-container">
      <div className="add-card">
        <div className='cancel-div'>
            <button className='cancel-btn' onClick={()=>{closeAddpage(false)}}>
                <ImCancelCircle />
            </button>
        </div>

        <h2>Add Contact</h2>

        <form onSubmit={handleSubmit}>

          <div className="input-box">
            <IoPersonOutline />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <BsTelephone />
            <input
              type="text"
              name="number"
              placeholder="Phone Number"
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <MdEmail />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
            />
          </div>

          <div className="input-box">
            <PiTagDuotone />
            <input
              type="text"
              name="category"
              placeholder="Category (Work/Personal)"
              onChange={handleChange}
            />
          </div>

          <button type="submit">Add Contact</button>

        </form>
      </div>
    </div>
  )
}

export default AddPage
import React from 'react'
import { MdEmail, MdOutlineCancel } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { IoIosCopy } from "react-icons/io";
import "./Model.css"
const Modal = ({state}) => {
    
  return (
    <div className='modal'>
        <button className='btn' onClick={()=>{state(false)}}><MdOutlineCancel /></button>
        <img src="profile.webp" alt="" />
        <h3>Jasmine John</h3>
        <h5>software developer</h5>

        <div>
            <BsTelephoneFill/>
            <h4>
                mobile 
            </h4>
            <IoIosCopy/>
        </div>
        <div>
            <MdEmail/>
            <h4>
                Email
            </h4>
            <IoIosCopy/>
        </div>
        <div className=''>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    </div>
  )
}

export default Modal

import React, { useState } from 'react'
import Modal from './modal/Modal'
import "./Home.css"
import { IoIosContact, IoIosLogOut, IoIosStar } from "react-icons/io";
import { PiBagFill, PiTagChevronDuotone, PiTagDuotone } from 'react-icons/pi';
import { FcAbout, FcSettings } from 'react-icons/fc';
import { BsQuestionOctagon, BsQuestionOctagonFill } from 'react-icons/bs';
import { IoSearchOutline } from 'react-icons/io5';
import {LuUserRoundPlus} from 'react-icons/lu'
import AddPage from './addpage/AddPage';


const Home = () => {
    let [state,setState]=useState(false)
    let [state2,setState2]=useState(false)
  return (
    <div className='main'>
        <section className='sec1'>
            <div className='div-con'>
                <h2>Contacts</h2>
                <h4>Software Developer</h4>
            </div>
            <div className='div-con2'>
                <ol>
                    <li><IoIosContact/> All Contacts</li>
                    <li><IoIosStar/> Favorites</li>
                    <li><PiBagFill/> Work</li>
                    <li><PiTagChevronDuotone/> Personal</li>
                </ol>
            </div>
            <div className='div-con3'>
                <ol>
                    <li><FcSettings/>Settings</li>
                    <li><BsQuestionOctagonFill/> Support</li>
                </ol>
            </div>
        </section>
        <section className='sec2'>
            <div className="top-bar">
                <select>
                    <option>All category</option>
                </select>
                <div className="search-box">
                    <IoSearchOutline className="search-icon"/>
                    <input type="text" placeholder='Search'/>
                </div>
                <div>
                 <button><IoIosLogOut/> LogOut</button>
                </div>
            </div>
            <div>
                <button onClick={()=>{
                    setState(true)
                }}>View</button>
            </div>
        </section>
      {state && <Modal state={setState}/>}
      <div>
        <button onClick={()=>{setState2(true)}}><LuUserRoundPlus /></button>
      </div>
      {state2 && <AddPage closeAddpage={setState2}/>}
    </div>
  )
}

export default Home

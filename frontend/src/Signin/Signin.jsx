import React from 'react' 
import { useState } from 'react';
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoPersonOutline } from "react-icons/io5";
import "./Signin.css"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

let Signin = () => {
  let [name, setName]=useState("")
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let navigate = useNavigate();
  let [actSwitch,setSwitch]=useState('signin');

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post("http://127.0.0.1:8000/api/signin/", {
        email: email,
        password: password
      });
      let token = response.data.token;
      localStorage.setItem("token", token); // store token for later requests
      navigate("/home"); // redirect to home
    } catch (error) {
      alert("Login failed: " + (error.response?.data?.error || "Unknown error"));
    }
  };
  let handleSubmit2 = async (e) => {
  e.preventDefault();
  try {
    let response = await axios.post("http://127.0.0.1:8000/api/signup/", {
      username: name,   
      email: email,
      password: password
    });
    alert("Signup successful ✅");
    navigate("/");  
  } catch (error) {
    alert("Signup failed: " + (error.response?.data?.error || "Unknown Error"));
  }
};
  return (
    <div className='back'>
    {actSwitch ==="signin" && (
     <aside>
        <section className='sign-flex'>
            <div>
                <img src="signin.png" alt="" />
            </div>
            <div className='signin'>
                <h1>Sign In</h1>
                <h4>Access your Contact</h4>
                <form onSubmit={handleSubmit}>
                <div>
                    <MdOutlineMail/>
                    <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <RiLockPasswordLine />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>    
                </div>
                <div>
                    <input type="checkbox" id='check'/><label htmlFor="check">Remember Me</label>
                    <a href="#">forgot Password</a>
                </div>
                <button type='submit'>Sign in</button>
                <p>
                    Don't you have a Account ?
                    <Link onClick={()=>{setSwitch('signup')}}>SignUp</Link>
                </p>               

                </form>
            </div>
        </section>
    </aside>
    )}
    {actSwitch === "signup" && ( 
    <aside>
        <div className="wrapper">
            <div className="left">
                <img src="signin.png" alt="illustration" />
            </div>
            <div className="right">
                <h1>Sign Up</h1>
                <h4>Create your account</h4>
        
                <form>
                    <div className="input-box">
                      <IoPersonOutline />
                      <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
        
                    <div className="input-box">
                      <MdOutlineMail />
                      <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
        
                    <div className="input-box">
                      <RiLockPasswordLine />
                      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
        
                    <div className="input-box">
                      <RiLockPasswordLine />
                      <input type="password" placeholder="Confirm Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
        
                    <button type="submit">Sign Up</button>
                
                    <p>
                      Already have an account? 
                      <Link onClick={()=>{setSwitch("signin")}}>Sign In</Link>
                    </p>
                </form>
            </div>
        
        </div>
    </aside>
    )}
    </div>
    
  )
}

export default Signin

import React, { useState } from 'react'
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoPersonOutline } from "react-icons/io5";
import "./Signin.css"
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Signin = () => {

  // ---------------- STATES ----------------

  let [name, setName] = useState("")
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [confirmPassword, setConfirmPassword] = useState("")

  let [actSwitch, setSwitch] = useState('signin')

  let navigate = useNavigate()

  // ---------------- SIGNIN ----------------

  let handleSubmit = async (e) => {

    e.preventDefault()
    console.log(email);
    console.log(password);
    

    try {

      let response = await axios.post(
        "http://127.0.0.1:8000/api/signin/",
        {
          email: email,
          password: password
        }
      )

      let token = response.data.token

      // ✅ store token
      localStorage.setItem("token", token)

      alert("Login Successful ✅")

      navigate("/home")

    } catch (error) {

      console.log(error.response?.data)

      alert(
        "Login failed: " +
        (error.response?.data?.error || "Unknown error")
      )
    }
  }

  // ---------------- SIGNUP ----------------

  let handleSubmit2 = async (e) => {

    e.preventDefault()

    // ✅ password validation
    if (password !== confirmPassword) {
      alert("Passwords do not match ❌")
      return
    }

    try {

      let response = await axios.post(
        "http://127.0.0.1:8000/api/signup/",
        {
          // ✅ corrected key
          name: name,
          email: email,
          password: password
        }
      )

      console.log(response.data)

      alert("Signup successful ✅")

      // ✅ switch to signin page
      setSwitch("signin")

      // ✅ clear fields
      setName("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")

    } catch (error) {

      console.log(error.response?.data)

      alert(
        "Signup failed: " +
        (error.response?.data?.error || "Unknown Error")
      )
    }
  }

  return (

    <div className='back'>

      {/* ---------------- SIGNIN ---------------- */}

      {actSwitch === "signin" && (

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
                  <MdOutlineMail />

                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <RiLockPasswordLine />

                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div>
                  <input type="checkbox" id='check' />

                  <label htmlFor="check">
                    Remember Me
                  </label>

                  <a href="#">Forgot Password</a>
                </div>

                <button type='submit'>
                  Sign In
                </button>

                <p>
                  Don't have an Account ?

                  <Link onClick={() => setSwitch('signup')}>
                    Sign Up
                  </Link>
                </p>

              </form>

            </div>

          </section>

        </aside>
      )}

      {/* ---------------- SIGNUP ---------------- */}

      {actSwitch === "signup" && (

        <aside>

          <div className="wrapper">

            <div className="left">
              <img src="signin.png" alt="illustration" />
            </div>

            <div className="right">

              <h1>Sign Up</h1>
              <h4>Create your account</h4>

              {/* ✅ FIXED */}
              <form onSubmit={handleSubmit2}>

                <div className="input-box">

                  <IoPersonOutline />

                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="input-box">

                  <MdOutlineMail />

                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="input-box">

                  <RiLockPasswordLine />

                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="input-box">

                  <RiLockPasswordLine />

                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <button type="submit">
                  Sign Up
                </button>

                <p>

                  Already have an account?

                  <Link onClick={() => setSwitch("signin")}>
                    Sign In
                  </Link>

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
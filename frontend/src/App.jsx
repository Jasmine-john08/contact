import React from 'react'
import Signin from './Signin/Signin'
import Home from './home/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import Signup from './Signup/Signup'

let myRouter=createBrowserRouter([
  {path:'/',element:<Signin/>},
  // {path:'signup',element:<Signup/>},
  {path:'/home',element:<Home/>}
])



const App = () => {
  return (
   <RouterProvider router={myRouter}>

   </RouterProvider>
  )
}

export default App

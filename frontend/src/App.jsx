import React, { lazy, Suspense, useEffect, useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";

const Home =  lazy(() => import("./Pages/Home/Home"));
const Partieslist =  lazy(() => import("./Pages/Parties/Partieslist"));
const JobList =  lazy(() => import("./Pages/Job/JobList"));
const Print =  lazy(() => import("./Pages/Invoice/Print"));
const EmployeeList =  lazy(() => import("./Pages/Employee/EmployeeList"));
const JobEdit =  lazy(() => import("./Pages/Job/JobEdit"));
const Invoice =  lazy(() => import("./Pages/Invoice/Invoice"));
const Admin =  lazy(() => import("./Pages/Login/Admin"));
const Login =  lazy(() => import("./Pages/Employee/Login"));
import { selectAuth } from "./store/AuthSlice";
import backgroundvideo from './assets/img/video/background.gif'

const App = () => {
  // const { token, isLoggedIn } = useSelector(selectAuth);
  const {admintoken} = useSelector((state)=>state.admin);
  const {token} = useSelector((state)=>state.user);
  // const [token,settoken]=useState()
  // const [admintoken,setadmintoken]=useState()
  // useEffect(()=>{
  //   settoken(localStorage.getItem('usertoken'))
  //   setadmintoken(localStorage.getItem('admintoken'))
  // },[])

  return (
    <>  
    <Router>
      <div className="main-wrapper">
        
      {token || admintoken ? (
        <>
        <Header/>
        <Sidebar/>
        </>
      ) : ""}

            <div className="page-wrapper">
                 <div className="content">
                    <Suspense fallback={ <div>Loading....</div>}>
                    <Routes>
      {/* Route for home page */}
      <Route
        path="/exchangerate"
        element={admintoken ? <Home /> : <Navigate to="/admin/login" />}
      />
      
      {/* Route for user login */}
      <Route
        path="/login"
        element={token?<Navigate to='/'/>:<Login />}
      />
      
      {/* Route for admin login */}
      <Route
        path="/admin/login"
        element={admintoken?<Navigate to='/exchangerate'/>:<Admin />}
      />
      
      {/* Protected routes accessible with either admin token or user token */}
      <Route
        path="/parties"
        element={(admintoken || token) ? <Partieslist /> : <Navigate to="/login" />}
      />
      <Route
        path="/"
        element={(admintoken || token) ? <JobList /> : <Navigate to="/login" />}
      />
      <Route
        path="/invoice"
        element={(admintoken || token) ? <Invoice /> : <Navigate to="/login" />}
      />
      <Route
        path="/print"
        element={(admintoken || token) ? <Print /> : <Navigate to="/login" />}
      />
      
      {/* Protected route accessible only with admin token */}
      <Route
        path="/Employee"
        element={admintoken ? <EmployeeList /> : <Navigate to="/admin/login" />}
      />
      <Route
        path="/edit-job"
        element={(admintoken || token) ? <JobEdit /> : <Navigate to="/login" />}
      />
    </Routes>
                    </Suspense>
              </div>
             
           </div>
      </div>
      
      <div className="sidebar-overlay" data-reff=""></div>
    </Router>
                       </>
  )
}

export default App
import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Home from "./Pages/Home/Home";
import Partieslist from "./Pages/Parties/Partieslist";
import JobList from "./Pages/Job/JobList";

const App = () => {
  return (
    <>  
    <Router>
      <div className="main-wrapper">
        <Header/>
        <Sidebar/>

            <div className="page-wrapper">
                 <div className="content">
                    <Suspense fallback={ <div>Loading....</div>}>
                      <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/parties" element={<Partieslist/>}/>
                        <Route path="/job" element={<JobList/>}/>
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
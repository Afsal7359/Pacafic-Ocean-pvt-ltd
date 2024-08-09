import React, { useEffect, useState } from 'react'
import Dashboard from '../../assets/img/icons/home.png'
import logouticon from '../../assets/img/icons/Logout.png'
import Parties from '../../assets/img/icons/parties.png'
import Job from '../../assets/img/icons/job.png'
import Tally from '../../assets/img/icons/tally.png'
import Invoice from '../../assets/img/icons/invoice.png'
import Book from '../../assets/img/icons/book.png'
import EmployeeOp from '../../assets/img/icons/menu-icon-02.svg'
import { Link, NavLink } from 'react-router-dom';
import './sidebar.css'
import { adminlogout } from '../../store/Adminauth'
import { logout } from '../../store/AuthSlice'
import { useDispatch } from 'react-redux'

const Sidebar = () => {
	const dispatch = useDispatch()
	const [token,settoken]=useState()
	const [admintoken,setadmintoken]=useState()
	useEffect(()=>{
	  settoken(localStorage.getItem('usertoken'))
	  setadmintoken(localStorage.getItem('admintoken'))
	},[])

	const handlelogout =()=>{
        try {
           dispatch(logout())
            // localStorage.removeItem('token')
           
        } catch (error) {
            console.log(error);
        }
    }
    const handleAdminLogout =()=>{
        try {
            dispatch(adminlogout())
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
      <div className="sidebar" id="sidebar" style={{backgroundColor:"blueviolet"}}>
		<div className="sidebar-inner slimscroll">
			<div id="sidebar-menu" className="sidebar-menu">
				{admintoken?(<ul>
					<li className="menu">
						<NavLink exact to="/exchangerate" activeClassName="active" className="nav-link"><span className="menu-side"><img src={Dashboard} alt="" height={25} width={25}/></span> <span className='text-white'>Exchange Rate</span></NavLink>
					</li>
					<li className="menu">
						<NavLink to="/parties" activeClassName="active" className="nav-link"><span className="menu-side"><img src={Parties} alt="" height={25} width={25}/></span> <span className='text-white'>Parties</span></NavLink>
					</li>
					<li className="menu">
						<NavLink to="/" activeClassName="active" className="nav-link"><span className="menu-side"><img src={Job} alt="" height={25} width={25}/></span> <span className='text-white'>Job</span></NavLink>
					</li>
					<li className="menu">
						<NavLink to="/invoice" activeClassName="active" className="nav-link"><span className="menu-side"><img src={Invoice} alt="" height={25} width={25}/></span> <span className='text-white'>Invoice</span></NavLink>
					</li>
					<li className="menu">
						<NavLink to="/Employee" activeClassName="active" className="nav-link"><span className="menu-side"><img src={Job} alt="" height={25} width={25}/></span> <span className='text-white'>Employee Operation</span></NavLink>
					</li>
					{/* <li className="menu">
						<NavLink to="/day-book" activeClassName="active" className="nav-link"><span className="menu-side"><img src={Book} alt="" height={25} width={25}/></span> <span className='text-white'>Day Book</span></NavLink>
					</li>
					<li className="menu">
						<NavLink to="/tally" activeClassName="active" className="nav-link"><span className="menu-side"><img src={Tally} alt="" height={25} width={25}/></span> <span className='text-white'>Tally</span></NavLink>
					</li> */}
					<li className="menu mb-5">
						<Link onClick={handleAdminLogout}  className="nav-link"><span className="menu-side"><img src={logouticon}  height={25} width={25}/></span> <span className='text-white'>Logout</span></Link>
					</li>
				</ul>):token?(
					<ul>
					{/* <li className="menu">
						<NavLink exact to="/" activeClassName="active" className="nav-link"><span className="menu-side"><img src={Dashboard} alt="" height={25} width={25}/></span> <span className='text-white'>Exchange Rate</span></NavLink>
					</li> */}
					<li className="menu">
						<NavLink to="/" activeClassName="active" className="nav-link"><span className="menu-side"><img src={Job} alt="" height={25} width={25}/></span> <span className='text-white'>Job</span></NavLink>
					</li>
					<li className="menu">
						<NavLink to="/parties" activeClassName="active" className="nav-link"><span className="menu-side"><img src={Parties} alt="" height={25} width={25}/></span> <span className='text-white'>Parties</span></NavLink>
					</li>
					
					<li className="menu">
						<NavLink to="/invoice" activeClassName="active" className="nav-link"><span className="menu-side"><img src={Invoice} alt="" height={25} width={25}/></span> <span className='text-white'>Invoice</span></NavLink>
					</li>
					{/* <li className="menu">
						<NavLink to="/Employee" activeClassName="active" className="nav-link"><span className="menu-side"><img src={Job} alt="" height={25} width={25}/></span> <span className='text-white'>Employee Operation</span></NavLink>
					</li> */}
					{/* <li className="menu">
						<NavLink to="/day-book" activeClassName="active" className="nav-link"><span className="menu-side"><img src={Book} alt="" height={25} width={25}/></span> <span className='text-white'>Day Book</span></NavLink>
					</li>
					<li className="menu">
						<NavLink to="/tally" activeClassName="active" className="nav-link"><span className="menu-side"><img src={Tally} alt="" height={25} width={25}/></span> <span className='text-white'>Tally</span></NavLink>
					</li> */}
					<li className="menu mb-5">
						<Link onClick={handlelogout}  className="nav-link"><span className="menu-side"><img src={logouticon}  height={25} width={25}/></span> <span className='text-white'>Logout</span></Link>
					</li>
				</ul>
				):""}
			</div>
		</div>
	</div>
    </>	
  )
}

export default Sidebar
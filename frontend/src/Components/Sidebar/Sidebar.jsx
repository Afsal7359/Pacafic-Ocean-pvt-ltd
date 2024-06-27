import React from 'react'
import Dashboard from '../../assets/img/icons/home.png'
import logouticon from '../../assets/img/icons/Logout.png'
import Parties from '../../assets/img/icons/parties.png'
import Job from '../../assets/img/icons/job.png'
import Tally from '../../assets/img/icons/tally.png'
import Invoice from '../../assets/img/icons/invoice.png'
import Book from '../../assets/img/icons/book.png'
import { NavLink } from 'react-router-dom';
import './sidebar.css'

const Sidebar = () => {
  return (
    <>
      <div className="sidebar" id="sidebar" style={{backgroundColor:"blueviolet"}}>
		<div className="sidebar-inner slimscroll">
			<div id="sidebar-menu" className="sidebar-menu">
				<ul>
					<li className="menu">
						<NavLink exact to="/" activeClassName="active" className="nav-link"><span className="menu-side"><img src={Dashboard} alt="" height={25} width={25}/></span> <span className='text-white'>Home</span></NavLink>
					</li>
					<li className="menu">
						<NavLink to="/parties" activeClassName="active" className="nav-link"><span className="menu-side"><img src={Parties} alt="" height={25} width={25}/></span> <span className='text-white'>Parties</span></NavLink>
					</li>
					<li className="menu">
						<NavLink to="/job" activeClassName="active" className="nav-link"><span className="menu-side"><img src={Job} alt="" height={25} width={25}/></span> <span className='text-white'>Job</span></NavLink>
					</li>
					<li className="menu">
						<NavLink to="/invoice" activeClassName="active" className="nav-link"><span className="menu-side"><img src={Invoice} alt="" height={25} width={25}/></span> <span className='text-white'>Invoice</span></NavLink>
					</li>
					<li className="menu">
						<NavLink to="/day-book" activeClassName="active" className="nav-link"><span className="menu-side"><img src={Book} alt="" height={25} width={25}/></span> <span className='text-white'>Day Book</span></NavLink>
					</li>
					<li className="menu">
						<NavLink to="/tally" activeClassName="active" className="nav-link"><span className="menu-side"><img src={Tally} alt="" height={25} width={25}/></span> <span className='text-white'>Tally</span></NavLink>
					</li>
					<li className="menu mb-5">
						<NavLink to="/logout" activeClassName="active" className="nav-link"><span className="menu-side"><img src={logouticon}  height={25} width={25}/></span> <span className='text-white'>Logout</span></NavLink>
					</li>
				</ul>
			</div>
		</div>
	</div>
    </>	
  )
}

export default Sidebar
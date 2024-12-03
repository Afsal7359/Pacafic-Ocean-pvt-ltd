import React from 'react'
import { Link } from 'react-router-dom';
import Logos from '../../assets/img/logo2.png'

const Logo = () => {
  return (
    <div>
         <div className="header-left">
                <Link to="/" className="logo">
                    <img src={Logos} width="35" height="35" alt=""/> 
                    <span style={{fontSize:17}}>Pacafic Ocean</span>
                </Link>
        </div>
    </div>
  )
}

export default Logo
// import React from 'react'
import "./Navbar.css";
import navlogo from "../../assets/nav-logo.svg";
import navprofile from "../../assets/nav-profile.svg";

export default function Navbar() {
    return (
        <div className='navbar'>
            <img src={navlogo} className="nav-logo" alt="navlogo" />
            <img src={navprofile} alt="navprofile" className="nav-profile" />
        </div>
    )
}

import React from 'react'
import home from "../../assets/image/home1.png"
import menu from "../../assets/image/menu1.png"
import "../footer/footer.css"
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
    <div className='footer'>
        <div className='home-icon'><Link to={"/"}><img src={home} alt="" /></Link></div>
        <div className='menu-icon'><Link to={"/menu"}><img src={menu} alt="" /></Link></div>
    </div>
    </>
  )
}

export default Footer
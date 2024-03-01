import React from 'react'
import logo from "../../assets/image/logo technopartner.png"
import "../header/header.css"

const Header = () => {
  return (
    <>
    <section className='header'>
        <div className='container-header'>
            <div className='header-logo'>
                <img src={logo} alt="logo" />
            </div>
        </div>
    </section>
    </>
  )
}

export default Header
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './page/loginPage/Login'
import { Routes,Route } from 'react-router-dom'
import Home from './page/homePage/Home'
import Menu from './page/menuPage/Menu'

function App() {
  

  return (
    <>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/menu' element={<Menu/>}/>
    </Routes>
    
    </>
  )
}

export default App

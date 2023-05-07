import React, { useState, useEffect } from 'react'
import { AiFillGithub } from 'react-icons/ai'
import { BsSun, BsFillMoonFill } from 'react-icons/bs'
import { DiGoogleAnalytics } from 'react-icons/di'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(true)
  const [theme, setTheme] = useState('light-theme')
  const [islogin, setIslogin] = useState(false)
  const handleDarkmode = () => {
    setDarkMode(!darkMode)
    if (darkMode) {
      setTheme('dark-theme')
    }
    else {
      setTheme('light-theme')
    }
  }
  useEffect(() => {
    document.body.className = theme
  }
    , [theme])

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/')
    }).catch((error) => {
      alert(error.message)
    })

  }

  const [menuOpen, setMenuOpen] = useState(false);


  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }
  return (
    <>
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/" className="font-semibold text-3xl tracking-tight hover:text-[#14b8a6]">
          {/* <img src="/home-logo.png" alt="Home Logo" className="h-8 w-auto" /> */}
          farmSense.ai
        </Link>
      </div>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white"
          onClick={toggleMenu}
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path
              d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
            />
          </svg>
        </button>
      </div>
      <div
        className={`${menuOpen ? '' : 'hidden'
          } w-full block ] lg:flex lg:items-center lg:w-auto`}
      >


        <div className="text-sm lg:flex-grow">
          <Link
            to="/home"
            className="block mt-4 lg:inline-block lg:mt-0  text-gray-200 hover:text-[#14b8a6] mr-4 text-lg"
          >
            Home
          </Link>
        </div>
        <div className="text-sm lg:flex-grow">
          <Link
            to="/dashboard"
            className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-[#14b8a6] mr-4 text-lg"
          >
            Dashboard
          </Link>
        </div>


        {/* Login Button */}
        <div>
          {auth.currentUser ? <button className='block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4  px-6 py-2  text-white bg-[#14b8a6]  rounded-lg hover:bg-[#0f766e]' onClick={handleLogout}>Logout</button> : <button className='block mt-4 lg:inline-block lg:mt-0 hover:text-white mr-4  px-6 py-2  text-white bg-[#14b8a6]  rounded-lg hover:bg-[#0f766e]' onClick={() => { navigate('/signup') }}>Register</button>}
        </div>
      </div>
    </nav>
    {auth.currentUser && (
      <div className='flex flex-wrap bg-gray-800 justify-center mt-px '>
    <div className="flex items-center justify-center flex-shrink-0 text-white w-1/2 mb-3 mt-3 ">
      <div className="text-sm lg:flex-grow">
          <Link
            to="/plant"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-[#14b8a6] hover:underline mr-4 text-lg"
          >
            Plant 
          </Link>
        </div>
      <div className="text-sm lg:flex-grow">
          <Link
            to="/chicken"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-[#14b8a6] hover:underline mr-4 text-lg"
          >
            Chicken 
          </Link>
        </div>
      <div className="text-sm lg:flex-grow">
          <Link
            to="/egg"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:underline hover:text-[#14b8a6] mr-4 text-lg"
          >
            Eggs 
          </Link>
        </div>
      <div className="text-sm lg:flex-grow">
          <Link
            to="/invasive"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:underline hover:text-[#14b8a6] mr-4 text-lg"
          >
            Invasive 
          </Link>
        </div>
      <div className="text-sm lg:flex-grow">
          <Link
            to="/feed"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-[#14b8a6] hover:underline mr-4 text-lg"
          >
            Crops 
          </Link>
        </div>
      </div>
      </div>
    )}
    </>

  )
}

export default Navbar

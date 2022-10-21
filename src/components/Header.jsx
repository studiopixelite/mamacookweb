import React, {useState, useEffect} from 'react'
import Logo from './img/MamaLogo.png'
import Avatar from'./img/avatar.png'
import { MdShoppingBasket } from "react-icons/md";
import{motion} from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import {Link} from "react-router-dom";
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {app} from "../firebase.config";
import { actionType } from '../context/reducer';

const Header = () => {
    const firebaseAuth = getAuth(app)
    const provider = new GoogleAuthProvider()

    const [{ user }, dispatch] = useStateValue()

    const login = async () => {
      const { 
        user : {refreshToken, providerData}
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type : actionType.SET_USER,
        user: providerData[0],
      })
    }
    
  return (
    <header className='fixed z-50 w-screen  p-6 px-16'>
        {/* desktop & tablet */}
        <div className='hidden md:flex w-full h-full items-center justify-between'>
        <Link to={'/'} className='flex items-center gap-2'>
            <img src={Logo} className='w-12 object-cover' alt='logo' />
            <p className='text-headingColor text-xl font-bold'> Mama Cook </p>
        </Link>

      <div className='flex items-center gap-8'>
      <ul className="flex items-center gap-8 " >
            <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Home</li>
            <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Menu</li>
            <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Services</li>
            <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>About Us</li>
        </ul>
        <div className= "relative flex items-center justify-center">
        <MdShoppingBasket className="text-textColor text-2x1 ml-8 cursor-pointer" />
        <div className="absolute -top-3 -right-2 w-4 h-4 rounded-full bg-cartNumBg flex items-center justify-center">
        <p className='text-xs text-white font-semibold'>2</p>
        </div>
        </div>
     <div className='relative'>
     <motion.img whileTap={{scale : 0.6}}
        src={user ? user.photoURL : Avatar} 
        className= 'w-10 min-2-[40px] h-10 min-h-[40px] drop-shadow-x1 cursor cursor-pointer rounded-full'
        alt="userprofile"
        onClick={login}/>
     </div>
      </div>
        </div>
  
        {/* mobile */}
        <div className='flex md:hidden w-full h-full '></div>
         </header>
  )
}

export default Header
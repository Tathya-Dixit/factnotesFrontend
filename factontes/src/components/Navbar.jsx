import React from 'react'
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/notelogo.png'
import { useLocation } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";

function Navbar() {
  const location = useLocation()
  return (
    <nav className="grid grid-cols-3 bg-gray-800 w-full z-50 text-gray-400 p-5 shadow-xl shadow-gray-950/30">
        <NavLink to={"/"} className="col-span-1 flex justify-start items-center">
            <img className='w-12 h-12' src={logo} alt="LOGO"/>
            <h1 className='font-titillium font-bold text-gray-200 text-2xl px-2'>FACTNOTES</h1>
        </NavLink>
        <div className=" col-span-1">
          <ul className='flex w-full h-full items-center justify-center'>
            <li className={'flex items-center'}><NavLink to={"/"} className={({isActive}) => isActive ? 'p-[0.75em] font-albert text-lg border-b-4 border-gray-700' : 'p-[0.75em] font-albert text-lg'} href="">Notes</NavLink></li>
            <li className={'flex items-center'}><NavLink to={"/archived"} className={({isActive}) => isActive ? 'p-[0.75em] font-albert text-lg border-b-4 border-gray-700' : 'p-[0.75em] font-albert text-lg'} href="">Archived</NavLink></li>
            {/* <li className={'flex items-center'}><NavLink to={"/about"} className={({isActive}) => isActive ? 'p-[0.75em] font-albert text-lg border-b-4 border-gray-700' : 'p-[0.75em] font-albert text-lg'} href="">About Us</NavLink></li>
            <li className={'flex items-center'}><NavLink to={"/contact"} className={({isActive}) => isActive ? 'p-[0.75em] font-albert text-lg border-b-4 border-gray-700' : 'p-[0.75em] font-albert text-lg'} href="">Contact Us</NavLink></li> */}
          </ul>
        </div>
        <div className=" col-span-1 flex content-center justify-end">
            <div className="text-white font-play font-semibold flex rounded-xl p-2 bg-gray-700 w-fit justify-end items-center text-lg hover:text-gray-200">
              <a href="" className='mx-3'><FaSearch /></a>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
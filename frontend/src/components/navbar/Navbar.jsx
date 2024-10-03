import React, { useEffect, useState } from "react";
import './navbar.css';
import { IoExitOutline } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";
 

function Navbar() {

  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    // {sticky?'fixed top-0 left-0 px-4 md:px-10  navbar w-full h-[70px] bg-black ':'fixed top-0 left-0 px-4 md:px-10  navbar w-full h-[70px] '}
    <>
      <div className={`fixed top-0 left-0 px-4 md:px-10  navbar w-full h-[70px] ${sticky?'navbar-bg delay-150 duration-200':''}`}>
        <div className="navbar-start">
          <a className=" text-xl font-bold cursor-pointer">Logo</a>
        </div>
      
        <div className="navbar-end">
        <div className=" hidden lg:flex mr-10">
          <ul className="flex flex-row px-1">
            <li className="text-lg font-semibold mr-4">
              <Link to={'/home'} className='home-link flex items-center gap-2 py-[6px] px-[10px]'> <IoHome className="text-lg" />Home</Link>
            </li>
            <li className="text-lg font-semibold ml-4">
            <Link to={'/employees/list'} className='home-link flex items-center gap-2 py-[6px] px-[10px]'><FaUserFriends className="text-2xl" />Employee</Link>
            
            </li>
          </ul>
        </div>
        <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow gap-4">
        <li>
          <a className="text-[17px]">
          <FaUserAlt />Profile
            
          </a>
        </li>
        <li className="lg:hidden "><a className=" text-[17px] "><IoHome />Home</a></li>
        <li className="  lg:hidden"><a className="text-[17px]"><FaUserFriends />Employee</a></li>
        <li><a className="text-[17px]">  <IoExitOutline />Logout</a></li>
      </ul>
    </div>
  {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default Navbar;

// import React from 'react'
// import './homeSlide.css'
import leftImage from '../../assets/businessImage.avif';
import { IoMdPersonAdd } from "react-icons/io";
import { Link } from 'react-router-dom';
function HomeSlide() {
    return (
        <>
        <div className='w-full h-screen flex pt-[70px] flex-wrap  '>
        <div className='  md:flex-[0.6] px-4 pt-10' >
            <h1 className='text-2xl font-semibold'>Company Name</h1>
            <p className='my-2 text-[17px] p-4'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam facere vel tempore, praesentium corrupti autem possimus. Reiciendis sit ipsam cupiditate!  facere vel tempore, praesentium corrupti autem possimus. Reiciendis sit ipsam cupiditate!</p>
            <Link to={'/createEmployee'} className='ml-4 mt-5 border  px-2 py-2 flex flex-row items-center gap-4 font-semibold rounded-md overflow-x-hidden bg-orange-400 hover:bg-green-400 duration-200 w-[180px] delay-100 hover:scale-95 '>New Employee <IoMdPersonAdd className='text-[20px]  ' /></Link>
        </div>
        <div className='w-full  md:flex-1 flex items-center mt-10 md:mt-0' >
            <img src={leftImage} alt="" style={{mixBlendMode:'darken'}}/>
        </div>
        </div>
        </>
    )
}

export default HomeSlide

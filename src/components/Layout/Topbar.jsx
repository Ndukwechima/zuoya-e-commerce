import React from 'react'
import { TbBrandMeta } from 'react-icons/tb'
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";


const Topbar = () => {
  return (
    <div className="bg-black text-white">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <div className='hidden md:flex items-center space-x-4'>
          <a href="#" className="hover:text-gray-300">
            <TbBrandMeta className="w-5 h-5" />
          </a>

          <a href="#" className="hover:text-gray-300">
            <IoLogoInstagram className="w-5 h-5" />
          </a>

          <a href="#" className="hover:text-gray-300">
            <RiTwitterXLine className="w-4 h-4" />
          </a>
        </div>
        <div className='text-sm text-center flex-grow'>
            <span>We ship worldwide - Fast and reliable shipping</span>
        </div>
        <div className='text-sm hidden md:block'>
            <a href="tel:+2348106706460" className='hover:text-gray-300'>
                +234 -810-670-6460
            </a>
        </div>
      </div>
    </div>
  );
}

export default Topbar
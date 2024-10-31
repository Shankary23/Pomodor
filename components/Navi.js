import React from 'react'
import { CgAirplane } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";

function Navi({setOpenSetting}) {
  return(
  <nav className='pt-5 text-white flex justify-between w-11/12 mx-auto'>
    <div className="flex item-center gap-1 cursor-pointer">
        <CgAirplane className='text-lg '/>
        <h1 className=" text-white">No Distractions</h1>
    </div>
    <FiSettings className='text-2xl cursor-pointer' onClick={()=>setOpenSetting(value => !value)}/>
  </nav>
  );
}

export default React.memo(Navi);
// import  from 'react'
import { CiSearch } from "react-icons/ci";
import { ChevronDown, Heart, Minus } from "lucide-react";
import { IoPlay } from "react-icons/io5";
import { IoPlaySkipForward, IoPlaySkipBack } from "react-icons/io5";
import { RxLoop } from "react-icons/rx";
import { MdFormatListBulleted } from "react-icons/md";
import { HiPause } from "react-icons/hi2";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const musicList = () => (
  <div className=" border-t mt-1 rounded-lg p-1 flex gap-2">
    <div className="left">
      <img
        className="w-[38px]  h-[38px] rounded-md object-cover"
        src="https://i.postimg.cc/FR7mD4Lf/Adobe-Stock-194945297-Preview.jpg"
        alt=""
      />
    </div>
    <div className="right">
      <h3 className="max-w-[80%] font-medium text-[14px] h-[20px] overflow-hidden">
        {" "}
        Lorem ipsum sjhdb dhd dhc dd d dd dd
      </h3>
      <p className=" text-[12px]">Singer: Arijit Singh</p>
    </div>
  </div>
);

const App = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);

  const handleOpenLists = () => {
    setIsModelOpen(!isModelOpen);
  };

  return (
    <div
      className={`bg-white  w-[100vw h-[100vh] overflow-hidden sm:flex sm:items-center sm:justify-center p-[1.1rem] relative ${
        isModelOpen ? "open-model" : "closed-model"
      }`}
    >
      <div className="hidden  sm:flex sm:p-3 rounded-lg h-[100px]  items-center justify-center border border-gray-50 shadow-md gap-2 w-[270px] sm:bg-white">
        <RxCross2 className="text-red-500" /> Only mobile-compatible.
      </div>
      <div className="w-[100%] mt-3 h-[98%] flex items-center justify-evenly pb-6 flex-col sm:hidden ">
        <div className="search flex items-center justify-center border border-gray-100 p-[.5rem] px-[1rem] w-full rounded-[20px] shadow-md">
          <input
            type="text"
            placeholder="Search latest music..."
            className=" focus:outline-none bg-transparent  w-full"
          />
          <CiSearch size={20} className="w-[10%]" />
        </div>

        <div className="mt-8 w-[100%] h-[320px]  rounded-xl overflow-hidden">
          <img
            className="w-[100%] h-full object-cover"
            src="https://i.postimg.cc/FR7mD4Lf/Adobe-Stock-194945297-Preview.jpg"
            alt=""
          />
        </div>

        <div className="titlebox w-[98%] mt-8 flex items-start flex-col justify-center">
          <div className=" flex items-center w-[98%] justify-between">
            <p className=" max-w-[80%] font-medium h-[26px] overflow-hidden">
              {" "}
              Lorem ipsum sjhdb dhd dhc dd d dd dd{" "}
            </p>
            <Heart size={20} />
          </div>
          <p className=" text-[12px]">Singer: Arijit Singh</p>
        </div>

        <div className="mt-8 w-[98%] flex items-start flex-col justify-center">
          <input className="rounded-lg  h-1 w-[98%]" type="range" />
          <div className=" flex w-[100%] mt-1 items-center justify-between">
            <p className="starttime text-[13px]">0:0</p>
            <p className="endtime text-[13px]">6:10</p>
          </div>
        </div>

        <div className="w-[98%] flex items-center justify-between mt-8">
          <RxLoop className=" active:scale-90" />
          <IoPlaySkipBack className=" active:scale-90" />
          <IoPlay className="active:scale-90 shadow-lg w-[50px] h-[50px] p-2 rounded-full " />
          <IoPlaySkipForward className=" active:scale-90" />
          <MdFormatListBulleted
            onClick={handleOpenLists}
            className=" active:scale-90"
          />
        </div>
      </div>
      {/* Model Content */}
      <div
        className={`model-content absolute bottom-0 bg-[#f5f6fa] w-[100%] left-0 rounded-lg px-4 overflow-y-auto transition-transform duration-300 transform ${
          isModelOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ height: "400px" }}
      >
        <div className="  mt-2 w-full flex items-center justify-center">
          <ChevronDown
            onClick={handleOpenLists}
            className="animate-bounce text-center"
          />
        </div>

        {/* Your model content goes here */}
        {musicList()}
        {musicList()}
        {musicList()}
        {musicList()}
        {musicList()}
        {musicList()}
        {musicList()}
        {musicList()}
        {musicList()}
        {musicList()}
        {musicList()}
        {musicList()}
        {musicList()}
        {musicList()}
        {musicList()}
      </div>
    </div>
  );
};

export default App;

import React from "react";
import { Search } from "lucide-react";
const Page = () => {
  return (
    <div className="w-screen h-fit ">
      <div className="flex flex-row justify-between px-12 py-7">
        <div>
          <p>chinggis</p>
        </div>
        <div className="flex ">
          <input
            className=" w-[360px] h-[50px] rounded-xl border "
            type="text"
            placeholder="Search"
          />
        </div>
        <div>
          <Search />
        </div>
      </div>

      <div className="flex justify-center items-center h-full">
        <div className="flex w-[1803px] h-[1243px] border-t-[3px] border-b-[3px]  ">
          <p className="text-[70px] py-120">Wedding Planner</p>
        </div>
      </div>
      <div>
        <button></button>
        <button></button>
        <button></button>
      </div>
    </div>
  );
};

export default Page;

"use client";

import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { initalize, isExpertMode, setMode } from "@/script/main";
import Image from "next/image";
import ProblemContainer from "@/component/problemcontainer";
import ConstraintButton from "@/component/constraintbutton";
import {withinRadiusCon, witheredCon, obstructedCon, beeHiveCon, fallenTreeCon} from "@/script/searchconstraint";

export default function Home() {

  initalize();

  const [expertMode, setExpertMode] = useState(isExpertMode());
  
  // Mode selector
  let volunteerButtonProp;
  let expertButtonProp;
  if (expertMode){
    volunteerButtonProp = "hover:opacity-100 opacity-60";
    expertButtonProp = "opacity-100";
  }
  else {
    volunteerButtonProp = "opacity-100";
    expertButtonProp = "hover:opacity-100 opacity-60";
  }
  function handleModeChange(isExpert: boolean){
    setExpertMode(isExpert);
    setMode(isExpert);
  }


  // search Problem
  const [searchQuery, setSearchQuery] = useState("");
  const [searchConstraint, setSearchConstraint] = useState<any[]>([]);
  const [withinRadius, setWithinRadius] = useState(false);
  const [fallenTree, setFallenTree] = useState(false);
  const [beeHive, setBeeHive] = useState(false);
  const [withered, setWithered] = useState(false);
  const [obstructed, setObstructed] = useState(false);

  function addConstraint(name: string, constraint: any){
    const temp = {"name": name, "function": constraint}
    setSearchConstraint([...searchConstraint, temp]);
  }


  function removeConstraint(name: string){
    setSearchConstraint(searchConstraint.filter(c => (c["name"] != name)));
  }


  return (
    <>

  <main className="font-anuphan flex flex-col items-center w-full min-h-screen bg-gradient-to-b from-teal-500 to-emerald-300 pt-10 pb-24">
    <h1 className="text-3xl font-semibold text-white mb-5">พืชญา</h1>
    <div className="flex flex-row w-80 gap-2 mb-10">
      <button onClick={() => handleModeChange(false)} className={"flex flex-row items-center justify-center gap-3 w-1/2 h-12 bg-white rounded-lg text-black " + volunteerButtonProp}>
        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        <p className="text-sm">โหมดอาสาสมัคร</p>
      </button>
      <button onClick={() => handleModeChange(true)} className={"flex flex-row items-center justify-center gap-3 w-1/2 h-12 bg-white hover:opacity-100 opacity-60 rounded-lg text-black " + expertButtonProp}>
      <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        <p className="text-sm">โหมดมืออาชีพ</p>
      </button>
      
    </div>
    <div className="flex flex-row w-80 mb-3 items-center justify-center">
      <p className=" text-white text-lg font-medium w-80 mb-1">เลือกปัญหา</p>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <MagnifyingGlassIcon className="w-4 h-4 text-black"/>
        </div>
        <input value={searchQuery} onChange={event => setSearchQuery(event.target.value)} className="rounded-full shadow-md py-4 px-3 ps-10 w-36 h-4 text-xs text-black" type="text" placeholder="ค้นหาปัญหา"/>
      </div>

    </div>
    <div className="mb-2 flex flex-row w-80 gap-2 items-start justify-start">
      <div className="flex w-60 flex-wrap gap-2">
        <ConstraintButton add={addConstraint} rem={removeConstraint} constraint={withinRadiusCon} setState={setWithinRadius} selected={withinRadius} text="รัศมี 2 กิโลเมตร"/>
        <ConstraintButton add={addConstraint} rem={removeConstraint} constraint={fallenTreeCon} setState={setFallenTree} selected={fallenTree} text="ต้นไม้โค่น"/>
        <ConstraintButton add={addConstraint} rem={removeConstraint} constraint={beeHiveCon} setState={setBeeHive} selected={beeHive} text="รังสัตว์"/>
        <ConstraintButton add={addConstraint} rem={removeConstraint} constraint={witheredCon} setState={setWithered} selected={withered} text="เหี่ยวเฉา"/>
        <ConstraintButton add={addConstraint} rem={removeConstraint} constraint={obstructedCon} setState={setObstructed} selected={obstructed} text="กีดขวาง"/>
      </div>
      
    </div>
    <ProblemContainer searchQuery={searchQuery} searchConstraint={searchConstraint}/>
    <p className=" mt-5 text-white text-lg font-medium w-80">รายละเอียด</p>
    <div className="flex flex-col w-80 h-fit gap-3 bg-white rounded-lg bg-opacity-60 items-center justify-start p-3">
      <div className="flex flex-row gap-3"><div className="w-32 h-20 bg-gray-700 rounded-lg"></div>
      <p className="w-40 text-wrap text-xs text-black">คำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบายคำอธิบาย</p></div>
      <div className="mt-5 flex flex-row items-center justify-center w-full gap-2">
        <div className="flex flex-row items-center justify-center w-fit h-fit px-3 py-1 bg-white rounded-full shadow-md text-black">
          <p className="font-light text-sm">เริ่มแก้ไข</p>
        </div>
        <div className="flex flex-row items-center justify-center w-fit h-fit px-3 py-1 bg-white rounded-full shadow-md text-black">
          <p className="font-light text-sm">แก้ไขเรียบร้อย</p>
        </div>
      </div>
    
    </div>

    <p className=" mt-5 text-white text-lg font-medium w-80">เครื่องมือ</p>
    <div className="mb-2 flex flex-row flex-wrap w-80 gap-2">
      <div className="w-fit h-fit bg-white text-black px-3 rounded-full font-light shadow-md text-xs py-1 hover:bg-gray-700 hover:text-white">ค้นหาชนิดพืช</div>
      <div className="w-fit h-fit bg-white text-black px-3 rounded-full font-light shadow-md text-xs py-1 hover:bg-gray-700 hover:text-white">อ่านค่าเซนเซอร์</div>
      <div className="w-fit h-fit bg-white text-black px-3 rounded-full font-light shadow-md text-xs py-1 hover:bg-gray-700 hover:text-white">สอบถาม</div>
    </div>
    <div className="w-80 h-32 bg-white rounded-lg opacity-60 mb-5"></div>

  </main>
    
   
    
    </>
  );
}

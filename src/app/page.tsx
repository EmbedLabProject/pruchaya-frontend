"use client";

import { useEffect, useState } from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { getUserLat, initalize, isExpertMode, setMode } from "@/script/main";
import Image from "next/image";
import ProblemContainer from "@/component/problemcontainer";
import ConstraintButton from "@/component/constraintbutton";
import {withinRadiusCon, witheredCon, obstructedCon, fallenTreeCon, wiringCon, cuttingCon, drainageCon} from "@/script/searchconstraint";
import ProblemDetailBox from "@/component/problemdetailbox";
import IdentifyPlant from "@/component/tools/identifyplant";
import ReadSensor from "@/component/tools/readsensor";
import ChatBot from "@/component/tools/chatbot";

export default function Home() {

  

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
  const [wiring, setWiring] = useState(false);
  const [drainage, setDrainage] = useState(false);
  const [cutting, setCutting] = useState(false);
  const [withered, setWithered] = useState(false);
  const [obstructed, setObstructed] = useState(false);

  function addConstraint(name: string, constraint: any){  
    const temp = {"name": name, "function": constraint}
    setSearchConstraint([...searchConstraint, temp]);
  }


  function removeConstraint(name: string){
    setSearchConstraint(searchConstraint.filter(c => (c["name"] != name)));
  }


  const [selectedProb, setSelectedProb] = useState("");



  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function main(){
      console.log(getUserLat());
      await initalize();
      console.log(getUserLat());
      setLoading(false);
    }
      main();
  },[loading]);


  const [selectedTool, setSelectedTool] = useState("readsensor");

  let toolElement = <></>;
  if (selectedTool == "identifyplant"){
    toolElement = <IdentifyPlant/>;
  }
  else if (selectedTool == "readsensor"){
    toolElement = <ReadSensor/>;
  }
  else if (selectedTool == "chatbot"){
    toolElement = <ChatBot/>;
  }
  else {
    toolElement = <></>;
  }

  return (
    <>

  <main className="font-anuphan flex flex-col items-center w-full min-h-screen bg-gradient-to-b from-teal-500 to-emerald-300 pt-10 pb-24">
    <h1 className="text-3xl font-semibold text-white mb-5">พืชญา</h1>
    
    <div className="flex flex-row w-80 mt-5 mb-3 items-center justify-center">
      <p className=" text-white text-lg font-medium w-80 mb-1">เลือกปัญหา</p>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <MagnifyingGlassIcon className="w-4 h-4 text-black"/>
        </div>
        <input value={searchQuery} onChange={event => setSearchQuery(event.target.value)} className="rounded-full shadow-md py-4 px-3 ps-10 w-36 h-4 text-xs text-black" type="text" placeholder="ค้นหาปัญหา"/>
      </div>

    </div>
    <div className="mb-2 flex flex-row w-80 gap-2 items-start justify-start">
      <div className="flex w-68 flex-wrap gap-2">
        <ConstraintButton add={addConstraint} rem={removeConstraint} constraint={withinRadiusCon} setState={setWithinRadius} selected={withinRadius} text="รัศมี 5 กิโลเมตร"/>
        <ConstraintButton add={addConstraint} rem={removeConstraint} constraint={fallenTreeCon} setState={setFallenTree} selected={fallenTree} text="โค่นล้ม"/>
        <ConstraintButton add={addConstraint} rem={removeConstraint} constraint={wiringCon} setState={setWiring} selected={wiring} text="สายไฟ"/>
        <ConstraintButton add={addConstraint} rem={removeConstraint} constraint={witheredCon} setState={setWithered} selected={withered} text="เหี่ยวเฉา"/>
        <ConstraintButton add={addConstraint} rem={removeConstraint} constraint={obstructedCon} setState={setObstructed} selected={obstructed} text="กีดขวาง"/>
        <ConstraintButton add={addConstraint} rem={removeConstraint} constraint={cuttingCon} setState={setCutting} selected={cutting} text="ตัด & แต่ง"/>
        <ConstraintButton add={addConstraint} rem={removeConstraint} constraint={drainageCon} setState={setDrainage} selected={drainage} text="ท่อน้ำ"/>
      </div>
    </div>
    <ProblemContainer setSelected={setSelectedProb} searchQuery={searchQuery} searchConstraint={searchConstraint}/>
    <div className="mt-2 flex flex-row w-80 justify-end">
    <p className="text-xs font-light text-white">ขอขอบคุณข้อมูลจาก <span className=""><a href="https://traffy.in.th" target="_blank" rel="noopener noreferrer" className="underline font-medium">Traffy Fondue</a></span></p>
    </div>


    <p className=" mt-5 text-white text-lg font-medium w-80">รายละเอียด</p>
    <ProblemDetailBox problem={selectedProb}/>

    <p className=" mt-5 text-white text-lg font-medium w-80">เครื่องมือ</p>
    <div className="mb-2 flex flex-row flex-wrap w-80 gap-2">
      {/* <button onClick={() => setSelectedTool("identifyplant")} className="w-fit h-fit bg-white text-black px-3 rounded-full font-light shadow-md text-xs py-1 hover:bg-gray-700 hover:text-white">ค้นหาชนิดพืช</button> */}
      <button onClick={() => setSelectedTool("readsensor")} className="w-fit h-fit bg-white text-black px-3 rounded-full font-light shadow-md text-xs py-1 hover:bg-gray-700 hover:text-white">อ่านค่าเซนเซอร์</button>
      <button onClick={() => setSelectedTool("chatbot")} className="w-fit h-fit bg-white text-black px-3 rounded-full font-light shadow-md text-xs py-1 hover:bg-gray-700 hover:text-white">AI ผู้ช่วย</button>
    </div>
    {toolElement}

  </main>
    
   
    
    </>
  );
}

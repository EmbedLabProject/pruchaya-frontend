import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { ArrowPathIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { BeakerIcon } from "@heroicons/react/16/solid";
import { SunIcon } from "@heroicons/react/16/solid";
import { InformationCircleIcon } from "@heroicons/react/16/solid";
import { ShieldExclamationIcon } from "@heroicons/react/16/solid";
import WaterMeter from './WaterMeter';
function ReadSensor(props: any){

    const [searchQuery, setSearchQuery] = useState("")
    const [loading, setLoading] = useState(false)
    const [date,setDate] = useState("")
    const [time,setTime] = useState("")
    const [humidity,setHumidity] = useState(-1)
    const [light,setLight] = useState(-1)
    const [vibration,setVibration] = useState(-1)
    const [pH,setpH] = useState(-1)

    function submitID(){
        setLoading(true)
        setDate("1/1/2567")
        setTime("")
        setHumidity(10)
        setLight(20)
        setVibration(19)
        setpH(8)
    }

    function reloadID(){
        setLoading(false)
        setDate("")
        setTime("")
        setHumidity(-1)
        setLight(-1)
        setVibration(-1)
        setpH(-1)
    }

    const notFoundUI = <div className="flex w-full items-center justify-center"><p className="text-xs font-light text-black">พืชนี้ไม่มีในระบบ</p></div>;
    const skeletonUI = <><p className="flex flex-row w-full h-16 bg-white rounded-lg items-center justify-center p-2 gap-3 animate-pulse">
        <p className="text-xs text-gray-400">กำลังโหลด...</p>
        </p></>;
    const waterUI = 
        <div className="flex flex-row w-full h-16 items-center justify-start p-2">                
            <div className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full bg-blue-800 grid place-content-center">
                    <BeakerIcon className="w-4 h-4 text-white" />
                </div>
                <div className="relative w-52 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-800" style={{ width: `${humidity}%` }}></div>
                    <div className="absolute top-0 bottom-0 w-1 bg-green-500" style={{ left: `${75}%` }}></div>
                </div>
                {/* <span className="text-blue-800 text-xl">{humidity}%</span> */}
                <div className="flex flex-col items-start">
                    <button className="">
                        <InformationCircleIcon className="w-4 h-4 text-blue-800"/>
                    </button>
                </div>
            </div>
        </div>
    const infoUI = <section className="bg-white items-center justify-center mx-5 my-5 gap-5">
        <h1 className="text-sm font-bold text-left text-black">
            
            {(!loading && (date =="" || time == "")) ? notFoundUI : <div> วันที่วัดค่า: {date} {time} </div>}
            {(loading) ? skeletonUI : null}
        </h1>
        <article>
            <h2 className="text-sm font-bold text-left text-black">
                สถานะต้นไม้: 
                {(!loading && (humidity==-1 || light==-1 || vibration==-1 || pH==-1)) ? notFoundUI : waterUI}
                {(loading) ? skeletonUI : null}
            </h2>
            waterUI
        </article>
        
    </section>

    

    // FILL CODE INSIDE THE RETURN STATEMENT
    return (<>
        <div className="w-80 h-35 flex flex-col bg-white rounded-lg opacity-60 mb-5 shadow-md mt-10">
            {/* <p className="text-xs text-black">Hi, I'm Sensor Reader!</p> */}
            <div className="flex flex-row w-80 mb-3 items-center justify-center gap-5">
                <p className=" text-black text-xs w-35 mb-1">รหัสของอุปกรณ์</p>
                <input value={searchQuery} onChange={event => setSearchQuery(event.target.value)} className="rounded-full shadow-md py-4 px-3 ps-10 w-45 h-4 text-xs text-black" type="text" placeholder="device ID"/>
            </div>
            {(loading) ? infoUI : null}
            <div className="w-80 mb-3 flex justify-end gap-3">
                <button onClick={() => submitID()} className={"bg-white text-black grid items-center justify-center rounded-lg shadow-md w-12 h-6 "}>
                    <MagnifyingGlassIcon className="w-6 h-6 "/>
                </button>
                <button onClick={() => reloadID()} className={"bg-white text-black grid items-center justify-center rounded-lg shadow-md w-12 h-6 mx-3"}>
                    <ArrowPathIcon className="w-6 h-6"/>
                </button>
            </div>
            

            
        </div>
        

    


        
    </>);



};

export default ReadSensor;



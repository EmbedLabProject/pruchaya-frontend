import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { ArrowPathIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { BeakerIcon } from "@heroicons/react/16/solid";
import { SunIcon } from "@heroicons/react/16/solid";
import { InformationCircleIcon } from "@heroicons/react/16/solid";
import { ShieldExclamationIcon } from "@heroicons/react/16/solid";
import { getSensorData } from "@/script/api";
function ReadSensor(props: any){

    const [searchID, setSearchID] = useState(0)
    const [awating, setAwaiting] = useState(true)
    const [loading, setLoading] = useState(false)
    const [showing, setshowing] = useState(false)
    const [currentDevice, setCurrentDevice] = useState<any>({});
    const [date,setDate] = useState("")
    const [time,setTime] = useState("")
    const [humidity,setHumidity] = useState(-1)
    const [light,setLight] = useState(-1)
    const [vibration,setVibration] = useState(-1)
    const [recHumidity,setRecHumidity] = useState(75)
    const [recLight,setRecLight] = useState(70)
    const [recVibration,setRecVibration] = useState(60)

    function submitID(){
        setAwaiting(false)
        setLoading(true)
        setshowing(false)
        console.log("want to know ID: " + searchID)
        setCurrentDevice(getSensorData(searchID))
        setDate("1/1/2567")
        setTime("09:47")
        setHumidity(10)
        setLight(20)
        setVibration(19)
    }

    function reloadID(){
        setAwaiting(true)
        setLoading(false)
        setshowing(false)
        setDate("")
        setTime("")
        setHumidity(-1)
        setLight(-1)
        setVibration(-1)
        console.log("rerererere")
    }

    function getColorPH( ph:number){
        if (ph < 7) {
            // Acidic range: red to yellow
            const red = 255;
            const green = Math.round((ph / 7) * 255);
            return `rgb(${red},${green},0)`;
        } else if (ph === 7) {
            // Neutral: green
            return 'rgb(0,255,0)';
        } else {
            // Basic range: blue to purple
            const blue = 255;
            const red = Math.round(((ph - 7) / 7) * 255);
            return `rgb(${red},0,${blue})`;
        }
    };

    const notFoundUI = <div className="flex w-full items-center justify-center"><p className="text-xs font-light text-black">กระถางนี้ไม่มีในระบบ</p></div>;
    const skeletonUI = <><p className="flex flex-row w-full h-16 bg-white rounded-lg items-center justify-center p-2 gap-3 animate-pulse">
        <p className="text-xs text-gray-400">กำลังโหลด...</p>
        </p></>;
    const waterUI = 
        <div className="flex flex-row w-full h-16 items-center justify-start p-2">                
            <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-blue-800 grid place-content-center">
                    <BeakerIcon className="w-4 h-4 text-white" />

                    {/* <ShieldExclamationIcon className="w-4 h-4 text-white"/> */}
                    {/* <div className="text-xs text-white">pH</div> */}
                </div>
                <div className="relative w-52 h-5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-800" style={{ width: `${humidity}%` }}></div>
                    <div className="absolute top-0 bottom-0 w-1 bg-green-500" style={{ left: `${recHumidity}%` }}></div>
                </div>
                {/* <span className="text-blue-800 text-xl">{humidity}%</span> */}
                <div className="flex flex-col items-start">
                    <button className="">
                        <InformationCircleIcon className="w-4 h-4 text-blue-800"/>
                    </button>
                </div>
            </div>
        </div>
    
    const lightUI =
        <div className="flex flex-row w-full h-16 items-center justify-start p-2">                
            <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-yellow-400 grid place-content-center">
                    <SunIcon className="w-4 h-4 text-white"/>
                </div>
                <div className="relative w-52 h-5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                    className="h-full transition-all duration-300 ease-in-out"
                    style={{ width: `${(light / 100) * 100}%`, backgroundColor: getColorPH(light) }}
                    ></div>
                    <div
                    className="absolute top-0 bottom-0 w-1 bg-red-500"
                    style={{ left: `${(recLight / 100) * 100}%` }}
                    ></div>
                </div>
                <div className="flex flex-col items-start">
                    <button className="">
                        <InformationCircleIcon className="w-4 h-4 text-blue-800"/>
                    </button>
                </div>
            </div>
        </div>

const vibrationUI =
        <div className="flex flex-row w-full h-16 items-center justify-start p-2">                
            <div className="flex items-center space-x-3">
                <div className="w-6 h-6 rounded-full bg-yellow-900 grid place-content-center">
                    <ShieldExclamationIcon className="w-4 h-4 text-white"/>
                </div>
                <div className="relative w-52 h-5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                    className="h-full transition-all duration-300 ease-in-out"
                    style={{ width: `${(vibration / 100) * 100}%`, backgroundColor: getColorPH(vibration) }}
                    ></div>
                    <div
                    className="absolute top-0 bottom-0 w-1 bg-red-500"
                    style={{ left: `${(recVibration / 100) * 100}%` }}
                    ></div>
                </div>
                <div className="flex flex-col items-start">
                    <button className="">
                        <InformationCircleIcon className="w-4 h-4 text-blue-800"/>
                    </button>
                </div>
            </div>
        </div>


        
        
    const infoUI = <section className="items-center justify-center mx-5 my-5 gap-5">
        <h1 className="text-sm font-light text-left text-black">
            วันที่วัดค่า: {date} {time}
            {(!loading && (date =="" || time == "")) ? notFoundUI : null}
            {(loading) ? skeletonUI : null}
        </h1>
        <article>
            <h2 className="text-sm font-light text-left text-black">
                สถานะต้นไม้: 
                {(!loading && (humidity==-1 || light==-1 || vibration==-1)) ? (notFoundUI) : [waterUI, lightUI,vibrationUI]}
                {(loading) ? skeletonUI : null}
            </h2>
            
            
        
        </article>
        
    </section>

    

    // FILL CODE INSIDE THE RETURN STATEMENT
    return (<>
        <div className="w-80 h-fit flex flex-col bg-white rounded-lg bg-opacity-60 mb-5 shadow-md mt-10">
            {/* <p className="text-xs text-black mx-1 my-1">Hi, I'm Sensor Reader!</p> */}
            <div className="flex flex-row w-80 mb-3 items-center justify-center gap-5 my-3">
                <p className=" text-black text-xs w-35 mb-1">รหัสของอุปกรณ์</p>
                <input value={searchID} onChange={event => setSearchID(searchID)} className="rounded-full shadow-md py-4 px-3 ps-10 w-45 h-4 text-xs text-black" type="text" placeholder="device ID"/>
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



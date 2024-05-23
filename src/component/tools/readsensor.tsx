import { MagnifyingGlassIcon, RssIcon } from "@heroicons/react/16/solid";
import { ArrowPathIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { BeakerIcon } from "@heroicons/react/16/solid";
import { SunIcon } from "@heroicons/react/16/solid";
import { InformationCircleIcon } from "@heroicons/react/16/solid";
import { ShieldExclamationIcon } from "@heroicons/react/16/solid";
import { IoIosWater } from "react-icons/io";
import SensorBlock from "../sensorblock";
import { getMeanSensorData, getSensorId, getUserSensorData, loadSensorData, setUserSensorData } from "@/script/main";
function ReadSensor(props: any){

    const [searchID, setSearchID] = useState(getSensorId())
    const [awating, setAwaiting] = useState(true)
    const [loading, setLoading] = useState(false)
    const [showing, setshowing] = useState(false)
    const [date,setDate] = useState("")
    const [time,setTime] = useState("")
    const [humidity,setHumidity] = useState(-1)
    const [light,setLight] = useState(-1)
    const [vibration,setVibration] = useState(-1)
    const [recHumidity,setRecHumidity] = useState(75)
    const [recLight,setRecLight] = useState(70)
    const [recVibration,setRecVibration] = useState(60)
    const [sensorData, setSensorData] = useState<any[]>(getUserSensorData())

    console.log("Here")
    console.log(getMeanSensorData());


    function toDateString(unix: number){
        var a = new Date(unix * 1000);
        var months = ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
        var year = a.getFullYear() + 543;
        var month = months[a.getMonth()];
        var date = String(a.getDate()).padStart(2, '0');;
        var hour = String(a.getHours()).padStart(2, '0');;
        var min = String(a.getMinutes()).padStart(2, '0');;
        var sec = String(a.getSeconds()).padStart(2, '0');;
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
      }

    function submitID(){
        setAwaiting(false)
        setLoading(true)
        setshowing(false)
        console.log("want to know ID: " + searchID)
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


    async function getDataHandler(){
        setLoading(true);
        const data = await loadSensorData(searchID);
        console.log(data);
        setLoading(false);
        const newSensorData = []
        for (let i=1 ; i<=20; i++){
            if (i > data.length){
                break;
            }
            newSensorData.push(data[data.length - i]);
            newSensorData[i-1].id = i;
            newSensorData[i-1].selected = false;

        }
        setUserSensorData(newSensorData);
        setSensorData(newSensorData);
    }

    function resetDataHandler(){
        setUserSensorData([]);
        setSensorData([]);
        setSearchID("");
    }

    function toggleSelectHandler(id: number){
        const newSensorData = sensorData;
        const selected = newSensorData.find(i => i.id == id).selected;
        if (selected){
            newSensorData.find(i => i.id == id).selected = false;
        }
        else {
            newSensorData.find(i => i.id == id).selected = true;
        }
        setUserSensorData(newSensorData);
        setSensorData([...newSensorData]);
    }
    



    const skeletonUI = <><div className="flex flex-row w-72 h-16 bg-white rounded-lg items-center justify-center p-2 gap-3 animate-pulse">
    <p className="text-xs text-gray-400">กำลังโหลด...</p>
    </div><div className="flex flex-row w-72 h-16 bg-white rounded-lg items-center justify-center p-2 gap-3 animate-pulse">
        <p className="text-xs text-gray-400">กำลังโหลด...</p>
    </div></>;

    const sensorDataList = sensorData.map(i =>
        <SensorBlock key={i.id} humidPer={i.humidity} vibraPer={i.vibration} lightPer={i.light} date={toDateString(i.time)} selected={i.selected} onClick={() => toggleSelectHandler(i.id)}/>
    );

    const meanSensorData = getMeanSensorData();

    const meanSensorComp = <div className="flex flex-row gap-1">
    <div className="flex flex-row gap-1 items-center justify-center">
        <SunIcon className="w-5"/>
        <p className="text-sm font-semibold text-black">{meanSensorData?.light}%</p>
    </div>
    <div className="flex flex-row gap-1 items-center justify-center">
        <IoIosWater   />
        <p className="text-sm font-semibold text-black">{meanSensorData?.humidity}%</p>
    </div>
    <div className="flex flex-row gap-1 items-center justify-center">
        <RssIcon className="w-4"/>
        <p className="text-sm font-semibold text-black">{meanSensorData?.vibration}%</p>
    </div>
    </div>;

    const noDataComp = <p className="text-sm font-medium">ยังไม่เลือกข้อมูล</p>;

    // FILL CODE INSIDE THE RETURN STATEMENT
    return (<>
        <div className="w-80 h-fit flex flex-col bg-white rounded-lg bg-opacity-60 mb-5 shadow-md">
            {/* <p className="text-xs text-black mx-1 my-1">Hi, I'm Sensor Reader!</p> */}
            <div className="flex flex-row w-80 mb-3 items-center justify-center gap-5 my-3">
                <p className=" text-black text-xs w-35 mb-1">รหัสของอุปกรณ์</p>
                <input value={searchID} onChange={event => setSearchID(event.target.value)} className="rounded-full shadow-md py-4 px-3 ps-10 w-45 h-4 text-xs text-black" type="text" placeholder="กรอก Device ID"/>
            </div>
            {/* {(loading) ? infoUI : null} */}
            <div className="flex flex-col gap-1 items-center max-h-36 overflow-y-scroll mb-2">
                {sensorDataList}
                {loading ? skeletonUI : null}
                

                


                




            </div>
            <div className="w-80 p-2 flex flex-row items-center justify-between">
                {(meanSensorData) ? meanSensorComp : noDataComp}
                <div className="w-fit flex gap-2">
                    <button onClick={() => getDataHandler()} className={"bg-white text-black grid items-center justify-center rounded-lg shadow-md w-12 h-6 "}>
                        <MagnifyingGlassIcon className="w-6 h-6 "/>
                    </button>
                    <button onClick={() => resetDataHandler()} className={"bg-white text-black grid items-center justify-center rounded-lg shadow-md w-12 h-6"}>
                        <ArrowPathIcon className="w-6 h-6"/>
                    </button>
                </div>
            </div>
            
        </div>
        

    


        
    </>);



};

export default ReadSensor;



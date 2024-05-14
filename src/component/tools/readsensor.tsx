import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { ArrowPathIcon } from "@heroicons/react/16/solid";
import { SunIcon } from "@heroicons/react/16/solid";
import { InformationCircleIcon } from "@heroicons/react/16/solid";
import { BeakerIcon } from "@heroicons/react/16/solid";
import { ShieldExclamationIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
function ReadSensor(props: any){

    const [searchQuery, setSearchQuery] = useState("")
    const [loading, setLoading] = useState(false)

    function submitID(){
        setLoading(true)
    }

    function reloadID(){
        setLoading(false)
    }
    const notFoundUI = <div className="flex w-full items-center justify-center"><p className="text-xs font-light text-black">พืชนี้ไม่มีในระบบ</p></div>;
    const skeletonUI = <><p className="flex flex-row w-full h-16 bg-white rounded-lg items-center justify-center p-2 gap-3 animate-pulse">
        <p className="text-xs text-gray-400">กำลังโหลด...</p>
        </p></>;
    const infoUI = <section className="bg-white items-center justify-center mx-5 my-5 gap-5">
        <h1 className="text-sm font-bold text-left text-black">
            วันที่วัดค่า: 1/1/2567 09:41
            {(loading) ? skeletonUI : null}
        </h1>
        <article>
            <h2 className="text-sm font-bold text-left text-black">
                สถานะต้นไม้: 
                {(loading) ? skeletonUI : null}
            </h2>
        </article>
    </section>

    

    // FILL CODE INSIDE THE RETURN STATEMENT
    return (<>

        <div className="w-80 h-32 bg-white rounded-lg opacity-60 mb-5">
            <p className="text-xs text-black">Hi, I'm Sensor Reader!</p>
            <div className="flex flex-row w-80 mb-3 items-center justify-center gap-5">
                <p className=" text-black text-xs w-35 mb-1">รหัสของอุปกรณ์</p>
                <input value={searchQuery} onChange={event => setSearchQuery(event.target.value)} className="rounded-full shadow-md py-4 px-3 ps-10 w-45 h-4 text-xs text-black" type="text" placeholder="device ID"/>
            </div>
            <div className="w-80 mb-3 flex justify-end -mx-5 my-2 gap-3">
                <button onClick={() => submitID()} className={"bg-white text-black grid items-center justify-center rounded-lg shadow-md w-12 h-6"}>
                    <MagnifyingGlassIcon className="w-6 h-6 "/>
                </button>
                <button onClick={() => reloadID()} className={"bg-white text-black grid items-center justify-center rounded-lg shadow-md w-12 h-6"}>
                    <ArrowPathIcon className="w-6 h-6"/>
                </button>
            </div>

            {(loading) ? infoUI : null}

            
        </div>
        

    


        
    </>);



};

export default ReadSensor;



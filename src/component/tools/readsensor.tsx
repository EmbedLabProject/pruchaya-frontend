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

    // FILL CODE INSIDE THE RETURN STATEMENT
    return (<>

        <div className="w-80 h-32 bg-white rounded-lg opacity-60 mb-5">
            <p className="text-xs text-black">Hi, I'm Sensor Reader!</p>
            <div className="flex flex-row w-80 mb-3 items-center justify-center mx-5">
                <p className=" text-black text-xs w-30 mb-1">รหัสของอุปกรณ์</p>
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

            
        </div>
        

    


        
    </>);



};

export default ReadSensor;



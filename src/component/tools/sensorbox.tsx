import { BeakerIcon } from "@heroicons/react/16/solid";
import { SunIcon } from "@heroicons/react/16/solid";
import { InformationCircleIcon } from "@heroicons/react/16/solid";
import { ShieldExclamationIcon } from "@heroicons/react/16/solid";
function SensorBox(props: any){

    const {Icon, percent, onClick} = props;

    return (

        <button onClick={onClick} className="flex flex-row w-full h-16 bg-white rounded-lg items-center justify-start p-2 gap-3">
            <div className="w-6 h-6 rounded-full bg-gray-600 grid place-content-center">
                <BeakerIcon className="w-5 h-5"/>
            </div>
            
            <progress className="w-60" value="80" max="100" id="waterMeter"></progress>
            <div className="flex flex-col items-start">
                <InformationCircleIcon className="w-6 h-6 text-black"></InformationCircleIcon>
            </div>
        </button>

    );

}

export default SensorBox;
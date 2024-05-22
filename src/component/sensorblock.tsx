import { RssIcon, SunIcon } from "@heroicons/react/16/solid";
import { IoIosWater } from "react-icons/io";

function SensorBlock(props: any){

    const {selected, date, lightPer, humidPer, vibraPer} = props;

    let button;
    if (selected){
        button = <button className="w-fit h-fit bg-gray-600 shadow-md px-2 rounded-md text-sm text-white">เลือก</button>;
    }
    else {
        button = <button className="w-fit h-fit bg-white shadow-md px-2 rounded-md text-sm text-black">เลือก</button>;
    }
    
    return (

        <div className="flex flex-row gap-2 w-72 bg-gray-100 h-fit rounded-lg p-2 shadow-md text-black items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row gap-2">
                            <div className="flex flex-row gap-1 items-center justify-center">
                                <SunIcon className="w-5"/>
                                <p className="text-sm">{lightPer}%</p>
                            </div>
                            <div className="flex flex-row gap-1 items-center justify-center">
                                <IoIosWater  />
                                <p className="text-sm">{humidPer}%</p>
                            </div>
                            <div className="flex flex-row gap-1 items-center justify-center">
                                <RssIcon className="w-4"/>
                                <p className="text-sm">{vibraPer}%</p>
                            </div>
                        </div>
                        <p className="text-xs font-light">วัดค่าเมื่อ {date}</p>

                    </div>

                    {button}
                    
                    
                    

                </div>



    );

    



};

export default SensorBlock;




import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";

function IdentifyPlant(props: any){

    function handleFile(isExpert: boolean){

    }

    // FILL CODE INSIDE THE RETURN STATEMENT
    return (<>

        <div className="w-80 h-35 bg-white rounded-lg opacity-60 mb-5 shadow-md"> 
            <ul className="list-none mx-5 my-5 flex flex-col sm:flex-row items-center gap-5 content-stretch">
                <button onClick={() => handleFile(false)} className={"flex flex-row items-center justify-center gap-3 w-20 h-20 bg-neutral-200 rounded-lg opacity-80" }>
                <ArrowUpTrayIcon className="w-8 h-8"/>
            </button>
            <button onClick={() => handleFile(false)} className={"flex flex-row items-center justify-center gap-3 w-20 h-20 bg-neutral-200 rounded-lg opacity-80"}>
                <ArrowUpTrayIcon className="w-8 h-8"/>
            </button>
            <button onClick={() => handleFile(false)} className={"flex flex-row items-center justify-center gap-3 w-20 h-20 bg-neutral-200 rounded-lg opacity-80"}>
                <ArrowUpTrayIcon className="w-8 h-8"/>
            </button>
            </ul>
            <div className="w-80 mb-3 grid justify-items-end content-center gap-5">
                <button className="items-center justify-center rounded-lg shadow-md w-6 h-6">
                    <MagnifyingGlassCircleIcon className="w-6 h-6 "/>
                </button>
                <button className="items-center justify-center rounded-lg shadow-md w-6 h-6">
                    <ArrowPathIcon className="w-6 h-6"/>
                </button>
            </div>
        </div>

    


        
    </>);



};

export default IdentifyPlant;



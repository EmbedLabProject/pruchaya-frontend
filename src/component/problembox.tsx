import { ExclamationTriangleIcon } from "@heroicons/react/16/solid";

function ProblemBox(props: any){

    const {name, date, onClick} = props;

    return (

        <button onClick={onClick} className="flex flex-row w-full h-16 bg-white rounded-lg items-center justify-start p-2 gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-600">
                <ExclamationTriangleIcon className="text-white w-5"/>
            </div>
            <div className="flex flex-col items-start">
                <p className="text-sm text-black font-medium">{name}</p>
                <p className="text-xs font-light text-black">{date}</p>
            </div>
        </button>

    );

}

export default ProblemBox;
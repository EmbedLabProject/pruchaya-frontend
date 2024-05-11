import { getProblemById } from "@/script/main";
import { useEffect, useState } from "react";

function ProblemDetailBox(props: any){

    const {problem} = props;

    const [currentProb, setCurrentProb] = useState<any>({});


    useEffect(() => {
        async function getData(){
            if (problem != ""){
                setCurrentProb(await getProblemById(problem));
                console.log(currentProb);
            }
        }
        getData();
    },[problem]);


    const problemNotChosen = <div className="flex w-full items-center justify-center"><p className="text-xs text-black">ยังไม่ได้เลือกปัญหา</p></div>;


    const detailContent = <> <div className="flex flex-row gap-3"><div className="w-32 h-20 bg-gray-700 rounded-lg"></div>
    <p className="w-40 text-wrap text-xs text-black"><span className="font-semibold">รหัสปัญหา </span>{currentProb.ticket_id}</p></div>
    <div className="flex w-full flex-col">
    <p className="text-xs text-black font-semibold">คำอธิบาย</p>
    <p className="w-full text-xs text-black text-balance">{currentProb.description}</p>
    </div>

    <div className="mt-5 flex flex-row items-center justify-center w-full gap-2">
        <div className="flex flex-row items-center justify-center w-fit h-fit px-3 py-1 bg-white rounded-full shadow-md text-black">
        <p className="font-light text-sm">เริ่มแก้ไข</p>
        </div>
        <div className="flex flex-row items-center justify-center w-fit h-fit px-3 py-1 bg-white rounded-full shadow-md text-black">
        <p className="font-light text-sm">แก้ไขเรียบร้อย</p>
        </div>
    </div></>;

    return (

        <div className="flex flex-col w-80 h-fit gap-3 bg-white rounded-lg bg-opacity-60 items-center justify-start p-3">
        {problem == "" ? problemNotChosen : detailContent}
    
        </div>

    );

}

export default ProblemDetailBox;
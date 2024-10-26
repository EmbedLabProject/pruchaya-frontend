import { distFromUser, getProblemById, getSolving, setSolving } from "@/script/main";
import Image from 'next/image'
import {getProbStatus, setProbStatus} from "@/script/api";

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

    async function startSolveHandler(){
        const probStatus = await getProbStatus(currentProb.ticket_id);
        if (probStatus.status == "ongoing"){
            await setProbStatus(currentProb.ticket_id, "processing");
            setSolving(currentProb.ticket_id);
        }
        else if (probStatus.status == "solved"){
            alert("ปัญหานี้กำลังถูกแก้ไข");
        }
        else if (probStatus.status == "processing"){
            if (getSolving() == currentProb.ticket_id){
                alert("ท่านกำลังแก้ไขปัญหานี้อยู่");
            }
            else {
                alert("ปัญหานี้กำลังถูกแก้ไขโดยผู้ใช้อื่น");
            }
        }
    }

    async function finishSolveHandler(){
        const probStatus = await getProbStatus(currentProb.ticket_id);
        if (probStatus.status == "ongoing"){
            await setProbStatus(currentProb.ticket_id, "processing");
        }
    }



    
    
    const d = distFromUser(currentProb.lat, currentProb.long).toFixed(2);

    const problemNotChosen = <div className="flex w-full items-center justify-center"><p className="text-xs text-black">ยังไม่ได้เลือกปัญหา</p></div>;


    const detailContent = <> <div className="flex flex-row gap-3">
        <a target="_blank" rel="noopener noreferrer" href={currentProb.photo_url} className="">
            <img src={currentProb.photo_url} className="w-36 h-28 rounded-lg shadow-lg" alt=""/>
        </a>
        <div className="flex flex-col gap-1">
        <p className="w-40 text-wrap text-xs text-black"><span className="font-semibold">รหัสปัญหา </span>{currentProb.ticket_id}</p>
        <p className="w-40 text-wrap text-xs text-black"><span className="font-semibold">ประเภท </span>อื่น ๆ</p>
        <p className="w-40 text-wrap text-xs text-black font-semibold">วันที่รายงาน</p>
        <p className="w-40 text-wrap text-xs text-black"><span className="font-semibold"></span>{currentProb.timestamp}</p>
        <div className="flex flex-row gap-2 w-40 items-center justify-start">
            <p className="text-wrap text-xs text-black font-semibold">สถานะ</p>
            <div className="w-fit h-fit bg-gray-100 text-gray-700 rounded-full text-xs px-2 py-1 font-light">ยังไม่ดำเนินการ</div>

        </div>
        </div>
    
    </div>
    
    <div className="flex w-full flex-col gap-2">
        <div className="flex flex-col w-full">
            <p className="text-xs text-black font-semibold">ตำแหน่ง</p>
            <p className="w-full text-xs text-black text-balance">{currentProb.address}</p>
            <p className="w-full text-xs text-black text-balance">{"(" + d +" กิโลเมตร จากท่าน)"}</p>

        </div>
        <div className="flex flex-col w-full">
            <p className="text-xs text-black font-semibold">คำอธิบาย</p>
            <p className="w-full text-xs text-black text-balance">{currentProb.description}</p>
        </div>
    
    
    </div>

    </>;

    return (

        <div className="flex flex-col w-80 h-fit gap-3 bg-white rounded-lg bg-opacity-60 items-center justify-start p-3 shadow-md">
        {problem == "" ? problemNotChosen : detailContent}
    
        </div>

    );

}

export default ProblemDetailBox;
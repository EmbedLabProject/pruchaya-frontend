
import { ArrowUpTrayIcon } from "@heroicons/react/16/solid";
import { ArrowPathIcon } from "@heroicons/react/16/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

function IdentifyPlant(props: any){

    const [awating, setAwaiting] = useState(true)
    const [loading, setLoading] = useState(false)
    const [showing, setshowing] = useState(false)
    const [name, setName] = useState("");
    const [detail, setDetail] = useState("");

    function handleFile(){
        <form action="/action_page.php">
            <input type="file" id="myFile" name="filename"></input>
            <input type="submit"></input>
        </form>
    }
    
    function submitImage(){
        setAwaiting(false)
        setLoading(true)
        setshowing(false)
    }

    function reloadImage(){
        setAwaiting(true)
        setLoading(false)
        setshowing(false)
    }
    
    const notFoundUI = <div className="flex w-full items-center justify-center"><p className="text-xs font-light text-black">พืชนี้ไม่มีในระบบ</p></div>;
    const skeletonUI = <><p className="flex flex-row w-full h-16 bg-white rounded-lg items-center justify-center p-2 gap-3 animate-pulse">
        <p className="text-xs text-gray-400">กำลังโหลด...</p>
        </p></>;
    const infoUI = <section className="bg-white items-center justify-center mx-5 my-5 gap-5">
        <h1 className="text-sm font-bold text-left text-black">
            ชื่อทางวิทยาศาสตร์: {name}
            {(!loading && (name=="")) ? notFoundUI : null}
            {(loading) ? skeletonUI : null}
        </h1>
        <article>
            <h2 className="text-sm font-bold text-left text-black">
                คำอธิบาย: {detail}
                {(!loading && (detail=="")) ? notFoundUI : null}
                {(loading) ? skeletonUI : null}
            </h2>
        </article>
    </section>
    

    // FILL CODE INSIDE THE RETURN STATEMENT
    return (<>

        <div className="w-80 h-fit bg-white rounded-lg opacity-60 mb-5 shadow-md"> 
            <p className="text-xs text-black mx-1 my-1">กรุณาใส่ไฟล์ภาพต้นไม้ที่สนใจ   </p>
            <ul className="list-none mx-5 my-1 flex flex-col sm:flex-row items-center gap-5 content-stretch">
                <button onClick={() => handleFile()} id="first-picture" className={"flex flex-row items-center justify-center gap-3 w-20 h-20 bg-neutral-200 rounded-lg opacity-80"}>
                    <ArrowUpTrayIcon className="w-8 h-8"/>
                </button>
                <button onClick={() => handleFile()} id="second-picture" className={"flex flex-row text-black items-center justify-center gap-3 w-20 h-20 bg-neutral-200 rounded-lg opacity-80"}>
                    <ArrowUpTrayIcon className="w-8 h-8"/>
                </button>
                <button onClick={() => handleFile()} id="-picture" className={"flex flex-row items-center justify-center gap-3 w-20 h-20 bg-neutral-200 rounded-lg opacity-80"}>
                    <ArrowUpTrayIcon className="w-8 h-8"/>
                </button>
            </ul>
            {(loading) ? infoUI : null}
            <div className="w-80 mb-3 flex justify-end gap-3 mt-1   ">
                <button onClick={() => submitImage()} className={"bg-white text-black grid items-center justify-center rounded-lg shadow-md w-12 h-6 "}>
                    <MagnifyingGlassIcon className="w-6 h-6 "/>
                </button>
                <button onClick={() => reloadImage()} className={"bg-white text-black grid items-center justify-center rounded-lg shadow-md w-12 h-6 mx-3"}>
                    <ArrowPathIcon className="w-6 h-6"/>
                </button>
            </div>
            {(!loading && !awating) ? notFoundUI : null}
            
        </div>

    


        
    </>);



};

export default IdentifyPlant;



import { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { ArrowPathIcon } from "@heroicons/react/16/solid";
import FAQsButton from "./faqsbutton";

function ChatBot(props: any){
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false)

    function submitID(){
        setLoading(true)
        console.log("want to know: " + searchText)
    }

    function reloadID(){
        setLoading(false)
        console.log("rerererere")
    }

    // FILL CODE INSIDE THE RETURN STATEMENT
    return (<>

        <div className="w-80 h-fit bg-white rounded-lg opacity-60 mb-5 gap-2">
            <div className="w-80 h-32 flex flex-row"></div>
            <section className="w-60 gap-3 mx-1 my-1">
                <div className="flex w-60 flex-wrap gap-1">
                    <FAQsButton add={""} rem={""} constraint={""} setState={""} selected={""} text="วิธีการตัดแต่ง"/>
                    <FAQsButton add={""} rem={""} constraint={""} setState={""} selected={""} text="วิธีการดูแล"/>
                </div>
                <div className="flex flex-row w-80 mb-3 items-center justify-center content-center inset-y-0 place-items-end">
                    <div className="relative mt-1">
                        <input value={searchText} onChange={event => setSearchText(event.target.value)} className="rounded-full shadow-md py-4 px-3 ps-10 pe-16 w-72 h-4 text-xs text-black" type="text" placeholder="ค้นหาปัญหา"/>
                        <button onClick={() => submitID()} className={"absolute inset-y-0 end-10 flex items-center"}>
                            <PaperAirplaneIcon className="w-4 h-4 text-black"/>
                        </button>
                        <button onClick={() => reloadID()} className={"absolute inset-y-0 end-5 flex items-center"}>
                            <ArrowPathIcon className="w-4 h-4 text-black"/>
                        </button>
                    </div>
                </div>
            </section>
        </div>


    


        
    </>);



};

export default ChatBot;



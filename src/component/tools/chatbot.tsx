import { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { ArrowPathIcon } from "@heroicons/react/16/solid";
import FAQsButton from "./faqsbutton";

function ChatBot(props: any){
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false)

    function submitID(){
        setLoading(true)
        console.log("want to know Q: " + searchText)
    }

    function reloadID(){
        setLoading(false)
        setSearchText("")
        console.log("rerererere")
    }

    // FILL CODE INSIDE THE RETURN STATEMENT
    return (<>

        <div className="w-80 h-fit bg-white rounded-lg bg-opacity-60 mb-5 gap-2">
            <div className="p-4 w-80 h-60 flex flex-col gap-1">
                <div className="w-full flex items-start justify-end">
                    <div className="flex flex-col items-end gap-1 w-60 flex-wrap">
                    
                    </div>
                    
                </div>
                <div className="w-full flex items-start justify-start">
                    <p className="text-sm">สวัสดี</p>
                </div>

            </div>
            <section className="flex flex-col w-80 gap-2 mx-1 my-1">
                <div className="flex w-80 flex-wrap items-center justify-center">
                    <div className="flex flex-wrap w-60 gap-1">
                        <FAQsButton setText={setSearchText} text={searchText} name="วิธีการตัดแต่ง"/>
                        <FAQsButton setText={setSearchText} text={searchText} name="ดูแลยังไง"/>
                        <FAQsButton setText={setSearchText} text={searchText} name="รดน้ำยังไง"/>
                        <FAQsButton setText={setSearchText} text={searchText} name="ดินเป็นกรด"/>
                        <FAQsButton setText={setSearchText} text={searchText} name="ดินเป็นด่าง"/>
                        <FAQsButton setText={setSearchText} text={searchText} name="วิธีการปลูก"/>
                    </div>
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



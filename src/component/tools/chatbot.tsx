import { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { ArrowPathIcon } from "@heroicons/react/16/solid";

function ChatBot(props: any){
    const [searchQuery, setSearchQuery] = useState("");
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
            <p className="text-xs text-black">Hi, I'm Chatbot!</p>
            <div className="flex flex-row w-80 mb-3 items-center justify-center inset-y-0">
                <div className="relative">
                    
                    <input value={searchQuery} onChange={event => setSearchQuery(event.target.value)} className="rounded-full shadow-md py-4 px-3 ps-10 w-75 h-4 text-xs text-black" type="text" placeholder="ค้นหาปัญหา"/>
                    <button onClick={() => submitID()} className={"absolute inset-y-0 end-5 flex items-center ps-3"}>
                        <PaperAirplaneIcon className="w-4 h-4 text-black"/>
                    </button>
                    <button onClick={() => reloadID()} className={"absolute inset-y-0 end-0 flex items-center ps-3"}>
                        <ArrowPathIcon className="w-4 h-4 text-black"/>
                    </button>
                </div>
            </div>
        </div>


    


        
    </>);



};

export default ChatBot;



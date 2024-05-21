import { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { ArrowPathIcon } from "@heroicons/react/16/solid";
import FAQsButton from "./faqsbutton";
import { appendCurrentMessages, getCurrentMessages } from "@/script/main";
import { sendPrompt } from "@/script/api";

function ChatBot(props: any){
    const [searchText, setSearchText] = useState("");

    function formatter(text: any){
        let arr = text.split("**");
        let result = [];
        let temp = "";
        for (let i=0; i<arr.length; i++){
            if ((i === 0) || (i % 2 !== 1)){
                temp += arr[i];
                let t = "";
                let arr2 = arr[i].split("*");
                for (let j=0; j<arr2.length; j++){
                    if (j === 0){
                        t += arr2[j];
                    }
                    else {
                        t += arr2[j] + "\n";
                    }
                }
                result.push(<span key={i} className="font-normal">{t}</span>);
            }
            else {
                temp += "<b>"+arr[i]+"</b>";
                let t = "";
                let arr2 = arr[i].split("*");
                for (let j=0; j<arr2.length; j++){
                    if (j === 0){
                        t += arr2[j];
                    }
                    else {
                        t += arr2[j] + "\n";
                    }
                }
                result.push(<span key={i} className="font-medium">{t}</span>);
            }
        }
        return result;
    }

    function submitID(){
        setLoading(true)
        console.log("want to know Q: " + searchText)
    }

    function reloadID(){
        setLoading(false)
        setSearchText("")
        console.log("rerererere")
    }

    ////

    const [messages, setMessages] = useState<any[]>(getCurrentMessages());
    const [userTextbox, setUserTextBox] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    function addMessage(sender: string, message: any, deltaId: number){
        const currentId = messages.length;
        appendCurrentMessages({id: currentId + deltaId, sender: sender, message: message });
        setMessages(m => ([...m,{id: currentId + deltaId, sender: sender, message: message }]));
    }

    async function sentHandler(){
        if ((userTextbox.trim() != "") && (!loading)){
            setUserTextBox("");
            addMessage("คุณ",<span>{userTextbox}</span>, 1);
            setLoading(true);
            setShowResult(true);
            const gemini = await sendPrompt("สรุปสั้นให้หน่อยว่า" + userTextbox + " ขอไม่เกิน 200 คำ");
            const message = gemini.response;
            setLoading(false);
            setShowResult(false);
            if (message.trim() != ""){
                addMessage("Bot", formatter(message), 2);
            }
        }
    }

    const list = messages.map((m) => {
        if (m["sender"] == "Bot"){
            return <div key={m["id"]} className="w-full items-start justify-start flex flex-col">
                <div className="w-fit h-fit bg-cyan-200 rounded-full px-2">
                <p className="text-xs text-cyan-800 font-light">Bot</p>
                </div>
                <div className="flex flex-wrap w-60">
                    <p className="text-sm text-black text-left text-balance">
                    {m["message"]}
                    </p>
                </div>
            </div>;
        }
        else if (m["sender"] == "คุณ"){
            return <div key={m["id"]} className="mt-3 w-full items-end justify-end flex flex-col">
                <div className="w-fit h-fit bg-green-200 rounded-full px-2">
                    <p className="text-xs text-right text-green-800 font-light">คุณ</p>
                </div>
                <div className="flex flex-wrap w-60 items-end justify-end">
                <p className="text-sm text-black text-right text-balance">
                    {m["message"]}
                </p>        
                </div>
            </div>;
        }
    });

    const loadingBar = <div className="mt-3 flex flex-col gap-2 animate-pulse">
    <div className="w-40 h-3 bg-gray-300 rounded-full"></div>
    <div className="w-40 h-3 bg-gray-300 rounded-full"></div>
    </div>;

    // FILL CODE INSIDE THE RETURN STATEMENT
    return (<>

        <div className="w-80 h-fit bg-white rounded-lg bg-opacity-60 mb-5 gap-2">
            <div className="flex flex-col w-80 h-64 mb-6 rounded-lg p-3 overflow-y-auto bg-white bg-opacity-60">
                        {list}

                        {loading ? loadingBar : null}
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
                        <input value={userTextbox} onChange={event => setUserTextBox(event.target.value)} className="rounded-full shadow-md py-4 px-3 ps-10 pe-16 w-72 h-4 text-xs text-black" type="text" placeholder="ค้นหาปัญหา"/>
                        <button onClick={() => sentHandler()} className={"absolute inset-y-0 end-10 flex items-center"}>
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



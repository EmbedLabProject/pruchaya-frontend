import { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import { ArrowPathIcon } from "@heroicons/react/16/solid";
import FAQsButton from "./faqsbutton";
import { appendCurrentMessages, clearCurrentMessages, getCurrentMessages, getMeanSensorData, getViewingProblem } from "@/script/main";
import { sendPrompt } from "@/script/api";

function ChatBot(props: any){

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

    

    ////

    const [messages, setMessages] = useState<any[]>(getCurrentMessages());
    const [userTextbox, setUserTextBox] = useState("");
    const [loading, setLoading] = useState(false);

    function addMessage(sender: string, message: any, deltaId: number){
        console.log("Sent!");
        const currentId = messages.length;
        appendCurrentMessages({id: currentId + deltaId, sender: sender, message: message });
        setMessages(m => ([...m,{id: currentId + deltaId, sender: sender, message: message }]));
    }

    async function sentHandler(){
        if ((userTextbox.trim() != "") && (!loading)){
            setUserTextBox("");
            setLoading(true);
            addMessage("คุณ",<span>{userTextbox}</span>, 1);
            const gemini = await sendPrompt("สรุปสั้นให้หน่อยว่า" + userTextbox + " ขอไม่เกิน 200 คำ");
            const message = gemini.response;
            setLoading(false);
            if (message.trim() != ""){
                addMessage("Bot", formatter(message), 2);
            }
        }
    }

    function clearHandler(){
        setLoading(false);
        setMessages([]);
        clearCurrentMessages();
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


    async function specialPrompt1(){
        const meanSensorData = getMeanSensorData();
        if (meanSensorData){
            const meanHumid = meanSensorData.humidity;
            const meanVibration = meanSensorData.vibration;
            const meanLight = meanSensorData.light;
            let humidString = "";
            let vibraString = "";
            let lightString = "";

            if (meanHumid <= 10){
                humidString = "แห้งมาก"
            }
            else if (meanHumid > 10 && meanHumid <=35){
                humidString = "แห้ง"
            }
            else if (meanHumid > 35 && meanHumid <=57){
                humidString = "ชื้นปกติ"
            }
            else if (meanHumid > 58 && meanHumid <=81){
                humidString = "ชื้น"
            }
            else if (meanHumid > 81){
                humidString = "ชื้นมาก" 
            }

            if (meanVibration <= 40){
                vibraString = "ไม่สั่น"
            }
            else if (meanVibration > 40 && meanVibration <= 65){
                vibraString = "สั่นเล็กน้อย เทียบเท่ากับรถยนต์วิ่งผ่าน"
            }
            else if (meanVibration > 65 && meanVibration <= 82){
                vibraString = "สั่นปานกลาง"
            }
            else if (meanVibration > 83){
                vibraString = "สั่นมาก"
            }

            if (meanLight <= 20){
                lightString = "มืด"
            }
            else if (meanLight > 20 && meanLight <= 38){
                lightString = "แสงน้อยมาก"
            }
            else if (meanLight > 38 && meanLight <= 60){
                lightString = "แสงในร่มหรือกลางคืน"
            }
            else if (meanLight > 60 && meanLight <= 88){
                lightString = "สว่าง"
            }
            else if (meanLight > 88){
                lightString = "สว่างมาก อาจเกิดอาการใบไหม้"
            }
            setUserTextBox("");
            setLoading(true);
            addMessage("คุณ",<span>{"วิเคราะห์ผลการวัด"}</span>, 1);
            const gemini = await sendPrompt("ดินที่" + humidString + "มีข้อดีข้อเสียอย่างไร ควรปลูกพืชอะไร ขอไม่เกิน 200 คำ");
            const message = "ดินถือว่าอยู่ในระดับ**" + humidString + "** " + gemini.response + "ส่วนการวัดแสงอยู่ในระดับ**" + lightString + "** และการสั่นถือว่า**" + vibraString + "**";
            setLoading(false);
            if (message.trim() != ""){
                addMessage("Bot", formatter(message)  , 2);
            }
        }
        else {
            addMessage("คุณ",<span>{"วิเคราะห์ผลการวัด"}</span>, 1);
            addMessage("Bot",<span>{"คุณยังไม่ได้เลือกข้อมูลจากเซนเซอร์"}</span> , 2);
        }
        
    }

    async function specialPrompt2(){
        
        const viewingProb = getViewingProblem();
        if (viewingProb){
            setUserTextBox("");
            setLoading(true);
            addMessage("คุณ",<span>{"แก้ปัญหาที่เลือกอย่างไร"}</span>, 1);
            const gemini = await sendPrompt(`มีประชาชนแจ้งปัญหามาว่่า "${viewingProb.description}" ช่วยเสนอวิธีแก้ปัญหาให้กับเจ้าหน้าที่ของกรุงเทพมหานคร ขอไม่เกิน 200 คำ`);
            const message = gemini.response;
            setLoading(false);
            if (message.trim() != ""){
                addMessage("Bot", formatter(message), 2);
            }
        }
        else {
            addMessage("คุณ",<span>{"แก้ปัญหาที่เลือกอย่างไร"}</span>, 1);
            addMessage("Bot",<span>{"คุณยังไม่ได้เลือกปัญหา"}</span> , 2);
        }
        
    }

    async function specialPrompt3(){
        setUserTextBox("");
        setLoading(true);
        addMessage("คุณ",<span>{"แนะนำการปลูกองุ่น"}</span>, 1);
        const gemini = await sendPrompt("แนะนำการปลูกองุ่น ขอไม่เกิน 200 คำ");
        const message = gemini.response;
        setLoading(false);
        if (message.trim() != ""){
            addMessage("Bot", formatter(message), 2);
        }


    }

    // FILL CODE INSIDE THE RETURN STATEMENT
    return (<>

        <div className="w-80 h-fit bg-white rounded-lg bg-opacity-60 mb-5 gap-2">
            <div className="flex flex-col w-80 h-64 mb-6 rounded-lg p-3 overflow-y-auto bg-white bg-opacity-60">
                        {list}

                        {loading ? loadingBar : null}
            </div>
            <section className="flex flex-col w-80 gap-2 mx-1 my-1">
                <div className="flex w-80 flex-wrap items-center justify-center">
                    <div className="flex flex-wrap w-72 gap-1 items-center justify-center">
                        <FAQsButton onClick={specialPrompt1} value="วิเคราะห์ผลการวัด"/>
                        <FAQsButton onClick={specialPrompt2} value="แก้ปัญหาที่เลือกยังไง"/>
                        <FAQsButton onClick={specialPrompt3} value="แนะนำการปลูกองุ่น"/>

                    </div>
                </div>
                <div className="flex flex-row w-80 mb-3 items-center justify-center content-center inset-y-0 place-items-end">
                    <div className="relative mt-1">
                        <input value={userTextbox} onChange={event => setUserTextBox(event.target.value)} className="rounded-full shadow-md py-4 px-3 ps-10 pe-16 w-72 h-4 text-xs text-black" type="text" placeholder="ค้นหาปัญหา"/>
                        <button onClick={() => sentHandler()} className={"absolute inset-y-0 end-10 flex items-center"}>
                            <PaperAirplaneIcon className="w-4 h-4 text-black"/>
                        </button>
                        <button onClick={() => clearHandler()} className={"absolute inset-y-0 end-5 flex items-center"}>
                            <ArrowPathIcon className="w-4 h-4 text-black"/>
                        </button>
                    </div>
                </div>
            </section>
        </div>


    


        
    </>);



};

export default ChatBot;



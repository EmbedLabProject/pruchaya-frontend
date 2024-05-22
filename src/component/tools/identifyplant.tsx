
import { getSpecies, sendPrompt } from "@/script/api";
import { ArrowUpTrayIcon } from "@heroicons/react/16/solid";
import { ArrowPathIcon } from "@heroicons/react/16/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { fork } from "child_process";
import React ,{ useState } from "react";

function IdentifyPlant(props: any){

    const [awating, setAwaiting] = useState(true)
    const [loading, setLoading] = useState(false)
    const [showing, setshowing] = useState(false)
    const [imageFiles, setImageFiles] = useState<(File|null)[]>([null, null, null]);
    const [imageUrls, setImageUrls] = useState<string[]>(['', '', '']);
    const [currentPlant, setCurrentPlant] = useState<any>({});
    const [detail, setDetail] = useState("");

    function handleFile(index: number) {
        const input = document.getElementById(`image${index}`) as HTMLInputElement;
        input.addEventListener('change', function(event) {
            const file = (event.target as HTMLInputElement).files?.[0]; // Get the selected file
    
            // Check if the file size exceeds the limit (5 MB in this example)
            const maxSize = 5 * 1024 * 1024; // 5 MB in bytes
            if (file && file.size > maxSize) {
                alert('File size exceeds the limit (5 MB). Please select a smaller file.');
                input.value = ''; // Clear the file input
            } else {
                // File size is within the limit, you can proceed with handling the file
                // For example, you can upload the file to the server or perform further processing
            }
        });
        input.click(); // Trigger file input click event
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>, index: number) {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageUrl = reader.result as string;
                const newUrls = [...imageUrls];
                const newFiles = [...imageFiles];
                newUrls[index - 1] = imageUrl;
                newFiles[index - 1] = file;
                setImageUrls(newUrls);
                setImageFiles(newFiles);
            };
            reader.readAsDataURL(file);
        }
    }
    
    function submitImage(){
        setAwaiting(false)
        setLoading(true)    
        setshowing(false)
        try {
            const filesToUpload = imageFiles.filter(file => file !== null) as File[];
            console.log(filesToUpload)
            const speciesData = getSpecies(imageUrls);
            setCurrentPlant(speciesData);
        } catch (error) {
            console.error("Error identifying plant:", error);
        } finally {
            setLoading(false);
        }
        sendPrompt(currentPlant.scientificName)
        console.log(imageUrls)
        formatText()
    }

    function reloadImage(){
        setAwaiting(true)
        setLoading(false)
        setshowing(false)
        setImageFiles([null, null, null]);
        setImageUrls(['', '', '']);
        setCurrentPlant('')
    }

    function formatText(){
        let formattedText = detail.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

        const lines = formattedText.split('\n');

        const formattedLines = lines.map(line => {
            if (line.startsWith('* ')) {
                return '<li>' + line.substring(2) + '</li>';
            } else {
                return '<p>' + line + '</p>';
            }
        });

        formattedText = formattedLines.join('');

        formattedText = formattedText.replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>');

        setDetail(formattedText)
    };
    
    const notFoundUI = <div className="flex w-full items-center justify-center"><p className="text-xs font-light text-black">พืชนี้ไม่มีในระบบ</p></div>;
    const skeletonUI = <><p className="flex flex-row w-full h-16 bg-white rounded-lg items-center justify-center p-2 gap-3 animate-pulse">
        <p className="text-xs text-gray-400">กำลังโหลด...</p>
        </p></>;
    const infoUI = <section className="bg-white items-center justify-center mx-5 my-5 gap-5">
        <h1 className="text-sm font-bold text-left text-black">
            ชื่อทางวิทยาศาสตร์: {currentPlant.scientificName}
            {(!loading && (currentPlant.scientificName=="")) ? notFoundUI : null}
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

        <div className="w-80 h-fit bg-white rounded-lg bg-opacity-60 mb-5 shadow-md"> 
            <p className="text-xs text-black mx-1 my-1">กรุณาใส่ไฟล์ภาพต้นไม้ที่สนใจ</p>
            <ul className="list-none mx-5 my-1 flex flex-col sm:flex-row items-center gap-5 content-stretch">
                {[1, 2, 3].map(index => (
                    <React.Fragment key={index}>
                        <input
                            type="file"
                            id={`image${index}`}
                            name={`image${index}`}
                            accept="image/*"
                            className="hidden"
                            onChange={(event) => handleChange(event, index)}
                        />
                        <button onClick={() => handleFile(index)} className="flex flex-row items-center justify-center gap-3 w-20 h-20 bg-neutral-200 rounded-lg opacity-80 shadow-md">
                            {imageUrls[index - 1] ? (
                                <img src={imageUrls[index - 1]} alt={`Image ${index}`} className="w-full h-full object-cover" />
                            ) : (
                                <ArrowUpTrayIcon className="w-8 h-8 text-gray-500" />
                            )}
                        </button>
                    </React.Fragment>
                ))}
            </ul>
            {(loading) ? infoUI : null}
            <div className="w-80 mb-3 flex justify-end gap-3 mt-1">
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



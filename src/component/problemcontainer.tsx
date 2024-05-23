import { distFromUser, getAllProblems, setViewingProblem } from "@/script/main";
import ProblemBox from "./problembox";
import { useEffect, useState } from "react";


function ProblemContainer(props: any) {

    const {searchQuery, searchConstraint, setSelected, load} = props;

    const [list, setList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);


    function setSelectedHandler(problem: any){
        setSelected(problem.ticket_id);
        setViewingProblem(problem);
    }
    

    


    const checkConstraint = function(desc: string, lat: number, long: number) {
        let result = true;
        searchConstraint.forEach(((element: any) => {
            if (element["name"] == "รัศมี 5 กิโลเมตร"){
                result = result && element["function"](lat, long);
            } else {
                result = result && element["function"](desc);
            }
        }));
        return result;
    };

    function checkMatchQuery(problem: any){
        if (problem.description.includes(searchQuery) && checkConstraint(problem.description,problem.lat,problem.long)){
            return true;
        }
        return false;
    }


    useEffect(() => {
        async function generateList(){
            const probs: any[] = await getAllProblems();
            const temp: any[] = [];
            probs.forEach(p => {
                if(checkMatchQuery(p)){
                    let desc = p.description;
                    if (desc.length > 25) {
                        desc = desc.substring(0, 25) + "...";
                    }
                    // let dist = distFromUser(p.lat,p.long).toFixed(2);
                    temp.push(<ProblemBox key={p.ticket_id} name={desc} onClick={() => setSelectedHandler(p)}/>);
                }
            });
            setList(temp);
            setLoading(false);
        }
        generateList();
    },[searchQuery, searchConstraint.length]);

    const notFoundUI = <div className="flex w-full items-center justify-center"><p className="text-xs font-light text-black">ไม่พบปัญหา</p></div>;
    const skeletonUI = <><div className="flex flex-row w-full h-16 bg-white rounded-lg items-center justify-center p-2 gap-3 animate-pulse">
        <p className="text-xs text-gray-400">กำลังโหลด...</p>
        </div><div className="flex flex-row w-full h-16 bg-white rounded-lg items-center justify-center p-2 gap-3 animate-pulse">
            <p className="text-xs text-gray-400">กำลังโหลด...</p>
        </div></>;
    
    return (
        <>
            <div className="flex flex-row flex-wrap mt-1 w-80 h-fit max-h-56 overflow-y-scroll bg-white rounded-lg bg-opacity-60 p-3 gap-2 shadow-md">
                {list}
                {(!loading && list.length == 0) ? notFoundUI : null}
                {(loading) ? skeletonUI : null}
            </div>
        </>




    );

}
export default ProblemContainer;
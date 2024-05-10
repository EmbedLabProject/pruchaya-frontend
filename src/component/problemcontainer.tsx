import { getAllProblems } from "@/script/main";
import ProblemBox from "./problembox";
import { useEffect, useState } from "react";

function ProblemContainer(props: any) {

    const {searchQuery, searchConstraint} = props;

    const [list, setList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);



    const checkConstraint = function(desc: string) {
        let result = true;
        searchConstraint.forEach(((element: { [x: string]: (arg0: string) => any; }) => {
            result = result && element["function"](desc);
        }));
        return result;
    };

    function checkMatchQuery(problem: any){
        if (problem.description.includes(searchQuery) && checkConstraint(problem.description)){
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
                    temp.push(<ProblemBox key={p.ticket_id} name={desc} dist="??"/>);
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
            <div className="flex flex-row flex-wrap mt-1 w-80 h-fit max-h-56 overflow-y-scroll bg-white rounded-lg bg-opacity-60 p-3 gap-2">
                {list}
                {(!loading && list.length == 0) ? notFoundUI : null}
                {(loading) ? skeletonUI : null}
            </div>
        </>




    );

}
export default ProblemContainer;
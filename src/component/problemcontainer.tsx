import { getAllProblems } from "@/script/main";
import ProblemBox from "./problembox";
import { useEffect, useState } from "react";

function ProblemContainer(props: any) {

    const {searchQuery, searchConstraint} = props;

    const [list, setList] = useState<any[]>([]);


    const checkConstraint = function(desc: string) {
        let result = true;
        searchConstraint.forEach(((element: { [x: string]: (arg0: string) => any; }) => {
            result = result && element["function"](desc);
        }));
        return result;
    };

    function checkMatchQuery(problem: any){
        if (problem.description.includes(searchQuery) && checkConstraint(problem.description)){
            let desc = problem.description;
            if (desc.length > 25) {
                desc = desc.substring(0, 25) + "...";
              }
            return <ProblemBox key={problem.ticket_id} name={desc} dist="??"/>;
        }
        else {
            return null;
        }
    }


    useEffect(() => {
        async function generateList(){
            const probs: any[] = await getAllProblems();
            const temp: any[] = probs.map(p => checkMatchQuery(p));
            setList(temp);
        }
        generateList();
    },[searchQuery, searchConstraint.length]);

    
    return (
        <>
            <div className="flex flex-row flex-wrap mt-1 w-80 h-fit max-h-56 overflow-y-scroll bg-white rounded-lg bg-opacity-60 p-3 gap-2">
                {list}
                {/* <div className="flex flex-row w-full h-16 bg-white rounded-lg items-center justify-center p-2 gap-3 animate-pulse">
                    <p className="text-xs text-gray-400">กำลังโหลด...</p>
                </div> */}
            </div>
        </>




    );

}
export default ProblemContainer;
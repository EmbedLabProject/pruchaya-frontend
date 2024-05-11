function ProblemBox(props: any){

    const {name, dist, onClick} = props;

    return (

        <button onClick={onClick} className="flex flex-row w-full h-16 bg-white rounded-lg items-center justify-start p-2 gap-3">
            <div className="w-12 h-12 rounded-full bg-gray-600"></div>
            <div className="flex flex-col items-start">
                <p className="text-sm text-black font-medium">{name}</p>
                <p className="text-xs font-light text-black">{dist} กิโลเมตร</p>
            </div>
        </button>

    );

}

export default ProblemBox;
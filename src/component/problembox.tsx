function ProblemBox(props: any){

    const {name, dist} = props;

    return (

        <div className="flex flex-row w-full h-16 bg-white rounded-lg items-center justify-start p-2 gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-600"></div>
                    <div className="flex flex-col">
                    <p className="text-sm text-black font-medium">{name}</p>
                    <p className="text-xs font-light text-black">{dist} กิโลเมตร</p>
                    </div>
        </div>

    );

}

export default ProblemBox;
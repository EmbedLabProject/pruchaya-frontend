function FAQsButton(props: any){

    const {selected, text, setState, rem, add, constraint} = props;
    

    if (selected){
        const handler = function(){
            setState(false);
            rem(text);
        }
        return (
            <button onClick={() => handler()} className="flex flex-col w-fit h-fit px-3 py-1 rounded-xl bg-slate-600  text-white shadow-md justify-center items-center font-light">
                <p className="text-xs">{text}</p>
            </button>
        );

    }
    else {
        const handler = function(){
            setState(true);
            add(text, constraint);
        }

        return (
            <button onClick={() => handler()} className="flex flex-col w-fit h-fit px-3 py-1 rounded-xl bg-white text-black shadow-md justify-center items-center font-light">
                <p className="text-xs">{text}</p>
            </button>
        );
    }



};

export default FAQsButton;



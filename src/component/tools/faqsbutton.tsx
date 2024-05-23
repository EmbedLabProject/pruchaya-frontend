function FAQsButton(props: any){

    const {text, setText, question, value, onClick} = props;
    
    // const handler = function(){
    //     setText(text+question);
    // }
    return (
        <button onClick={() => onClick()} className="flex flex-col w-fit h-fit px-3 py-1 rounded-xl bg-white text-black hover:bg-gray-600 hover:text-white shadow-md justify-center items-center font-light">
            <p className="text-xs">{value}</p>
        </button>
    );
};

export default FAQsButton;



function FAQsButton(props: any){

    const {text, setText, name} = props;
    
    const handler = function(){
        setText(text+name);
    }
    return (
        <button onClick={() => handler()} className="flex flex-col w-fit h-fit px-3 py-1 rounded-xl bg-white  text-black shadow-md justify-center items-center font-light">
            <p className="text-xs">{name}</p>
        </button>
    );
};

export default FAQsButton;



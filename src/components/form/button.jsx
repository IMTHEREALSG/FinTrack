

const button = ({disabled,type,onclick,title,test})=>{
    return(
        <button 
            disabled={disabled}
            type={type}
            onClick={onclick}
            title={title}
            className="w-full max-w-[300px] h-[46px] rounded-xl border-none cursor-pointer text-white font-medium text-base leading-5 
                       bg-gradient-to-r from-[#1cac70] to-[#eddc46] shadow-lg shadow-[rgba(141,199,90,0.16)] 
                       transition-opacity duration-300 ease-in-out 
                       hover:opacity-70 active:opacity-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
            <div>{title}</div>
        </button>
    )
}

export default button;
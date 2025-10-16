const SendButton = ({ text, onClick, className, ...otherProps }) => {
    return (
        <button
            className={`uppercase ${className}  md:px-[120px] text-center cursor-pointer py-3.5 bg-blue 
            border w-full
            hover:border-darkblue hover:bg-white hover:text-darkblue
            active:bg-foreground active:border-foreground active:text-white
            
                text-white rounded-sm shadow-lg text-xs font-regular tracking-[6.5px] 
                font-syncopate
            }`}
            onClick={onClick}
            {...otherProps}
            >
            {text}
        </button>
    );
  };
  
  export default SendButton;
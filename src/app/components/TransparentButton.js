const TransparentButton = ({ text, onClick, className, ...otherProps }) => {
    return (
        <button
            className={`uppercase ${className}  w-max mt-6 md:px-[120px] text-center cursor-pointer py-3.5 bg-transparent 
             border-darkblue border 
             hover:border-0 hover:bg-darkblue hover:text-white
             active:bg-darkblue active:text-white active:border-darkblue
                text-darkblue rounded-sm shadow-lg text-sm font-regular tracking-[6.5px] 
                font-syncopate
            }`}
            onClick={onClick}
            {...otherProps}
            >
            {text}
        </button>
    );
  };
  
  export default TransparentButton;
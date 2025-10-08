const ActionButton = ({ text, onClick, className, ...otherProps }) => {
    return (
        <button
            className={`uppercase ${className}  w-max md:px-[120px] text-center cursor-pointer py-3.5 bg-blue 
             hover:border-white border-0 hover:border 
             active:bg-white active:text-blue active:border-darkblue
            left-1/2 absolute -translate-x-1/2 -translate-y-1/2 
                text-white rounded-sm shadow-lg text-sm font-regular tracking-[6.5px] 
                font-syncopate
            }`}
            onClick={onClick}
            {...otherProps}
            >
            {text}
        </button>
    );
  };
  
  export default ActionButton;
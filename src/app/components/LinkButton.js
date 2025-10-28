const LinkButton = ({ text, href, showButton, className, onClick, ...otherProps }) => {
    return (
        <a
            className={`uppercase w-max px-[48px] md:px-[120px] text-center cursor-pointer 
                py-2 md:py-3.5 bg-blue 
             hover:border-white border-0 hover:border 
             md:active:bg-white md:active:text-blue md:active:border-darkblue
             active:bg-foreground active:text-white active:border-foreground
            left-1/2 absolute -translate-x-1/2 -translate-y-1/2 
                text-white rounded-sm shadow-lg text-sm font-regular tracking-[6.5px] 
                ${className}
                font-syncopate ${showButton ? 'opacity-100' : 'opacity-0'
            }`}
            href={href}
            onClick={onClick}
            {...otherProps}
            >
            {text}
        </a>
    );
  };
  
  export default LinkButton;
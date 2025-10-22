const LinkButton = ({ text, href, showButton, className, ...otherProps }) => {
    return (
        <a
            className={`uppercase w-max px-[48px] md:px-[120px] text-center cursor-pointer 
                py-2 md:py-3.5 bg-blue 
             hover:border-white border-0 hover:border 
             active:bg-white active:text-blue active:border-darkblue
            left-1/2 absolute -translate-x-1/2 -translate-y-1/2 
                text-white rounded-sm shadow-lg text-sm font-regular tracking-[6.5px] 
                ${className}
                font-syncopate ${showButton ? 'opacity-100' : 'opacity-0'
            }`}
            href={href}
            {...otherProps}
            onClick={(e) => {
            e.preventDefault();
            document.getElementById(href)?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            }}>
            {text}
        </a>
    );
  };
  
  export default LinkButton;
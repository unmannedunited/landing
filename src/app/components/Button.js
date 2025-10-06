const Button = ({ text, href, showButton, className }) => {
    return (
        <a
            className={` ${className} uppercase md:px-24 px-4 w-[70%] text-center md:w-fit cursor-pointer py-3 bg-blue transition-all left-1/2 absolute -translate-x-1/2 -translate-y-1/2 hover:bg-foreground text-white rounded-sm shadow-lg text-sm font-regular tracking-[6.5px] font-syncopate ${showButton ? 'opacity-100' : 'opacity-0'
            }`}
            href={href}
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
  
  export default Button;
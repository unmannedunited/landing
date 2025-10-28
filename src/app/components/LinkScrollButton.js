import Button from "./LinkButton";

const LinkScrollButton = ({ text, href, onClick }) => {
  return (
    <div className="w-full relative" style={{ zIndex: 2500 }}>
          <Button text={text} href={href} showButton={true} className="cursor-pointer" onClick={onClick} />

        </div>
  );
};

export default LinkScrollButton;
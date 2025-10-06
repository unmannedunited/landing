import Button from "./Button";

const LinkScrollButton = ({ text, href, showButton }) => {
  return (
    <div className="w-full relative" style={{ zIndex: 1000 }}>
          <Button text={text} href={href} showButton={showButton} />

        </div>
  );
};

export default LinkScrollButton;
import React from "react";

const CustomButton = ({ btnType, title, handleClick }) => {
  return (
    <div className="contact_button">
      <button onClick={handleClick} className="first_button" type={btnType}>
        {title}
      </button>
    </div>
  );
};

export default CustomButton;

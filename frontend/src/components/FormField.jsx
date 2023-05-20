import React from "react";

const FormField = ({
  labelName,
  placeholder,
  inputType,
  isTextArea,
  value,
  handleChange,
}) => {
  return (
    <label style={{ display: "flex", width: "100%", flexDirection: "column" }}>
      {labelName && (
        <span
          style={{
            fontSize: "14px",
            color: "#808191",
            marginBottom: "10px",
            fontWeight: "bold",
          }}
        >
          {labelName}
        </span>
      )}
      {isTextArea ? (
        <textarea
          required
          value={value}
          onChange={handleChange}
          rows={10}
          placeholder={placeholder}
          style={{
            paddingRight: "15px",
            paddingLeft: "25px",
            outline: "none",
            border: "1px solid #3a3a43",
            background: "transparent",
            color: "#000",
            borderRadius: "10px",
            minWidth: "300px",
            fontSize: "14px",
          }}
          //   className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      ) : (
        <input
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          style={{
            paddingRight: "15px",
            paddingLeft: "25px",
            outline: "none",
            border: "1px solid #3a3a43",
            background: "transparent",
            color: "#000",
            borderRadius: "10px",
            minWidth: "300px",
            width: "100%",
            fontSize: "14px",
            marginRight: "30px",
          }}
          //   className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      )}
    </label>
  );
};

export default FormField;

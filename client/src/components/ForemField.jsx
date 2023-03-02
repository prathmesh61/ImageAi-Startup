import React from "react";
// import preview from "../assets/preview.png";

const ForemField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        {/* Form Field Component Accpect Props */}

        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900"
        >
          {labelName}
          {isSurpriseMe && (
            <button
              type="button"
              onClick={handleSurpriseMe}
              className="font-semibold bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black"
            >
              Surprise Me
            </button>
          )}
        </label>
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className="bg-gray-50 border-gray-300 text-sm rounded-lg text-gray-900 focus:ring-[#4649ff] outline-none block w-full p-3"
      />
    </div>
  );
};

export default ForemField;

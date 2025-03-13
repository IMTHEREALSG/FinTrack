import { useEffect, useState } from "react";
import closeIcon from "../../assets/input-close.svg";

const Input = ({
  value,
  label,
  inputRef,
  name,
  type,
  onChange = () => {},
  error,
  description,
  maxLength,
  placeholder,
  id,
}) => {
  const [isFilled, setIsFilled] = useState(false);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    setIsFilled(!!value);
  }, [value]);

  const handleClearInput = () => {
    onChange("");
    setIsFilled(false);
  };

  const handleFocus = () => setFocus(true);
  const handleBlur = () => setFocus(false);
  const handleChange = (e) => {
    onChange(e.target.value);
    setIsFilled(!!e.target.value);
  };


  return (
    <div className="relative w-full max-w-[300px]">
      <label className="relative flex h-[46px] w-full min-w-[200px] max-w-[300px] items-center overflow-hidden rounded-xl border border-gray-300 bg-gray-100 px-3 transition-all duration-150 ease-in-out focus-within:border-green-600 hover:border-green-600">
        <input
          type={type}
          value={value}
          name={name}
          id={name}
          ref={inputRef}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          maxLength={maxLength}
          className={`w-full bg-transparent p-2 pt-4 text-sm text-black outline-none
            ${error ? "border-red-500" : ""}
          `}
        />
        {label && 
 label && !(focus || isFilled) && (
  <span
    className="absolute left-1/2 top-3 -translate-x-1/2 text-base font-medium text-gray-500 transition-all duration-150 ease-in-out"
  >
    {label}
  </span>
        )}
        {isFilled && (
          <span
            className="absolute right-3 top-3 cursor-pointer"
            onClick={handleClearInput}
          >
            <img 
  src={closeIcon} 
  className="h-6 w-6 rotate-45" 
  alt="Clear input"
/>
          </span>
        )}
      </label>
      {description && <div className="mt-1 text-xs text-gray-500">{description}</div>}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;

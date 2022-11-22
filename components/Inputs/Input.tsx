import React, { ComponentProps, forwardRef } from "react";

interface InputProps extends ComponentProps<"input"> {
  label: string;
  errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ errorMessage, label, ...props }: InputProps, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label htmlFor="">{label}</label>
          <p>{errorMessage}</p>
        </div>
        <input className="border border-gray-400 py-2 px-2 rounded" ref={ref} {...props} />
      </div>
    );
  }
);

export default Input;

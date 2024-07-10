// Assuming this is the content of LogInInputFields.tsx
import React from "react";
import { InputText } from "primereact/inputtext";

interface InputFieldProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  label: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  value,
  onChange,
  type = "text",
  label,
}) => (
  <div className="p-float-label w-full">
    <InputText
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
    />
    <label htmlFor={id}>{label}</label>
  </div>
);

// Export the component as default
export default InputField;

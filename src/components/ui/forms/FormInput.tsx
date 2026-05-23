type FormInputProps = {
    type?: string;
    placeholder?: string;
  };
  
  export default function FormInput({
    type = "text",
    placeholder,
  }: FormInputProps) {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className="h-12 rounded-2xl border border-slate-300 bg-slate-50 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />
    );
  }
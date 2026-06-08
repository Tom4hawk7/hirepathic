type FormTextareaProps = {
    placeholder?: string;
    name?: string;
  };
  
  export default function FormTextarea({ placeholder, name }: FormTextareaProps) {
    return (
      <textarea
        placeholder={placeholder}
        name={name}
        className="min-h-28 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />
    );
  }
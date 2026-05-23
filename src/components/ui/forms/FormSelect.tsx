type FormSelectProps = {
    options: string[];
  };
  
  export default function FormSelect({ options }: FormSelectProps) {
    return (
      <select className="h-12 rounded-2xl border border-slate-300 bg-slate-50 px-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    );
  }
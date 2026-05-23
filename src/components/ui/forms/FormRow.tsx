type FormRowProps = {
    label: string;
    children: React.ReactNode;
    smallLabel?: boolean;
  };
  
  export default function FormRow({
    label,
    children,
    smallLabel = false,
  }: FormRowProps) {
    return (
      <div className="grid grid-cols-[280px_1fr] items-center gap-8">
        <label
          className={
            smallLabel
              ? "text-xl font-semibold text-slate-800"
              : "text-2xl font-semibold text-slate-800"
          }
        >
          {label}
        </label>
  
        {children}
      </div>
    );
  }
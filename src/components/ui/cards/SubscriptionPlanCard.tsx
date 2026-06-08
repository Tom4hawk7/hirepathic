import { MouseEventHandler, SubmitEventHandler } from "react";

type SubscriptionPlanCardProps = {
    title: string;
    price: string;
    description: string;
    features: string[];
    buttonText: string;
    highlighted?: boolean;
    onSubmit?: SubmitEventHandler<HTMLInputElement>;
  };
  
  export default function SubscriptionPlanCard({
    title,
    price,
    description,
    features,
    buttonText,
    highlighted = false,
    onSubmit
  }: SubscriptionPlanCardProps) {
    return (
      <div
        className={
          highlighted
            ? "rounded-3xl border-2 border-indigo-500 bg-indigo-50 p-8 shadow-lg"
            : "rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
        }
      >
        <p
          className={
            highlighted
              ? "text-sm font-semibold uppercase tracking-wide text-indigo-700"
              : "text-sm font-semibold uppercase tracking-wide text-slate-500"
          }
        >
          {highlighted ? "Recommended" : "Current option"}
        </p>
  
        <h2 className="mt-3 text-3xl font-bold text-slate-950">{title}</h2>
  
        <p className="mt-2 text-4xl font-bold text-slate-950">{price}</p>
  
        <p className="mt-4 leading-7 text-slate-600">{description}</p>
  
        <ul className="mt-6 space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex gap-3 text-slate-700">
              <span className="font-bold text-indigo-600">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <input 
          type="submit" 
          value={buttonText}
          onSubmit={onSubmit}
          className={
            highlighted
              ? "mt-8 w-full rounded-2xl bg-indigo-600 px-6 py-4 font-semibold text-white shadow-sm transition hover:bg-indigo-700"
              : "mt-8 w-full rounded-2xl border border-slate-300 bg-white px-6 py-4 font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
          }
        />

      </div>
    );
  }
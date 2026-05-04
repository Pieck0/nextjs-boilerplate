export default function Input({
  inputProps,
  errorMessage,
  label,
}: {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  errorMessage?: string;
  label?: string;
}) {
  return (
    <div className="relative flex mt-8">
      <input
        type="text"
        placeholder="f"
        className="z-70 peer focus:outline-none text-lg placeholder:text-transparent border-b px-1 border-amber-600 w-full"
        {...inputProps}
      />
      {label && (
        <p className="z-60 transition-all text-slate-400 duration-300 ease-in-out absolute pl-1 peer-focus:text-sm not-peer-placeholder-shown:text-sm peer-focus:-translate-y-4 not-peer-placeholder-shown:-translate-y-4 peer-focus:text-amber-700 not-peer-placeholder-shown:text-amber-700">
          {label}
        </p>
      )}
      <p className={`text-red-600 absolute translate-y-7 pl-1 text-sm`}>
        {errorMessage}
      </p>
    </div>
  );
}

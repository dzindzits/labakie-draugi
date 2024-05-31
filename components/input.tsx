type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
  };

export default function Input({ label, ...props }: InputProps) {
    return (
        <label className="flex flex-col gap-1 text-sm">{label}
            <input className="h-[48px] rounded-md border-[1px] border-black text-gray-950 bg-[#D9D9D9]/[.25] px-2 read-only:opacity-50" {...props} />
        </label>
    )
}
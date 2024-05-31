import React from "react";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
    label?: string;
    children?: React.ReactNode;
  };

export default function Select({ label, children, ...props }: SelectProps) {
    return (
        <label className="flex flex-col gap-1 text-sm">{label}
            <select className="h-[48px] rounded-md border-[1px] border-black text-gray-950 bg-[#D9D9D9]/[.25] px-2" {...props}>
                {children}
            </select>
        </label>
    )
}
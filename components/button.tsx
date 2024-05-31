type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    title?: string;
  };

export default function Button({ title, ...props }: ButtonProps) {
    return (
        <button className="flex justify-center items-center h-[48px] rounded-md bg-[#3F9E36] font-semibold text-base w-full text-white" {...props}>{title}</button>
    )
}
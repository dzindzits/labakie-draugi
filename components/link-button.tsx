import Link, { LinkProps } from "next/link";

type LinkButtonProps = LinkProps & {
    title?: string;
  };

export default function LinkButton({ title, ...props }: LinkButtonProps) {
    return (
        <Link className="flex justify-center items-center h-[48px] rounded-md bg-[#3F9E36] font-semibold text-base text-white" {...props}>{title}</Link>
    )
}
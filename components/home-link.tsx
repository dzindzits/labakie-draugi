'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HomeLink() {
    const pathname = usePathname()
    
    return (
        (pathname === '/' || pathname === '/auth') ? null : <Link className="text-xs underline" href={'/'}>Atpakaļ</Link>
    )
}
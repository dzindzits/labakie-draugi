import { Product as ProductProps } from "@/db";
import Link from "next/link";

export default function Product({ name, article, weight, location, quantity }: ProductProps) {
    return (
        <article className="relative rounded-md bg-[#D9D9D9] p-2">
            <h3 className="font-medium text-sm">{name}</h3>
            <div className="attributes flex flex-row gap-1.5">
                <p className="text-xs pr-1.5 border-r border-black last-of-type:border-0">Atlikums: {quantity}</p>
                <p className="text-xs pr-1.5 border-r border-black last-of-type:border-0">Artikula Nr.: {article}</p>
                <p className="text-xs pr-1.5 border-r border-black last-of-type:border-0">Svars: {weight}</p>
            </div>
            <div className="attributes flex flex-row gap-1.5">
                <p className="text-xs pr-1.5 border-r border-black last-of-type:border-0">Atrašanās vieta: {location}</p>
            </div>
            <Link className="absolute text-xs underline right-2 bottom-2" href={`/product/edit?article=${article}`}>Rediģēt</Link>
        </article>
    )
}
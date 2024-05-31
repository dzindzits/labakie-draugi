import Button from "@/components/button";
import Input from "@/components/input";
import ProductComponent from "@/components/product";
import executeQuery, { Product, searchByArticleQuery } from "@/db";
import { redirect } from "next/navigation";

export default async function Inventorization({searchParams} : {searchParams: any}) {
    const {article, qty} = searchParams;
    const results = article ? await executeQuery<Product[]>(searchByArticleQuery(article)) : [];

    const difference = (results?.[0]?.quantity || 0) - parseInt(qty)


    async function searchProduct(formData: FormData) {
        'use server'
        redirect(`?article=${formData.get('article')}&qty=${formData.get('qty')}`);
    }

    return (
        <section className="flex flex-col gap-4">
            <h1>Inventarizācija</h1>
            <form action={searchProduct}>
                <Input label="Artikula nr." name="article" type="text" />
                <Input label="Daudzums" name="qty" type="number" />
                <Button title='Uzsākt' type='submit' />
            </form>
            {results?.length && qty ? <>
                <p className="text-sm">Skaita atšķirība: par {difference.toString().replace('-', '')} {difference > 0 ? 'mazāk' : 'vairāk'} nekā datu bāzē</p>
                <p className="text-sm">Faktiskais skaits: {results[0]?.quantity}</p>
                <p className="text-sm">Fiziskais skaits: {qty}</p>
                <ProductComponent {...results[0]} />
            </> : null}
        </section>
       
    );
}

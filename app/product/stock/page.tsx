import Button from "@/components/button";
import Input from "@/components/input";
import ProductComponent from "@/components/product";
import executeQuery, { Product, searchByArticleQuery } from "@/db";
import { redirect } from "next/navigation";

export default async function Stock({searchParams} : {searchParams: any}) {
    const article = searchParams.article;
    const result = article ? await executeQuery<Product[]>(searchByArticleQuery(article)) : [];

    async function getStock(formData: FormData) {
        'use server'
        redirect(`?article=${formData.get('article')}`);
    }

    return (
        <section className="flex flex-col gap-4">
            <h1>Atlikuma pārbaude</h1>
            <form action={getStock}>
                <Input label="Artikula nr." name="article" type="text" />
                <Button title='Uzsākt' type='submit' />
            </form>
            {result?.length && <ProductComponent {...result?.[0]}/>}
        </section>
       
    );
}

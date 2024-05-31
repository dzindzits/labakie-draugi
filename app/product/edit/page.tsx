import Button from "@/components/button";
import Input from "@/components/input";
import ProductComponent from "@/components/product";
import executeQuery, { Product, editQuery, searchByArticleQuery } from "@/db";
import { redirect } from "next/navigation";

export default async function Edit({searchParams} : {searchParams: any}) {
    const {success, article} = searchParams;

    const result = article ? await executeQuery<Product[]>(searchByArticleQuery(article)) : [];

    async function editProduct(formData: FormData) {
        'use server'
        await executeQuery(editQuery(formData));
        redirect(`?success=true&article=${formData.get('article')}`)
    }

    return (
        <section className="flex flex-col gap-4">
            <h1>Preces rediģēšana</h1>
            {result?.length && <form action={editProduct}>
                <Input label="Nosaukums" name="name" type="text" defaultValue={result[0].name} />
                <Input label="Artikula Nr." name="article" type="text" defaultValue={result[0].article} readOnly />
                <Input label="Svars" name="weight" type="number" defaultValue={result[0].weight} />
                <Input label="Atrašanās vieta" name="location" type="text" defaultValue={result[0].location} />
                <Input label="Daudzums" name="quantity" type="number" defaultValue={result[0].quantity} />
                <Button title='Saglabāt' type='submit' />
            </form>}
            {success && result?.length ? 
                <>
                    <ProductComponent {...result?.[0]}/>
                    <p className="text-sm">Prece veiksmīgi rediģēta</p>
                </>
             : null}
        </section>  
    );
}

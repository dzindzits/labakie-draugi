import Button from "@/components/button";
import Input from "@/components/input";
import ProductComponent from "@/components/product";
import executeQuery, { Product, registerQuery, searchByArticleQuery } from "@/db";
import { redirect } from "next/navigation";

export default async function Register({searchParams} : {searchParams: any}) {
    const {success, article} = searchParams;

    const result = success ? await executeQuery<Product[]>(searchByArticleQuery(article)) : undefined;

    async function registerProduct(formData: FormData) {
        'use server'
        await executeQuery(registerQuery(formData));
        redirect(`?success=true&article=${formData.get('article')}`)
    }

    return (
        <section className="flex flex-col gap-4">
            <h1>Preces reģistrēšana</h1>
            <form action={registerProduct}>
                <Input label="Nosaukums" name="name" type="text" />
                <Input label="Artikula Nr." name="article" type="text" />
                <Input label="Svars" name="weight" type="number" />
                <Input label="Atrašanās vieta" name="location" type="text" />
                <Input label="Daudzums" name="quantity" type="number" />
                <Button title='Pievienot' type='submit' />
            </form>
            {result &&
                <>
                    <ProductComponent {...result?.[0]}/>
                    <p className="text-sm">Prece veiksmīgi reģistrēta</p>
                </>
            }
        </section>  
    );
}

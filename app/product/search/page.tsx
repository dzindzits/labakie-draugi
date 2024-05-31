import Button from "@/components/button";
import Input from "@/components/input";
import ProductComponent from "@/components/product";
import executeQuery, { Product, searchQuery } from "@/db";
import { redirect } from "next/navigation";

export default async function Search({searchParams} : {searchParams: any}) {
    const query = searchParams.query;
    const results = query ? await executeQuery<Product[]>(searchQuery(query)) : [];

    async function searchProduct(formData: FormData) {
        'use server'
        redirect(`?query=${formData.get('search')}`);
    }

    return (
        <section className="flex flex-col gap-4">
            <h1>Preču meklēšana</h1>
            <form action={searchProduct}>
                <Input label="Nosaukums vai artikula nr." name="search" type="search" />
                <Button title='Meklēt' type='submit' />
            </form>
            <section className="flex flex-col gap-3">
                {query && <h2 className="text-sm">Rezultāti "{query}" ({results?.length}):</h2>}
                <ul className="flex flex-col gap-2">
                    {results?.map((product) => <ProductComponent key={product.article} {...product}/>)}
                </ul>
            </section>
        </section>
    );
}

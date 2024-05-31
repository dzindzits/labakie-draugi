import { addProduct, emptyOrder } from "@/actions";
import Button from "@/components/button";
import OrderProducts from "./products";
import { redirect } from "next/navigation";
import Input from "@/components/input";
import Select from "@/components/select";

export default async function Order({searchParams} : {searchParams: any}) {
    const {sortBy, direction, success} = searchParams;

    async function sortOrder(formData: FormData) {
        'use server'
        redirect(`?sortBy=${formData.get('sortBy')}&direction=${formData.get('direction')}`);
    }

    async function order() {
        'use server'
        await emptyOrder();
        redirect(`?success=true`);
    }

    return (
        <section className="flex flex-col gap-4">
            <h1>Pasūtījuma komplektēšana</h1>
            {Boolean(success) ? <p className="text-sm">Pasūtījums komplektēts</p> : <>
                <form action={addProduct}>
                    <Input label="Artikula nr." name="article" type="text" />
                    <Button title='Pievienot' type='submit' />
                </form>
                <form action={sortOrder}>
                    <Select label="Kārtot pēc" name="sortBy">
                        <option value="name">Nosaukums</option>
                        <option value="article">Artikula Nr.</option>
                        <option value="weight">Svars</option>
                    </Select>
                    <Select label="Kārtošanas veids" name="direction">
                        <option value="asc">Augošs</option>
                        <option value="dsc">Dilstošs</option>
                    </Select>
                    <Button title='Sakārtot' type='submit' />
                </form>
                <OrderProducts sortBy={sortBy} direction={direction} />
                <form action={order}>
                    <Input label="Vārds" name="first-name" type="text" />
                    <Input label="Uzvārds" name="last-name" type="text" />
                    <Button title='Komplektēt' type='submit' />
                </form>
            </> 
            }
        </section>
       
    );
}

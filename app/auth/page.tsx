import { login } from "@/auth";
import Button from "@/components/button";
import Input from "@/components/input";
import { redirect } from "next/navigation";

export default function Auth() {
    async function loginUser(formData: FormData) {
        'use server'
        await login(formData);
        redirect("/");
    }

    return (
        <form action={loginUser}>
            <Input label="Lietotājvārds" name="username" type="text" />
            <Input label="Parole" name="password" type="password" />
            <Button title='Pieslēgties' type='submit' />
        </form>
    );
}

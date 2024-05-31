import LinkButton from "@/components/link-button";

export default function Home() {
  return (
    <section className="flex flex-col gap-4">
        <LinkButton title="Preču meklēšana" href='/product/search' />
        <LinkButton title="Inventarizācija" href={'/inventorization'} />
        <LinkButton title="Atlikuma pārbaude" href={'/product/stock'} />
        <LinkButton title="Preces reģistrēšana" href={'/product/register'} />
        <LinkButton title="Pasūtījuma komplektēšana" href={'/order'} />
    </section>
  );
}

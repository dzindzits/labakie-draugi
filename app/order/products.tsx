import { Product } from "@/db";
import ProductComponent from "@/components/product";
import { cookies } from "next/headers";

export default async function OrderProducts({sortBy, direction}: {sortBy: 'name' | 'article' | 'weight', direction: string }) {
    const orderCookie = cookies().get("order");
    const order: Product[] = JSON.parse(orderCookie?.value || '[]')

    order.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) {
            return direction === 'asc' ? -1 : 1;
        }
        if (a[sortBy] > b[sortBy]) {
            return direction === 'asc' ? 1 : -1;
        }
      
        return 0;
      }
    );

    return (
        <ul className="empty:hidden flex flex-col gap-2">
            {order.map((product) => (
                <ProductComponent key={product.article} {...product} />
            ))}
        </ul>
    );
}
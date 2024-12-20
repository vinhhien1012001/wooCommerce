import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const res = await fetch(`${process.env.API_URL}/products`, {
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
      ).toString("base64")}`,
    },
  });

  const data = await res.json();
  console.log(data);

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <h1>Samsung Store</h1>

      <div className="grid grid-cols-6 gap-[30px] mt-3  p-5">
        {data.map((product: any) => {
          return (
            <div key={product.id}>
              <Link
                className="products w-full flex flex-col product"
                href={`/products/${product.slug}`}
                key={product.id}
              >
                <Image
                  width={160}
                  height={160}
                  src={product.images[0].src}
                  // src=""
                  alt={product.name}
                  className="w-full mx-auto"
                />
                {product.on_sale ? (
                  <div className="flex gap-2 p-1 text-md">
                    <p className="font-bold text-[#007cba]">
                      $ {product.price}
                    </p>
                    <p className="sale_price relative text-[14px]">
                      $ {product.regular_price}
                    </p>
                  </div>
                ) : (
                  <p className="font-bold p-1">$ {product.price}</p>
                )}
                <p className="font-bold text-xs p-1">{product.name}</p>
              </Link>
              <button className="bg-black mt-3 text-white font-bold p-1 mx-auto flex items-center justify-center w-[50%] height-10">
                Add to cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

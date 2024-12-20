import Image from "next/image";

export default async function ProductPage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const { slug } = await params;
  console.log("SLUG", slug);

  const res = await fetch(`${process.env.API_URL}/products?slug=${slug}`, {
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.WC_CONSUMER_KEY}:${process.env.WC_CONSUMER_SECRET}`
      ).toString("base64")}`,
    },
  });

  const data = await res.json();
  console.log("DATA", data);

  console.log(data[0]?.description);

  return (
    <div className="max-w-[750px] mx-auto mt-[100px]">
      {/* Image */}
      <div className="pt-5 flex">
        <div className="w-[60%]">
          <h3 className="font-bold">{data[0].name}</h3>
          <Image
            src={data[0].images[0].src}
            alt="Product image"
            height={500}
            width={500}
            className="h-[300px] w-[300px]  "
          />
        </div>
        <div className="w-[40%] ml-5 mt-5 flex flex-col gap-5 text-sm text-gray-600">
          <div className="flex justify-between">
            <p>Price: </p>
            <p className="font-bold">$ {data[0].price}</p>
          </div>
          <div className="flex justify-between">
            <p>Ram: </p>
            <p className="font-bold">8 GB</p>
          </div>
          <div className="flex justify-between">
            <p>Internal memory </p>
            <p className="font-bold">256 GB</p>
          </div>
          <div className="flex justify-between">
            <p>Refresh rate</p>
            <p className="font-bold">120 Hz</p>
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="bg-gray-200 w-full h-[2px] "></div>
      <div
        className="w-full mt-5"
        dangerouslySetInnerHTML={{ __html: data[0]?.description }}
      />
    </div>
    /******  4189b41c-6ab9-4d60-83f9-134c7e1b8628  *******/
  );
}

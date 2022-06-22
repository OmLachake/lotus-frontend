import Head from "next/head";
import { useQuery } from "urql";
import ProductCard from "../components/Product/ProductCard";
import { PRODUCT_QUERY } from "../lib/query";
import "tw-elements";
import Header from "../components/Header";

export default function Home() {
  const [results] = useQuery({ query: PRODUCT_QUERY });
  const { data, fetching, error } = results;

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-[50vh] w-full">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600"
          role="status"
        >
          <span className="visually-hidden text-off-purple">Loading...</span>
        </div>
      </div>
    );
  }
  if (error) {
    return <h1>Error Loading Data</h1>;
  }

  const products = data?.products?.data;

  const renderProducts = () => {
    return;
  };

  return (
    <div className="">
      <Head>
        <title>My Shop</title>
        <meta
          name="description"
          content="Shop Clothing Online for best prices!"
        />
        <link rel="icon" href="/logoIcon.ico" />
      </Head>
      <main className="">
        <h1 className="text-5xl text-red font-bold font-josan">Hello</h1>

        <div className="productGrid">
          {products.map((product) => {
            const { title, slug, price } = product?.attributes;
            const image =
              product?.attributes?.images?.data[0]?.attributes?.formats?.small;

            return (
              <ProductCard
                key={slug}
                title={title}
                slug={slug}
                price={price}
                image={image}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}

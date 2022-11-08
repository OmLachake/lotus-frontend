import Head from "next/head";
import { useQuery } from "urql";
import ProductCard from "../components/Product/ProductCard";
import { PRODUCTS_QUERY } from "../lib/query";
import FullPageLoading from "../components/FullPageLoading";

export default function Home() {
  const [results] = useQuery({ query: PRODUCTS_QUERY });
  const { data, fetching, error } = results;

  if (fetching) {
    return <FullPageLoading />;
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
        <title>Lotus Wear : Fashion at affordable prices!</title>
        <meta
          name="description"
          content="Shop Clothing Online for best prices!"
        />
        <link rel="icon" href="/logoIcon.ico" />
      </Head>
      <main className="">
        <h1 className="text-3xl text-red font-bold font-josan px-6 sm:px-0">
          Browse All our Products!
        </h1>

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

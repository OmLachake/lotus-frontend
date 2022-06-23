import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "urql";
import FullPageLoading from "../../components/FullPageLoading";
import { GET_PRODUCT_QUERY } from "../../lib/query";

function ProductPage() {
  const router = useRouter();
  const slug = router.query?.slug;
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: `${slug}` },
  });
  const { data, fetching, error } = results;

  if (fetching) {
    return <FullPageLoading />;
  }
  if (error) {
    return <>Error</>;
  }

  // const { product } = data?.products?.data[0];

  const product = data?.products?.data[0]?.attributes;

  const imageUrls = product?.images?.data?.map((image) => {
    return image?.attributes?.formats?.large?.url;
  });
  console.log(`/products/${slug}Product Page`, product, imageUrls);

  return (
    <main>
      <div className="productDetails">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="" alt="" />
        <div>
          <h3>Title</h3>
          <p>Description</p>
        </div>

        <div>
          <span>Quantity</span>
          <button>PLUS</button>
          <p>0</p>
          <button>MINUS</button>
        </div>
        <button>Add To Card</button>
      </div>
    </main>
  );
}

export default ProductPage;

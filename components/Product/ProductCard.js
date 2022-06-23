import { useRouter } from "next/router";
import { useState } from "react";
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";

function ProductCard({ price, title, slug, image }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();
  return (
    <div
      className="productCard group cursor-pointer"
      onClick={() => {
        window.open("/products/" + slug, "_blank");
        // router.push("/product/" + slug);
      }}
    >
      <div className="overflow-hidden  mx-3 mt-3 rounded-t">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image?.url} alt={title} className="group-hover:scale-[1.1]" />
      </div>
      <div className="flex justify-between items-start my-4 px-4">
        <div>
          <h2 className="font-lato font-normal text-md mb-2 text-navy-blue">
            {title}
          </h2>
          <h3 className="font-bold">
            ₹. <span className="text-purple text-xl font-lato">{price}</span>
          </h3>
        </div>
        <div
          className={`${isFavorite ? "text-pink" : "text-black"} text-2xl p-2`}
          onClick={(event) => {
            event.stopPropagation();
            setIsFavorite((prevState) => !prevState);
          }}
        >
          {isFavorite ? <BsSuitHeartFill /> : <BsSuitHeart />}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

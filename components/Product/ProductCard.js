import Image from "next/image";

function ProductCard({ price, title, slug, image }) {
  return (
    <div>
      <div>
        <img src={image?.url} alt={title} />
      </div>
      <h2>{title} Title</h2>
      <h3 className="text-purple font-bold">{price}</h3>
    </div>
  );
}

export default ProductCard;

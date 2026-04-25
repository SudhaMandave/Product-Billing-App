import type { Product } from "../types/Product";
import { useDispatch } from "react-redux";
import { addProduct } from "../store/cartSlice";
import './ProductCard.css'

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="product-cart">
      <img
        src={`${product.image}=${product.name}`}
        alt={product.name}
        className="product-img"
      />
      <div className="product-details">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-price">{product.price.toFixed(2)}</p>
        <button
          onClick={() => dispatch(addProduct(product))}
          className="btn"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

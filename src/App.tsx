import ProductCard from "./components/ProductCard";
import CartSummary from "./components/CartSummary";
import { products } from "./data/products";
import "./App.css";
import { useState } from "react";

function App() {
  const [showBasket, setShowBasket] = useState(false);
  return (
    <>
      <div className="main-container">
        <div className="navbar">
          <h1 onClick={() => setShowBasket(false)}>Products</h1>
          <h1 onClick={() => setShowBasket(true)}>Basket</h1>
        </div>
        {!showBasket ? (
          <div className="cart-container">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <CartSummary />
        )}
      </div>
    </>
  );
}

export default App;

import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import './CartSummary.css';

const CartSummary: React.FC = () => {
  const { items, subtotal, offersApplied, finalTotal } = useSelector(
    (state: RootState) => state.cart
  );

  const totalSavings = offersApplied.reduce((sum, offer) => sum + offer.saving, 0); 

  return (
    <div className="main-cart-summary">
      <h2 className="cart-summary">Cart Summary</h2>
      <div className="basket-items">
        <h3>Products in Basket:</h3>
        {items.length === 0 ? (
          <p>No products added</p>
        ) : (
          <div>
            <ul>
              {items.map((item) => (
                <li key={item.id} className="basket-item">
                  <img src={item.image} alt={item.name} className="basket-item-image"/>
                  <span className="basket-item-text">
                    {item.name} * {item.quantity} =
                    {(item.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <p className="subtotal">Subtotal: {subtotal.toFixed(2)}</p>
      <div className="summary">
        <h3 className="offer-heading">Offers Applied:</h3>
        {offersApplied.length === 0 ? (
          <p className="offers-applied">No offers applied</p>
        ) : (
          <ul className="offers-desc">
            {offersApplied.map((offer, idx) => (
              <li key={idx}>
                {offer.description}: -{offer.saving.toFixed(2)}
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="total-savings">Total Savings: {totalSavings.toFixed(2)}</p>
      <p className="final-total">Final Total: {finalTotal.toFixed(2)}</p>
    </div>
  );
};

export default CartSummary;

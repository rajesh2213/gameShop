import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../components/context/CartContext";
import styles from "./Cart.module.css";

function Cart() {
  const { cartItem, updateCart, removeFromCart } = useContext(CartContext);
  const MAX_QUANTITY = 99;
  const [totalPriceBeforeDiscount, setTotalPriceBeforeDiscount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    const totalPriceBeforeDiscount = cartItem.reduce(
      (acc, item) => acc + item.priceBeforeDiscount * item.quantity,
      0
    );
    const subTotal = cartItem.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPriceBeforeDiscount(totalPriceBeforeDiscount.toFixed(2));
    setSubTotal(subTotal.toFixed(2));
  }, [cartItem]);

  const updateQuantity = (x, item) => {
    const newQty = parseInt(item.quantity, 10) + x;
    if (newQty >= 1 && newQty <= MAX_QUANTITY) {
      updateCart(item, newQty);
    }
  };

  if (!cartItem || cartItem.length === 0) return <p>No items in the cart</p>;

  return (
    <div className={styles["cart"]}>
      <div className={styles["item-section"]}>
        <h1>Shopping Cart</h1>
        {cartItem.map((item) => (
          <div className={styles["item-container"]} key={item.id}>
            <div className={styles["img-wrapper"]}>
              <img src={item.image} alt={item.title} />
            </div>
            <div className={styles["item-details"]}>
              <div className={styles["item-heading"]}>
                <h2>{item.title}</h2>
              </div>
              <div className={styles["item-price"]}>
                <p>{item.discount}</p>
                <p>{item.price}</p>
                <p>{item.priceBeforeDiscount}</p>
              </div>
            <div className={styles["item-setting"]}>
              <button
                onClick={() => updateQuantity(-1, item)}
                disabled={parseInt(item.quantity, 10) <= 1}
              >
                -
              </button>
              <input
                type="number"
                min="1"
                max={MAX_QUANTITY}
                value={item.quantity}
                onChange={(e) => {
                  const inputQty = parseInt(e.target.value, 10);
                  if (
                    !isNaN(inputQty) &&
                    inputQty >= 1 &&
                    inputQty <= MAX_QUANTITY
                  ) {
                    updateCart(item, inputQty);
                  }
                }}
              />
              <button
                onClick={() => updateQuantity(1, item)}
                disabled={parseInt(item.quantity, 10) >= MAX_QUANTITY}
              >
                +
              </button>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
            </div>

          </div>
        ))}
      </div>
      <div className={styles["price-section"]}>
        <h1>Price Details</h1>
        <div className={styles["price"]}>
          <p>{`Price (${cartItem.length} item)`}</p>
          <span>{totalPriceBeforeDiscount}</span>
        </div>
        <div className={styles["discount"]}>
          <p>Discount</p>
          <span>{(totalPriceBeforeDiscount - subTotal).toFixed(2)}</span>
        </div>
        <div className={styles["subtotal"]}>
          <h2>Total Amount</h2>
          <span>{subTotal}</span>
        </div>
      </div>
    </div>
  );
}

export default Cart;

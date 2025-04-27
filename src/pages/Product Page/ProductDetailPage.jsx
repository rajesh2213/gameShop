import { useContext, useMemo, useState, useRef } from "react";
import styles from "./ProductDetailsPage.module.css";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../components/context/ProductContext";
import { CartContext } from "../../components/context/CartContext";

import { transformProductData } from "../../helper/Helper";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  // Use string state for quantity so we can handle empty input
  const [quantity, setQuantity] = useState("1");
  const MAX_QUANTITY = 99;
  const inputRef = useRef(null);
  const { products, loading, error } = useContext(ProductContext);
  const { updateCart } = useContext(CartContext)

  const reqProduct = useMemo(() => {
    if (!productId || !products.length) return null;
    const foundProduct = products.find(
      (product) => product.game_info.id === parseInt(productId, 10)
    );
    return foundProduct ? transformProductData(foundProduct) : null;
  }, [productId, products]);

  const updateQuantity = (x) => {
    const currentQty = parseInt(quantity, 10) || 1;
    const newQty = currentQty + x;
    if (newQty >= 1 && newQty <= MAX_QUANTITY) {
      setQuantity(String(newQty));
    }
  };

  const handleAddToCart = () => {
    const numericQuantity = parseInt(quantity, 10);
    if (numericQuantity >= 1 && numericQuantity <= MAX_QUANTITY) {
      updateCart(reqProduct, numericQuantity);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching the products: {error}</p>;

  return (
    <div className={styles["product-details"]}>
      <div className={styles["left-container"]}>
        <div className={styles["img-slider"]}>
          <img src={reqProduct.image} alt={`${reqProduct.title} image`} />
        </div>
        <div className={styles["description-section"]}>
          <h2>Description</h2>
          <p>{reqProduct.description}</p>
        </div>
      </div>
      <div className={styles["right-container"]}>
        <div className={styles["title-section"]}>
          <h1>{reqProduct.title}</h1>
        </div>
        <div className={styles["price-qty-section"]}>
          <div className={styles["price-wrapper"]}>
            {reqProduct.discount !== 0 && (
              <>
                <p className={styles["discount"]}>{reqProduct.discount}</p>
                <p className={`${styles["price"]} ${styles["before"]}`}>
                  {reqProduct.priceBeforeDiscount}
                </p>
              </>
            )}
            <p className={"price"}>
              {reqProduct.price === 0 ? "Free to play" : reqProduct.price}
            </p>
          </div>
        </div>
        <div className={styles["quantity-section"]}>
          <button
            className={styles["btns-qty"]}
            onClick={() => updateQuantity(-1)}
            disabled={parseInt(quantity, 10) <= 1}
          >
            -
          </button>
          <input
            className={styles["qty-input"]}
            ref={inputRef}
            type="number"
            value={quantity}
            min="1"
            max={MAX_QUANTITY}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
            onBlur={() => {
              const numericValue = parseInt(quantity, 10);
              if (
                !isNaN(numericValue) &&
                numericValue >= 1 &&
                numericValue <= MAX_QUANTITY
              ) {
                inputRef.current.setCustomValidity("")
                setQuantity(String(numericValue));
              } else {
                if (numericValue < 1) {
                  alert("Quantity should be more than 0 :)");
                  inputRef.current.setCustomValidity(
                    "Quantity should be more than 0 :)"
                  );
                  inputRef.current.reportValidity();
                  setQuantity("1");
                }
                if (numericValue > MAX_QUANTITY) {
                  alert("Max Quantity is 99 :(");
                  inputRef.current.setCustomValidity("Max Quantity is 99 :(");
                  inputRef.current.reportValidity();
                  setQuantity(MAX_QUANTITY);
                }
                setQuantity("1");
                
              }
            }}
          />
          <button
            className={styles["btns-qty"]}
            onClick={() => updateQuantity(1)}
            disabled={parseInt(quantity, 10) >= MAX_QUANTITY}
          >
            +
          </button>
        </div>
        <div className={styles["btn-container"]}>
          <button onClick={handleAddToCart}>Add To Cart</button>
          <button>Add To Wishlist</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;

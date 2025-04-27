import { React, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./ProductCard.module.css";
import { Link } from "react-router-dom";

function ProductCard({
  id,
  title,
  priceBeforeDiscount,
  price,
  discount,
  image,
  platform,
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px",
      }
    );
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <Link to={`/product/${id}`}>
    <div className={styles["product-card"]} key={id}>
      <div className={styles["img-wrapper"]}>
        {isInView ? (
          <img
            src={image}
            alt={title}
            className={`${styles["product-image"]} ${
              isLoaded ? styles["loaded"] : ""
            }`}
            onLoad={() => setIsLoaded(true)}
          />
        ) : (
          <div ref={imgRef} className={styles["img-placeholder"]} />
        )}
      </div>
      <div className={styles["text-wrapper"]}>
        <ul className={styles["icon-wrapper"]}>
          {platform.length > 0 ? (
            platform.map(([name, icon], idx) => (
              <li key={idx} title={name}>
                <i className={`${icon} ${styles["platform-icon"]}`} />
              </li>
            ))
          ) : (
            <li className={styles["placeholder"]}>Somewhere lol</li>
          )}
        </ul>
        <h2>{title}</h2>
        <div className={styles["price-wrapper"]}>
          {discount != 0 && (
            <>
              <p className={styles["discount"]}>{discount}</p>
              <p className={`${styles["price"]} ${styles["before"]}`}>
                {priceBeforeDiscount}
              </p>
            </>
          )}
          <p className={"price"}>{price == 0 ? "Free to play" : price}</p>
        </div>
      </div>
    </div>
    </Link>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  priceBeforeDiscount: PropTypes.number,
  price: PropTypes.number,
  discount: PropTypes.number,
  image: PropTypes.string.isRequired,
  platform: PropTypes.arrayOf(PropTypes.array),
};

ProductCard.defaultProps = {
  title: "Unknown",
  priceBeforeDiscount: 0,
  price: 0,
  discount: 0,
  platform: [],
};

export default ProductCard;

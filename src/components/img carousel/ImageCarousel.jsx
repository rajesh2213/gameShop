import React, { useEffect, useRef, useState } from "react";
import styles from "./ImageCarousel.module.css";
import { Link } from "react-router-dom";

function ImageCarousel({ products = [] }) {
  const imgContainerRef = useRef(null);
  const [currentSlideIdx, setCurrentSlideIndex] = useState(0);
  const carouselWidth = 900;

  useEffect(() => {
    if (imgContainerRef.current) {
      const carouselWrappers = Array.from(imgContainerRef.current.children);
      carouselWrappers.forEach((wrapper, idx) => {
        wrapper.style.left = `${carouselWidth * idx}px`;
      });
    }
  }, [products]);

  const goToNext = () => {
    if (products.length == 0) return;
    setCurrentSlideIndex((prevIdx) => (prevIdx + 1) % products.length);
  };
  const goToPrev = () => {
    if (products.length == 0) return;
    setCurrentSlideIndex(
      (prevIdx) => (prevIdx - 1 + products.length) % products.length
    );
  };
  const handleSlider = (idx) => {
    setCurrentSlideIndex(idx);
  };
  return (
    <div className={styles["carousel"]}>
      <div
        className={styles["img-container"]}
        ref={imgContainerRef}
        style={{
          transform: `translateX(-${currentSlideIdx * carouselWidth}px)`,
        }}
      >
        {products.length > 0 &&
          products.map((item, idx) => (
            <div key={idx} className={styles["carousel-wrapper"]}>
              <Link to={`/product/${item.id}`}>
                <img
                  key={item.id}
                  className={`${styles["slide-img"]} ${
                    idx === 0 ? styles["current-slide"] : ""
                  }`}
                  src={item.image}
                  alt={item.title}
                />
              </Link>
              <Link to={`/product/${item.id}`}>
                <div className={styles["text-wrapper"]}>
                  <ul>
                    {item.platform.map(([name, icon]) => (
                      <li key={name} title={name}>
                        <i className={`${icon} platform-icon`} />
                      </li>
                    ))}
                  </ul>
                  <h2>{item.title}</h2>
                  <div className="price-wrapper">
                    {item.discount != 0 && (
                      <>
                        <p>{item.discount}</p>
                        <p>{item.priceBeforeDiscount}</p>
                      </>
                    )}
                    <p>{item.price == 0 ? "Free to play" : item.price}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
      <div className="slider">
        {products.length > 0 &&
          products.map((item, idx) => (
            <button key={idx} onClick={() => handleSlider(idx)}>
              *
            </button>
          ))}
      </div>
      <div className="nav-btns">
        <button className="prev-btn" onClick={goToPrev}>
          prev
        </button>
        <button className="next-btn" onClick={goToNext}>
          after
        </button>
      </div>
    </div>
  );
}
export default ImageCarousel;

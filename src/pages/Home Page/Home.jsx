import { React, useContext, useMemo } from "react";
import { ProductContext } from "../../components/context/ProductContext";
import { shuffleProduct, transformProductData } from "../../helper/Helper";
import ProductCard from "../../components/product card/ProductCard";
import ImageCarousel from "../../components/img carousel/ImageCarousel";
import styles from './Home.module.css'

function Home() {
  const { products, loading, error } = useContext(ProductContext);

  const randomProcessedCarouselProducts = useMemo(() => {
    const shuffled = shuffleProduct(products, 5);
    return shuffled.map(transformProductData);
  }, [products]);

  const randomProcessedCardProducts = useMemo(() => {
    const shuffled = shuffleProduct(products, 10);
    return shuffled.map(transformProductData);
  }, [products]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching the products: {error}</p>;

  return (
    <div className="home">
      <ImageCarousel products={randomProcessedCarouselProducts} />
      <div className={styles["product-container"]}>
          {randomProcessedCardProducts &&
            randomProcessedCardProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                priceBeforeDiscount={product.priceBeforeDiscount}
                price={product.price}
                discount={product.discount}
                image={product.image}
                platform={product.platform}
              />
            ))}
      </div>
    </div>
  );
}

export default Home;

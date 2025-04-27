import { useContext, useMemo } from "react";
import { ProductContext } from "../../components/context/ProductContext";
import ProductCard from "../../components/product card/ProductCard";
import { transformProductData } from "../../helper/Helper";
import styles from "./Shop.module.css";

export default function Shop() {
  const { products, loading, error, totalPages, page, setPage } =
    useContext(ProductContext);
  const transformedProducts = useMemo(
    () => products.map(transformProductData),
    [products]
  );
  
  const renderPageNumbers = () => {
    const lastPage = totalPages;
    const pageNumbers = [];
    
    // Always show first page
    pageNumbers.push(
      <li
        key={1}
        className={`${styles["page-no"]} ${page === 1 ? styles["active"] : ""}`}
        onClick={() => goToPage(1)}
      >
        1
      </li>
    );
    let startPage = Math.max(2, page - 1);
    let endPage = startPage == 2 ? 4 : Math.min(lastPage - 1, page + 1);
    if (startPage > 2) {
      pageNumbers.push(
        <li key="dots-1" className={styles["page-no"]}>
          ...
        </li>
      );
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`${styles["page-no"]} ${page === i ? styles["active"] : ""}`}
          onClick={() => goToPage(i)}
        >
          {i}
        </li>
      );
    }

    // Add last ellipsis
    if (endPage < lastPage - 1) {
      pageNumbers.push(
        <li key="dots-2" className={styles["page-no"]}>
          ...
        </li>
      );
    }

    // Add last page if it's not page 1
    if (lastPage > 1) {
      pageNumbers.push(
        <li
          key={lastPage}
          className={`${styles["page-no"]} ${
            page === lastPage ? styles["active"] : ""
          }`}
          onClick={() => goToPage(lastPage)}
        >
          {lastPage}
        </li>
      );
    }

    return pageNumbers;
  };

  const handlePrevPage = () => {
    setPage(page > 1 ? page - 1 : page);
  };

  const handleNextPage = () => {
    setPage(page < totalPages ? page + 1 : page);
  };

  const goToPage = (pageNo) => {
    console.log("goToPage clicked");
    setPage(pageNo);
  };

  if (loading) return <p>Loading...</p>;
  if (error || !transformedProducts) return <p>Error fetching the products: {error}</p>;
  return (
    <div className={styles["shop-container"]}>
      <div className={styles["product-container"]}>
        {transformedProducts &&
          transformedProducts.map((product) => (
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
      <div className={styles["nav-page"]}>
        <button onClick={handlePrevPage}>Prev Page</button>
        <ul className="page-list">{renderPageNumbers()}</ul>
        <button onClick={handleNextPage}>Next Page</button>
      </div>
    </div>
  );
}

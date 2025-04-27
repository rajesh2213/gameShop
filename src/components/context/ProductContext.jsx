import { createContext, useEffect, useReducer } from "react";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const initialState = {
    products: [],
    page: 1,
    totalPages: 0,
    loading: true,
    error: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_PRODUCTS":
        return { ...state, products: action.payload, loading: false };
      case "SET_ERROR":
        return { ...state, error: true, loading: false };
      case "SET_LOADING":
        return { ...state, loading: action.payload };
      case "SET_PAGE":
        return { ...state, page: action.payload };
      case "SET_TOTAL_PAGES":
        return { ...state, totalPages: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchUrl = `https://www.nexarda.com/api/v3/search?type=games&page=${state.page}`;
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const res = await fetch(fetchUrl);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const fetchData = await res.json();
        dispatch({ type: "SET_PRODUCTS", payload: fetchData.results.items });
        dispatch({ type: "SET_TOTAL_PAGES", payload: fetchData.results.pages });
        console.log("Products fetched successfully", fetchData.results.items);
      } catch (err) {
        dispatch({ type: "SET_ERROR" });
        console.log("Error while fetching data", err);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };
    fetchProducts();
  }, [state.page]);

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        loading: state.loading,
        error: state.error,
        totalPages: state.totalPages,
        page: state.page,
        setPage: (page) => dispatch({ type: "SET_PAGE", payload: page }),
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };

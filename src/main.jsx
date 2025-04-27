import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home Page/Home.jsx";
import Shop from "./pages/Shop/Shop.jsx";
import Cart from "./pages/Cart Page/Cart.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetailsPage from "./pages/Product Page/ProductDetailPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/shop", element: <Shop /> },
      { path: '/product/:productId', element: <ProductDetailsPage />},
      { path: "/cart", element: <Cart />}
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

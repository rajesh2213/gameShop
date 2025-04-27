import "./App.css";
import Home from "./pages/Home Page/Home";
import { ProductProvider } from "./components/context/ProductContext";
import { CartProvider } from "./components/context/CartContext.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Nav from "./components/Nav Bar/Nav.jsx";
import Shop from "./pages/Shop/Shop.jsx";
import { Outlet } from "react-router-dom";

const ContextProvider = ({ children }) => (
  <ProductProvider>
    <CartProvider>{children}</CartProvider>
  </ProductProvider>
);

function App() {
  return (
    <ContextProvider>
      <header>
        <Nav />
      </header>
      <main>
        <Outlet />
      </main>
    </ContextProvider>
  );
}

export default App;

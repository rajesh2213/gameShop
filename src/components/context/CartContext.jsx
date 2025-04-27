import { useState, createContext } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItem, setCartItems] = useState([]);
  const updateCart = (newItem, quantity) => {
    setCartItems((prevItems) => {
      const updatedCart = new Map(prevItems.map((item) => [item.id, item])); 
      if (updatedCart.has(newItem.id)) {
        const existingItem = updatedCart.get(newItem.id);
        updatedCart.set(newItem.id, {
          ...existingItem,
          quantity: quantity,
        });
      } else {
        updatedCart.set(newItem.id, { ...newItem, quantity });
      }
      return Array.from(updatedCart.values()); 
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItem, setCartItems, updateCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
export { CartContext, CartProvider };

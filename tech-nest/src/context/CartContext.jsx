// src/context/CartContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { useNotifications } from "../context/NotificationsContext"; // ✅ Fixed import

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];

  });
  

 const { addMessage } = useNotifications();

 

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  

  const addToCart = (product) => {
    const existing = cartItems.find((item) => item.id === product.id);

    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      addMessage(`➕ Increased quantity of ${product.title}`);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      addMessage(`🛒 Added ${product.title} to cart`);
    }
  };

  const removeFromCart = (productId) => {
    const removedProduct = cartItems.find((item) => item.id === productId);
    setCartItems(cartItems.filter((item) => item.id !== productId));
    if (removedProduct) {
      addMessage(`❌ Removed ${removedProduct.title} from cart`);
    }
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: quantity } : item
      )
    );
    const updatedItem = cartItems.find((item) => item.id === productId);
    if (updatedItem) {
      addMessage(`🔄 Updated ${updatedItem.title} quantity to ${quantity}`);
    }
  };

    const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
    addMessage("🧹 Cart cleared after placing order"); // ✅ Notification message
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity,  clearCart}}
    >
      {children}
    </CartContext.Provider>
  );
};

// custom hook
export const useCart = () => useContext(CartContext);

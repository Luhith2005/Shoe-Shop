import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem("shoeLand_cart");
    return localData ? JSON.parse(localData) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const localData = localStorage.getItem("shoeLand_wishlist");
    return localData ? JSON.parse(localData) : [];
  });

  const [activePage, setActivePage] = useState("home");
  const [selectedBrandFilter, setSelectedBrandFilter] = useState("All");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("All");
  const [selectedGenderFilter, setSelectedGenderFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("sriram_theme");
    return savedTheme ? savedTheme : "dark";
  });

  useEffect(() => {
    localStorage.setItem("sriram_theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    localStorage.setItem("shoeLand_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("shoeLand_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (productId) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.includes(productId)) {
        return prevWishlist.filter((id) => id !== productId);
      } else {
        return [...prevWishlist, productId];
      }
    });
  };

  const addToCart = (product, size, color) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.size === size &&
          item.color === color
      );

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += 1;
        return newCart;
      } else {
        return [...prevCart, { product, size, color, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId, size, color) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.size === size &&
            item.color === color
          )
      )
    );
  };

  const updateQuantity = (productId, size, color, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId &&
        item.size === size &&
        item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const navigateTo = (page, brand = "All", category = "All", gender = "All") => {
    if (brand !== "All") {
      setSelectedBrandFilter(brand);
    }
    if (category !== "All") {
      setSelectedCategoryFilter(category);
    }
    if (gender !== "All") {
      setSelectedGenderFilter(gender);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        toggleWishlist,
        activePage,
        selectedBrandFilter,
        selectedCategoryFilter,
        selectedGenderFilter,
        searchQuery,
        setSelectedBrandFilter,
        setSelectedCategoryFilter,
        setSelectedGenderFilter,
        setSearchQuery,
        setActivePage,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartCount,
        getCartTotal,
        navigateTo,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

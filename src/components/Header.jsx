import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { ShoppingBag, Menu, X, Sun, Moon } from "lucide-react";
import BrandLogo from "./BrandLogo";

const Header = () => {
  const { activePage, navigateTo, getCartCount, theme, toggleTheme } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = theme === "dark";

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container header-container">
        
        <div className="logo-wrapper" onClick={() => navigateTo("home")}>
          <BrandLogo isDark={isDark} />
          <span>SriRam's FootWear</span>
        </div>

        <nav className="nav-links">
          <a
            href="#home"
            className={`nav-link ${activePage === "home" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              navigateTo("home");
            }}
          >
            Home
          </a>
          <a
            href="#shop"
            className={`nav-link ${activePage === "shop" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              navigateTo("shop", "All", "All", "All");
            }}
          >
            Shop
          </a>
          <a
            href="#cart"
            className={`nav-link ${activePage === "cart" ? "active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              navigateTo("cart");
            }}
          >
            Cart
          </a>
        </nav>

        <div className="header-actions">
          <button
            className="cart-icon-wrapper"
            onClick={() => navigateTo("cart")}
            aria-label="View Cart"
          >
            <ShoppingBag size={20} />
            {getCartCount() > 0 && <span className="cart-badge">{getCartCount()}</span>}
          </button>

          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: "80px",
            left: 0,
            width: "100%",
            backgroundColor: "var(--bg-secondary)",
            borderBottom: "1px solid var(--card-border)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            zIndex: 999,
          }}
        >
          <a
            href="#home"
            style={{ fontSize: "1.1rem", fontWeight: "600", color: activePage === "home" ? "var(--accent-neon)" : "inherit" }}
            onClick={(e) => {
              e.preventDefault();
              navigateTo("home");
              setMobileMenuOpen(false);
            }}
          >
            Home
          </a>
          <a
            href="#shop"
            style={{ fontSize: "1.1rem", fontWeight: "600", color: activePage === "shop" ? "var(--accent-neon)" : "inherit" }}
            onClick={(e) => {
              e.preventDefault();
              navigateTo("shop", "All", "All", "All");
              setMobileMenuOpen(false);
            }}
          >
            Shop
          </a>
          <a
            href="#cart"
            style={{ fontSize: "1.1rem", fontWeight: "600", display: "flex", alignItems: "center", gap: "10px", color: activePage === "cart" ? "var(--accent-neon)" : "inherit" }}
            onClick={(e) => {
              e.preventDefault();
              navigateTo("cart");
              setMobileMenuOpen(false);
            }}
          >
            Cart ({getCartCount()})
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;

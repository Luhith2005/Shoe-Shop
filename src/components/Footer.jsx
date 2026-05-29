import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Send, Check } from "lucide-react";
import BrandLogo from "./BrandLogo";

const Footer = () => {
  const { navigateTo, theme } = useCart();
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const isDark = theme === "dark";

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          
          <div className="footer-brand">
            <div 
              className="logo-wrapper" 
              style={{ 
                display: "inline-flex",
                marginBottom: "20px"
              }} 
              onClick={() => navigateTo("home")}
            >
              <BrandLogo isDark={isDark} />
              <span>SriRam's FootWear</span>
            </div>
            <p>
              Premium footwear designed for performance, comfort, and style. We offer the best sneakers from top global brands to elevate your everyday walk.
            </p>
            <div className="footer-socials">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
            </div>
          </div>

          
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#home" onClick={(e) => { e.preventDefault(); navigateTo("home"); }}>Home</a>
              </li>
              <li>
                <a href="#shop" onClick={(e) => { e.preventDefault(); navigateTo("shop"); }}>Shop All Shoes</a>
              </li>
              <li>
                <a href="#cart" onClick={(e) => { e.preventDefault(); navigateTo("cart"); }}>Shopping Cart</a>
              </li>
            </ul>
          </div>

          
          <div className="footer-links">
            <h4>Top Brands</h4>
            <ul>
              <li>
                <a href="#shop" onClick={(e) => { e.preventDefault(); navigateTo("shop", "Nike"); }}>Nike</a>
              </li>
              <li>
                <a href="#shop" onClick={(e) => { e.preventDefault(); navigateTo("shop", "Adidas"); }}>Adidas</a>
              </li>
              <li>
                <a href="#shop" onClick={(e) => { e.preventDefault(); navigateTo("shop", "Puma"); }}>Puma</a>
              </li>
              <li>
                <a href="#shop" onClick={(e) => { e.preventDefault(); navigateTo("shop", "Jordan"); }}>Air Jordan</a>
              </li>
            </ul>
          </div>

          
          <div className="footer-newsletter">
            <h4>Join The Club</h4>
            <p>Subscribe to receive special offers, release notifications, and shoe care tips.</p>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn-newsletter" aria-label="Subscribe">
                {subscribed ? <Check size={18} /> : <Send size={18} />}
              </button>
            </form>
            {subscribed && (
              <span style={{ fontSize: "0.85rem", color: "var(--success)", display: "block", marginTop: "10px" }}>
                Success! You are now subscribed.
              </span>
            )}
          </div>
        </div>

        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} SriRam's FootWear. All rights reserved.</p>
          <div style={{ display: "flex", gap: "20px" }}>
            <a href="#privacy" style={{ hover: { color: "var(--accent-neon)" } }}>Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

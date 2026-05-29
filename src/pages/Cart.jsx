import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Plus, Minus, CreditCard, ShoppingBag, ArrowLeft, CheckCircle, ShieldCheck, QrCode } from "lucide-react";

const Cart = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    navigateTo,
    clearCart,
  } = useCart();

  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    cardName: "",
    cardNum: "",
    cardExp: "",
    cardCvv: "",
    upiId: "",
  });

  const subtotal = getCartTotal();
  const shipping = subtotal > 10000 || subtotal === 0 ? 0 : 500;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
  };

  const handleOrderSuccessClose = () => {
    clearCart();
    setShowPaymentOptions(false);
    setSelectedPaymentMethod("card");
    setOrderPlaced(false);
    navigateTo("shop");
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="container section">
        <div className="empty-cart-state">
          <ShoppingBag size={64} style={{ color: "var(--text-muted)", marginBottom: "20px" }} />
          <h3>Your shopping cart is empty</h3>
          <p>Explore our premium collection and pick your favorite sneakers.</p>
          <button className="btn-primary" onClick={() => navigateTo("shop")}>
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="container section" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <div className="empty-cart-state success-checkout-state" style={{ padding: "40px" }}>
          <CheckCircle className="success-icon" style={{ color: "var(--success)", width: "64px", height: "64px", marginBottom: "16px" }} />
          <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "8px" }}>Order Confirmed!</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>
            Thank you for shopping at <strong>SriRam's FootWear</strong>! Your order has been placed successfully.
          </p>
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              padding: "20px",
              borderRadius: "12px",
              width: "100%",
              fontSize: "0.95rem",
              textAlign: "left",
              border: "1px solid var(--card-border)",
              marginBottom: "30px",
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}
          >
            <div>
              <strong>Order ID:</strong> #{Math.floor(10000000 + Math.random() * 90000000)}
            </div>
            <div>
              <strong>Payment Method:</strong> {
                selectedPaymentMethod === "card" ? "Credit/Debit/ATM Card" :
                selectedPaymentMethod === "cod" ? "Cash on Delivery (CoD)" : "UPI Pay"
              }
            </div>
            <div>
              <strong>Total Amount:</strong> ₹{total.toLocaleString('en-IN')}
            </div>
            <div>
              <strong>Status:</strong> {selectedPaymentMethod === "cod" ? "Pending Cash Collection" : "Paid & Processing"}
            </div>
          </div>
          <button className="btn-primary" style={{ width: "100%" }} onClick={handleOrderSuccessClose}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container section">
      <div style={{ marginBottom: "20px" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800 }}>
          Shopping <span style={{ color: "var(--accent-neon)" }}>Cart</span>
        </h1>
        <button
          onClick={() => navigateTo("shop")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "var(--text-muted)",
            fontSize: "0.95rem",
            marginTop: "8px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          <ArrowLeft size={16} /> Continue Shopping
        </button>
      </div>

      <div className="cart-layout">
        <div className="cart-items-wrapper">
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "700", borderBottom: "1px solid var(--card-border)", paddingBottom: "10px" }}>
              Items in Cart ({cart.length})
            </h3>
            {cart.map((item) => (
              <div
                key={`${item.product.id}-${item.size}-${item.color}`}
                className="cart-item"
                style={{ gridTemplateColumns: "100px 2fr 1fr 1.2fr auto" }}
              >
                <div className="cart-item-image-box">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="cart-item-image"
                  />
                </div>

                <div className="cart-item-info">
                  <h4>{item.product.name}</h4>
                  <div className="cart-item-meta">
                    <span>Brand: {item.product.brand}</span>
                    <span>Size: {item.size}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      Color:{" "}
                      <span
                        className="color-indicator"
                        style={{ backgroundColor: item.color }}
                      ></span>
                    </span>
                  </div>
                </div>

                <div className="cart-item-quantity">
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() =>
                      updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)
                    }
                    aria-label="Decrease Quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="qty-val">{item.quantity}</span>
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() =>
                      updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)
                    }
                    aria-label="Increase Quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <div className="cart-item-price">
                  ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                </div>

                <button
                  type="button"
                  style={{
                    backgroundColor: "var(--accent-crimson)",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "6px",
                    padding: "8px 12px",
                    fontSize: "0.8rem",
                    fontWeight: "700",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                  onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#ff5e62";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--accent-crimson)";
                  }}
                >
                  Remove from Cart
                </button>
              </div>
            ))}
          </div>

          {showPaymentOptions && (
            <div
              style={{
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--card-border)",
                borderRadius: "var(--border-radius)",
                padding: "24px",
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "24px"
              }}
            >
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--accent-neon)", display: "flex", alignItems: "center", gap: "10px" }}>
                Select Payment Details
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "16px",
                    borderRadius: "8px",
                    backgroundColor: selectedPaymentMethod === "card" ? "rgba(102, 252, 241, 0.05)" : "rgba(255, 255, 255, 0.02)",
                    border: `1px solid ${selectedPaymentMethod === "card" ? "var(--accent-neon)" : "var(--card-border)"}`,
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  <input
                    type="radio"
                    name="payment-option"
                    checked={selectedPaymentMethod === "card"}
                    onChange={() => setSelectedPaymentMethod("card")}
                    style={{ accentColor: "var(--accent-neon)", width: "18px", height: "18px" }}
                  />
                  <span style={{ fontWeight: "700" }}>Credit/Debit/ATM Card</span>
                </label>

                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "16px",
                    borderRadius: "8px",
                    backgroundColor: selectedPaymentMethod === "cod" ? "rgba(102, 252, 241, 0.05)" : "rgba(255, 255, 255, 0.02)",
                    border: `1px solid ${selectedPaymentMethod === "cod" ? "var(--accent-neon)" : "var(--card-border)"}`,
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  <input
                    type="radio"
                    name="payment-option"
                    checked={selectedPaymentMethod === "cod"}
                    onChange={() => setSelectedPaymentMethod("cod")}
                    style={{ accentColor: "var(--accent-neon)", width: "18px", height: "18px" }}
                  />
                  <span style={{ fontWeight: "700" }}>Cash on Delivery</span>
                </label>

                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "16px",
                    borderRadius: "8px",
                    backgroundColor: selectedPaymentMethod === "upi" ? "rgba(102, 252, 241, 0.05)" : "rgba(255, 255, 255, 0.02)",
                    border: `1px solid ${selectedPaymentMethod === "upi" ? "var(--accent-neon)" : "var(--card-border)"}`,
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  <input
                    type="radio"
                    name="payment-option"
                    checked={selectedPaymentMethod === "upi"}
                    onChange={() => setSelectedPaymentMethod("upi")}
                    style={{ accentColor: "var(--accent-neon)", width: "18px", height: "18px" }}
                  />
                  <span style={{ fontWeight: "700" }}>UPI Pay</span>
                </label>
              </div>

              <form onSubmit={handleFinalSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {selectedPaymentMethod === "card" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div className="form-group">
                      <label htmlFor="card-name">Cardholder Name</label>
                      <input
                        type="text"
                        id="card-name"
                        name="cardName"
                        required
                        className="form-input"
                        placeholder="John Doe"
                        value={formData.cardName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="card-num">Card Number</label>
                      <input
                        type="text"
                        id="card-num"
                        name="cardNum"
                        required
                        maxLength="19"
                        className="form-input"
                        placeholder="4111 2222 3333 4444"
                        value={formData.cardNum}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="card-exp">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          id="card-exp"
                          name="cardExp"
                          required
                          maxLength="5"
                          className="form-input"
                          placeholder="12/28"
                          value={formData.cardExp}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="card-cvv">CVV</label>
                        <input
                          type="password"
                          id="card-cvv"
                          name="cardCvv"
                          required
                          maxLength="3"
                          className="form-input"
                          placeholder="***"
                          value={formData.cardCvv}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedPaymentMethod === "cod" && (
                  <div
                    style={{
                      padding: "16px",
                      borderRadius: "8px",
                      backgroundColor: "rgba(255, 255, 255, 0.02)",
                      border: "1px dashed var(--card-border)",
                      fontSize: "0.95rem",
                      color: "var(--text-muted)"
                    }}
                  >
                    Pay cash upon delivery. A service charge of ₹50 might apply depending on delivery partners.
                  </div>
                )}

                {selectedPaymentMethod === "upi" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div className="form-group">
                      <label htmlFor="upi-id">Enter UPI ID</label>
                      <input
                        type="text"
                        id="upi-id"
                        name="upiId"
                        required
                        className="form-input"
                        placeholder="sriram@ybl"
                        value={formData.upiId}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        padding: "16px",
                        borderRadius: "8px",
                        backgroundColor: "rgba(255,255,255,0.02)",
                        border: "1px solid var(--card-border)"
                      }}
                    >
                      <QrCode size={40} style={{ color: "var(--accent-neon)" }} />
                      <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                        Scan code or accept notification in your UPI app (GPay, PhonePe, Paytm).
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  style={{
                    backgroundColor: "#ffcc00",
                    color: "#0b0c10",
                    fontWeight: "800",
                    fontSize: "1rem",
                    padding: "16px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 4px 14px rgba(255, 204, 0, 0.3)",
                    transition: "all 0.2s ease",
                    marginTop: "10px",
                    width: "100%"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#ffe066";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 6px 18px rgba(255, 204, 0, 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#ffcc00";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 14px rgba(255, 204, 0, 0.3)";
                  }}
                >
                  Complete Order - ₹{total.toLocaleString('en-IN')}
                </button>
              </form>
            </div>
          )}
        </div>

        <div className="order-summary-box">
          <h3 className="summary-title">Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? "FREE" : `₹${shipping.toLocaleString('en-IN')}`}</span>
          </div>
          <div className="summary-row">
            <span>Estimated Tax</span>
            <span>₹{tax.toLocaleString('en-IN')}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{total.toLocaleString('en-IN')}</span>
          </div>

          {!showPaymentOptions && (
            <button
              type="button"
              onClick={() => setShowPaymentOptions(true)}
              style={{
                width: "100%",
                backgroundColor: "#ffcc00",
                color: "#0b0c10",
                fontWeight: "800",
                padding: "16px",
                borderRadius: "var(--border-radius)",
                fontSize: "1.05rem",
                marginTop: "24px",
                boxShadow: "0 4px 16px rgba(255, 204, 0, 0.3)",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                border: "none",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#ffe066";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(255, 204, 0, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ffcc00";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(255, 204, 0, 0.3)";
              }}
            >
              Place Order <CreditCard size={18} />
            </button>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "20px", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            <span>✓ Secure SSL checkout protocol active</span>
            <span>✓ Easy returns within 30 days of receipt</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

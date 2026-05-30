import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import { useCart } from "./context/CartContext";
import { Star, X, ShoppingCart, Heart } from "lucide-react";
import AIChat from "./components/AIChat";
import { shoes } from "./data/data";

const getColorFilter = (color) => {
  if (!color) return 'none';
  const lower = color.toLowerCase();
  
  const filterMap = {
    '#ff0000': 'hue-rotate(0deg) saturate(1.5)',
    '#ff3b30': 'hue-rotate(0deg) saturate(1.5)',
    '#cc0000': 'hue-rotate(350deg) saturate(1.3) brightness(0.9)',
    '#f5a623': 'hue-rotate(30deg) saturate(1.6)',
    '#ff9500': 'hue-rotate(30deg) saturate(1.6)',
    '#ff5e3a': 'hue-rotate(15deg) saturate(1.6)',
    '#ffcc00': 'hue-rotate(45deg) saturate(1.8) brightness(1.1)',
    '#34c759': 'hue-rotate(100deg) saturate(1.4)',
    '#007aff': 'hue-rotate(200deg) saturate(1.5)',
    '#002d62': 'hue-rotate(210deg) saturate(1.4) brightness(0.8)',
    '#4a90e2': 'hue-rotate(190deg) saturate(1.5)',
    '#5856d6': 'hue-rotate(250deg) saturate(1.5)',
    '#000000': 'brightness(0.35) grayscale(0.8)',
    '#000': 'brightness(0.35) grayscale(0.8)',
    '#111111': 'brightness(0.4) grayscale(0.7)',
    '#111': 'brightness(0.4) grayscale(0.7)',
    '#222222': 'brightness(0.45) grayscale(0.6)',
    '#222': 'brightness(0.45) grayscale(0.6)',
    '#ffffff': 'none',
    '#fff': 'none',
    '#cccccc': 'grayscale(1) brightness(1.1)',
    '#ccc': 'grayscale(1) brightness(1.1)'
  };
  
  return filterMap[lower] || 'none';
};

function App() {
  const { activePage, addToCart, wishlist, toggleWishlist } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [addedMessage, setAddedMessage] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [is360Mode, setIs360Mode] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startRotation, setStartRotation] = useState(0);

  const relatedShoes = selectedProduct
    ? shoes
        .filter((s) => s.id !== selectedProduct.id && s.brand === selectedProduct.brand && s.category !== "Chappals")
        .slice(0, 3)
    : [];

  const relatedChappals = selectedProduct
    ? shoes
        .filter((s) => s.id !== selectedProduct.id && s.brand === selectedProduct.brand && s.category === "Chappals")
        .slice(0, 3)
    : [];

  const handleOpenDetails = (product) => {
    setSelectedProduct(product);
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors[0]);
    setActiveImage(product.image);
    setIs360Mode(false);
    setRotation(0);
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
    setSelectedSize(null);
    setSelectedColor(null);
    setActiveImage(null);
    setIs360Mode(false);
    setRotation(0);
  };

  const handleMouseDown = (e) => {
    if (!is360Mode) return;
    setIsDragging(true);
    setStartX(e.clientX);
    setStartRotation(rotation);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !is360Mode) return;
    const deltaX = e.clientX - startX;
    let newRotation = (startRotation - deltaX) % 360;
    if (newRotation < 0) newRotation += 360;
    setRotation(newRotation);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const get360ImageAndStyle = (deg) => {
    if (!selectedProduct || !selectedProduct.images) return { src: '', transform: '' };
    let imgIndex = 0;
    let flip = false;

    if (deg >= 0 && deg < 60) {
      imgIndex = 0;
    } else if (deg >= 60 && deg < 120) {
      imgIndex = 1;
    } else if (deg >= 120 && deg < 180) {
      imgIndex = 2;
    } else if (deg >= 180 && deg < 240) {
      imgIndex = 0;
      flip = true;
    } else if (deg >= 240 && deg < 300) {
      imgIndex = 1;
      flip = true;
    } else {
      imgIndex = 2;
      flip = true;
    }

    const relativeRotation = (deg % 60) - 30;

    return {
      src: selectedProduct.images[imgIndex],
      transform: `rotateY(${relativeRotation}deg) ${flip ? "scaleX(-1)" : ""}`
    };
  };

  const handleAddToCartClick = () => {
    if (!selectedProduct) return;
    addToCart(selectedProduct, selectedSize, selectedColor);

    
    setAddedMessage(true);
    setTimeout(() => {
      setAddedMessage(false);
      handleCloseDetails();
    }, 1500);
  };

  
  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <Home onOpenDetails={handleOpenDetails} />;
      case "shop":
        return <Shop onOpenDetails={handleOpenDetails} />;
      case "cart":
        return <Cart />;
      default:
        return <Home onOpenDetails={handleOpenDetails} />;
    }
  };

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">{renderPage()}</main>
      <Footer />

      
      {selectedProduct && (
        <div className="modal-overlay" onClick={handleCloseDetails}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="btn-modal-close" onClick={handleCloseDetails} aria-label="Close Modal">
              <X size={20} />
            </button>

            <div className="detail-grid">
              
              <div className="detail-img-box">
                <div className="view-mode-tabs">
                  <button
                    className={`view-mode-tab ${!is360Mode ? "active" : ""}`}
                    onClick={() => setIs360Mode(false)}
                  >
                    Gallery
                  </button>
                  <button
                    className={`view-mode-tab ${is360Mode ? "active" : ""}`}
                    onClick={() => setIs360Mode(true)}
                  >
                    360° View
                  </button>
                </div>

                {is360Mode ? (
                  <>
                    <div
                      className={`detail-img-viewport ${isDragging ? "grabbing" : "grab"}`}
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                    >
                      <img
                        src={get360ImageAndStyle(rotation).src}
                        alt={selectedProduct.name}
                        className="detail-img"
                        style={{
                          transform: get360ImageAndStyle(rotation).transform,
                          transformStyle: "preserve-3d",
                          filter: getColorFilter(selectedColor) !== 'none'
                            ? `${getColorFilter(selectedColor)} drop-shadow(0 15px 30px rgba(0, 0, 0, 0.4))`
                            : 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.4))'
                        }}
                        draggable="false"
                      />
                    </div>
                    <div className="rotation-control-box">
                      <div className="rotation-label">
                        <span>Drag image or slide to rotate</span>
                        <span className="rotation-value">{rotation}°</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={rotation}
                        onChange={(e) => setRotation(Number(e.target.value))}
                        className="rotation-slider"
                      />
                      <p className="rotation-help">Experience interactive 360° product view</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="detail-img-viewport">
                      <img
                        src={activeImage || selectedProduct.image}
                        alt={selectedProduct.name}
                        className="detail-img"
                        style={{
                          filter: getColorFilter(selectedColor) !== 'none'
                            ? `${getColorFilter(selectedColor)} drop-shadow(0 15px 30px rgba(0, 0, 0, 0.4))`
                            : 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.4))'
                        }}
                      />
                    </div>
                    {selectedProduct.images && selectedProduct.images.length > 0 && (
                      <div className="detail-gallery-row">
                        {selectedProduct.images.map((imgUrl, idx) => (
                          <button
                            key={idx}
                            className={`detail-gallery-thumb ${activeImage === imgUrl ? "active" : ""}`}
                            onClick={() => setActiveImage(imgUrl)}
                            aria-label={`View angle ${idx + 1}`}
                          >
                            <img
                              src={imgUrl}
                              alt={`${selectedProduct.name} angle ${idx + 1}`}
                              style={{
                                filter: getColorFilter(selectedColor) !== 'none'
                                  ? getColorFilter(selectedColor)
                                  : 'none'
                              }}
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>

              
              <div className="detail-info-box">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
                  <div>
                    <span className="detail-brand">{selectedProduct.brand}</span>
                    <h2 className="detail-title">{selectedProduct.name}</h2>
                  </div>
                  <button
                    onClick={() => toggleWishlist(selectedProduct.id)}
                    style={{
                      padding: "10px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      color: wishlist.includes(selectedProduct.id) ? "var(--accent-crimson)" : "var(--text-muted)",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid var(--card-border)",
                      cursor: "pointer"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                    aria-label="Toggle Wishlist"
                  >
                    <Heart
                      size={20}
                      fill={wishlist.includes(selectedProduct.id) ? "var(--accent-crimson)" : "none"}
                    />
                  </button>
                </div>

                
                <div className="detail-rating">
                  <div className="stars-list" style={{ display: "flex", color: "#ffcc00" }}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < Math.floor(selectedProduct.rating) ? "#ffcc00" : "none"}
                        stroke={i < Math.floor(selectedProduct.rating) ? "#ffcc00" : "currentColor"}
                      />
                    ))}
                  </div>
                  <span className="rating-value" style={{ fontSize: "0.95rem", fontWeight: "700" }}>
                    {selectedProduct.rating}
                  </span>
                  <span className="reviews-count" style={{ fontSize: "0.95rem" }}>
                    ({selectedProduct.reviews} reviews)
                  </span>
                </div>

                
                <div className="detail-price-box">
                  <span className="detail-price">₹{selectedProduct.price.toLocaleString('en-IN')}</span>
                  {selectedProduct.originalPrice > selectedProduct.price && (
                    <span className="detail-old-price">₹{selectedProduct.originalPrice.toLocaleString('en-IN')}</span>
                  )}
                </div>

                
                <p className="detail-description">{selectedProduct.description}</p>

                
                <div>
                  <h4 className="selector-title">Select US Size</h4>
                  <div className="size-selector-grid">
                    {selectedProduct.sizes.map((size) => (
                      <button
                        key={size}
                        className={`size-pill ${selectedSize === size ? "selected" : ""}`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                
                <div>
                  <h4 className="selector-title">Select Color</h4>
                  <div className="color-selector-grid">
                    {selectedProduct.colors.map((color) => (
                      <button
                        key={color}
                        className={`color-pill ${selectedColor === color ? "selected" : ""}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                        aria-label={`Color ${color}`}
                      >
                        {selectedColor === color && (
                          <span
                            style={{
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              backgroundColor: color === "#ffffff" ? "#000" : "#fff",
                            }}
                          ></span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                
                <button className="btn-add-to-cart-modal" onClick={handleAddToCartClick} disabled={addedMessage}>
                  {addedMessage ? (
                    "Added successfully!"
                  ) : (
                    <>
                      Add to Cart <ShoppingCart size={18} />
                    </>
                  )}
                </button>
              </div>
            </div>

            {(relatedShoes.length > 0 || relatedChappals.length > 0) && (
              <div style={{ padding: "0 40px 40px 40px", borderTop: "1px solid var(--card-border)" }}>
                
                {/* Related Sneakers */}
                {relatedShoes.length > 0 && (
                  <div style={{ marginBottom: "24px" }}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: "700", margin: "24px 0 16px 0", color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {selectedProduct.category === "Chappals" ? "Matching Sneakers" : "Related Sneakers"}
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "20px" }}>
                      {relatedShoes.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleOpenDetails(item)}
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.02)",
                            border: "1px solid var(--card-border)",
                            borderRadius: "8px",
                            padding: "16px",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "var(--accent-neon)";
                            e.currentTarget.style.transform = "translateY(-4px)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "var(--card-border)";
                            e.currentTarget.style.transform = "translateY(0)";
                          }}
                        >
                          <div style={{ height: "100px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px", width: "100%" }}>
                            <img src={item.image} alt={item.name} style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                          </div>
                          <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: "700", letterSpacing: "0.05em" }}>{item.brand}</span>
                          <h4 style={{ fontSize: "0.9rem", fontWeight: "600", margin: "4px 0 8px 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "100%" }} title={item.name}>{item.name}</h4>
                          <span style={{ fontSize: "0.95rem", fontWeight: "800", color: "var(--accent-neon)" }}>₹{item.price.toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Related Chappals */}
                {relatedChappals.length > 0 && (
                  <div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: "700", margin: "24px 0 16px 0", color: "var(--text-primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {selectedProduct.category === "Chappals" ? "Related Slides & Sandals" : "Matching Slides & Sandals"}
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "20px" }}>
                      {relatedChappals.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleOpenDetails(item)}
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.02)",
                            border: "1px solid var(--card-border)",
                            borderRadius: "8px",
                            padding: "16px",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "var(--accent-neon)";
                            e.currentTarget.style.transform = "translateY(-4px)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "var(--card-border)";
                            e.currentTarget.style.transform = "translateY(0)";
                          }}
                        >
                          <div style={{ height: "100px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px", width: "100%" }}>
                            <img src={item.image} alt={item.name} style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain", filter: getColorFilter(item.colors[0]) !== 'none' ? getColorFilter(item.colors[0]) : 'none' }} />
                          </div>
                          <span style={{ fontSize: "0.75rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: "700", letterSpacing: "0.05em" }}>{item.brand}</span>
                          <h4 style={{ fontSize: "0.9rem", fontWeight: "600", margin: "4px 0 8px 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "100%" }} title={item.name}>{item.name}</h4>
                          <span style={{ fontSize: "0.95rem", fontWeight: "800", color: "var(--accent-neon)" }}>₹{item.price.toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}
          </div>
        </div>
      )}
      <AIChat onOpenDetails={handleOpenDetails} />
    </div>
  );
}

export default App;

import React from "react";
import { Star, Plus, Heart } from "lucide-react";
import { useCart } from "../context/CartContext";

const ShoeCard = ({ shoe, onOpenDetails }) => {
  const { wishlist, toggleWishlist } = useCart();
  const { id, name, brand, price, originalPrice, rating, reviews, image, isNew, discount } = shoe;
  const isLiked = wishlist.includes(id);

  return (
    <article className="shoe-card" onClick={() => onOpenDetails(shoe)}>
      
      {discount > 0 && <span className="card-badge">{discount}% OFF</span>}
      {discount === 0 && isNew && <span className="card-badge new">NEW</span>}

      
      <button
        className="card-wishlist"
        onClick={(e) => {
          e.stopPropagation(); 
          toggleWishlist(id);
        }}
        aria-label="Add to wishlist"
      >
        <Heart
          size={18}
          fill={isLiked ? "var(--accent-crimson)" : "none"}
          stroke={isLiked ? "var(--accent-crimson)" : "currentColor"}
        />
      </button>

      
      <div className="card-image-wrapper">
        <img src={image} alt={name} className="card-image" loading="lazy" />
      </div>

      
      <div className="card-info">
        <span className="card-brand">{brand}</span>
        <h3 className="card-name" title={name}>{name}</h3>

        
        <div className="card-rating">
          <div className="stars-list">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < Math.floor(rating) ? "#ffcc00" : "none"}
                stroke={i < Math.floor(rating) ? "#ffcc00" : "currentColor"}
              />
            ))}
          </div>
          <span className="rating-value">{rating}</span>
          <span className="reviews-count">({reviews})</span>
        </div>

        
        <div className="card-footer">
          <div className="card-price-box">
            <span className="card-price">₹{price.toLocaleString('en-IN')}</span>
            {originalPrice > price && (
              <span className="card-old-price">₹{originalPrice.toLocaleString('en-IN')}</span>
            )}
          </div>
          {isLiked ? (
            <button
              className="btn-add-cart-text"
              style={{
                backgroundColor: "var(--accent-neon)",
                color: "var(--bg-primary)",
                fontWeight: "800",
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                padding: "10px 18px",
                borderRadius: "30px",
                transition: "all 0.2s ease",
                boxShadow: "0 4px 12px var(--accent-neon-glow)",
                display: "inline-flex",
                alignItems: "center",
                cursor: "pointer"
              }}
              onClick={(e) => {
                e.stopPropagation(); 
                onOpenDetails(shoe);
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#fff";
                e.currentTarget.style.boxShadow = "0 6px 16px rgba(255, 255, 255, 0.4)";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--accent-neon)";
                e.currentTarget.style.boxShadow = "0 4px 12px var(--accent-neon-glow)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Add to Cart
            </button>
          ) : (
            <button
              className="btn-add-cart"
              aria-label={`Add ${name} to Cart`}
              onClick={(e) => {
                e.stopPropagation(); 
                onOpenDetails(shoe);
              }}
            >
              <Plus size={20} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ShoeCard;

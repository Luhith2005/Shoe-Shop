import React from "react";
import { Search } from "lucide-react";
import { brands, categories } from "../data/data";
import { MenIcon, WomenIcon } from "./GenderIcons";

const Filters = ({
  searchQuery,
  setSearchQuery,
  selectedBrands,
  setSelectedBrands,
  selectedCategory,
  setSelectedCategory,
  selectedGender,
  setSelectedGender,
  mainCategory,
  setMainCategory,
  maxPrice,
  setMaxPrice,
  onClear,
}) => {
  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) => {
      if (prev.includes(brand)) {
        return prev.filter((b) => b !== brand);
      } else {
        return [...prev, brand];
      }
    });
  };

  return (
    <aside className="filters-sidebar">
      
      <div className="filter-header">
        <h3 className="filter-title">Filters</h3>
        <button className="btn-clear-filters" onClick={onClear}>
          Clear All
        </button>
      </div>

      
      <div className="filter-group">
        <h4 className="filter-group-title">Search</h4>
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon-inside" />
          <input
            type="text"
            className="search-input"
            placeholder={mainCategory === "Chappals" ? "Search chappals..." : "Search shoes..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      
      <div className="filter-group">
        <h4 className="filter-group-title">Brands</h4>
        <div className="brand-list">
          {brands.map((brand) => (
            <label key={brand} className="filter-label">
              <input
                type="checkbox"
                className="filter-checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      
      <div className="filter-group">
        <h4 className="filter-group-title">Product Type</h4>
        <div className="category-list" style={{ display: "flex", gap: "8px", flexDirection: "row", flexWrap: "wrap" }}>
          {[
            { id: "All", label: "All Items" },
            { id: "Shoes", label: "Shoes" },
            { id: "Chappals", label: "Chappals" }
          ].map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => {
                setMainCategory(type.id);
                if (type.id === "Chappals") {
                  setSelectedCategory("Chappals");
                } else if (type.id === "Shoes") {
                  if (selectedCategory === "Chappals") {
                    setSelectedCategory("All");
                  }
                } else {
                  setSelectedCategory("All");
                }
              }}
              style={{
                flex: "1 1 calc(50% - 4px)",
                padding: "8px 10px",
                borderRadius: "8px",
                fontSize: "0.85rem",
                fontWeight: "700",
                textAlign: "center",
                border: "1px solid",
                borderColor: mainCategory === type.id ? "var(--accent-neon)" : "var(--card-border)",
                backgroundColor: mainCategory === type.id ? "var(--accent-neon)" : "rgba(255, 255, 255, 0.02)",
                color: mainCategory === type.id ? "var(--bg-primary)" : "var(--text-muted)",
                transition: "all 0.2s ease",
                boxShadow: mainCategory === type.id ? "0 0 10px var(--accent-neon-glow)" : "none",
              }}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      
      <div className="filter-group">
        <h4 className="filter-group-title">Gender</h4>
        <div className="category-list">
          {["All", "Men", "Women", "Unisex"].map((gender) => (
            <label key={gender} className="filter-label">
              <input
                type="radio"
                name="gender-group"
                className="filter-checkbox"
                style={{ borderRadius: "50%" }}
                checked={selectedGender === gender}
                onChange={() => setSelectedGender(gender)}
              />
              <span style={{ display: "inline-flex", alignItems: "center" }}>
                {gender === "Men" && <MenIcon size={16} style={{ marginRight: "4px" }} />}
                {gender === "Women" && <WomenIcon size={16} style={{ marginRight: "4px" }} />}
                {gender === "All" ? "All Genders" : `${gender}`}
              </span>
            </label>
          ))}
        </div>
      </div>

      
      {mainCategory !== "Chappals" && (
        <div className="filter-group">
          <h4 className="filter-group-title">Shoe Type</h4>
          <div className="category-list">
            {["All", "Running", "Lifestyle", "Basketball"].map((category) => (
              <label key={category} className="filter-label">
                <input
                  type="radio"
                  name="category-group"
                  className="filter-checkbox"
                  style={{ borderRadius: "50%" }}
                  checked={selectedCategory === category}
                  onChange={() => setSelectedCategory(category)}
                />
                <span>{category === "All" ? "All Shoes" : category}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      
      <div className="filter-group">
        <h4 className="filter-group-title">Max Price</h4>
        <div className="price-slider-wrapper">
          <input
            type="range"
            min="1000"
            max="20000"
            step="500"
            className="price-range-slider"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
          <div className="price-values">
            <span>₹1,000</span>
            <span style={{ color: "var(--accent-neon)" }}>₹{maxPrice.toLocaleString('en-IN')}</span>
            <span>₹20,000</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Filters;

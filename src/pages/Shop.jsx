import React, { useState, useEffect, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { shoes } from "../data/data";
import ShoeCard from "../components/ShoeCard";
import Filters from "../components/Filters";

const Shop = ({ onOpenDetails }) => {
  const {
    selectedBrandFilter,
    setSelectedBrandFilter,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    selectedGenderFilter,
    setSelectedGenderFilter
  } = useCart();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [mainCategory, setMainCategory] = useState(() => {
    if (selectedCategoryFilter === "Chappals") return "Chappals";
    if (selectedCategoryFilter !== "All" && selectedCategoryFilter) return "Shoes";
    return "All";
  });
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");
  const [maxPrice, setMaxPrice] = useState(20000);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    if (selectedBrandFilter && selectedBrandFilter !== "All") {
      setSelectedBrands([selectedBrandFilter]);
      setSelectedBrandFilter("All");
    }
    if (selectedCategoryFilter && selectedCategoryFilter !== "All") {
      if (selectedCategoryFilter === "Chappals") {
        setMainCategory("Chappals");
        setSelectedCategory("Chappals");
      } else {
        setMainCategory("Shoes");
        setSelectedCategory(selectedCategoryFilter);
      }
      setSelectedCategoryFilter("All");
    }
    if (selectedGenderFilter && selectedGenderFilter !== "All") {
      setSelectedGender(selectedGenderFilter);
      setSelectedGenderFilter("All");
    }
  }, [selectedBrandFilter, setSelectedBrandFilter, selectedCategoryFilter, setSelectedCategoryFilter, selectedGenderFilter, setSelectedGenderFilter]);

  const filteredShoes = useMemo(() => {
    return shoes
      .filter((shoe) => {
        const matchesSearch =
          shoe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          shoe.brand.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesBrand =
          selectedBrands.length === 0 || selectedBrands.includes(shoe.brand);

        // Main Category Filter
        let matchesMainCategory = true;
        if (mainCategory === "Shoes") {
          matchesMainCategory = shoe.category !== "Chappals";
        } else if (mainCategory === "Chappals") {
          matchesMainCategory = shoe.category === "Chappals";
        }

        // Subcategory Filter
        let matchesSubcategory = true;
        if (selectedCategory !== "All") {
          matchesSubcategory = shoe.category === selectedCategory;
        }

        // Gender Filter
        let matchesGender = true;
        if (selectedGender !== "All") {
          if (selectedGender === "Unisex") {
            matchesGender = shoe.gender === "Unisex";
          } else {
            matchesGender = shoe.gender === selectedGender || shoe.gender === "Unisex";
          }
        }

        const matchesPrice = shoe.price <= maxPrice;

        return matchesSearch && matchesBrand && matchesMainCategory && matchesSubcategory && matchesGender && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "discount") return b.discount - a.discount;
        return 0;
      });
  }, [searchQuery, selectedBrands, mainCategory, selectedCategory, selectedGender, maxPrice, sortBy]);

  const handleClearAllFilters = () => {
    setSearchQuery("");
    setSelectedBrands([]);
    setMainCategory("All");
    setSelectedCategory("All");
    setSelectedGender("All");
    setMaxPrice(20000);
    setSortBy("default");
  };

  return (
    <div className="container section">
      <div style={{ marginBottom: "20px" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800 }}>
          Shop <span style={{ color: "var(--accent-neon)" }}>Collection</span>
        </h1>
        <p style={{ color: "var(--text-muted)", marginTop: "4px" }}>
          Browse our ultimate inventory and filter by your preference
        </p>
      </div>

      {/* Separate Category Tabs for Shoes & Chappals */}
      <div 
        className="main-category-tabs" 
        style={{ 
          display: "flex", 
          gap: "12px", 
          marginBottom: "24px",
          borderBottom: "1px solid var(--card-border)",
          paddingBottom: "16px",
          flexWrap: "wrap"
        }}
      >
        {[
          {
            id: "All",
            label: "All Items",
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            )
          },
          {
            id: "Shoes",
            label: "Shoes Collection",
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 17h11.5a3.5 3.5 0 0 0 3.3-2.3l1.9-5.1A1.5 1.5 0 0 0 18.3 8H12V5.5A1.5 1.5 0 0 0 10.5 4h-1A1.5 1.5 0 0 0 8 5.5V8H4.5A1.5 1.5 0 0 0 3 9.5v7.5z" />
                <path d="M7 17a2 2 0 1 1-4 0m14 0a2 2 0 1 1-4 0" />
              </svg>
            )
          },
          {
            id: "Chappals",
            label: "Chappals & Slides",
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 18c0 1.5 2 2.5 5 2.5s8-1 10-3c2-2 2-6 .5-7.5S11 8.5 8 9.5c-3 1-4 3.5-4 5.5z" />
                <path d="M12 10.5c1-1.5 3.5-2 5-.5" />
                <path d="M9 11.5c1.5-2 4.5-2.5 6-.5" />
              </svg>
            )
          }
        ].map((tab) => {
          const isActive = mainCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setMainCategory(tab.id);
                if (tab.id === "Chappals") {
                  setSelectedCategory("Chappals");
                } else if (tab.id === "Shoes") {
                  if (selectedCategory === "Chappals") {
                    setSelectedCategory("All");
                  }
                } else {
                  setSelectedCategory("All");
                }
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 24px",
                borderRadius: "30px",
                fontSize: "0.95rem",
                fontWeight: "700",
                backgroundColor: isActive ? "var(--accent-neon)" : "rgba(255, 255, 255, 0.03)",
                color: isActive ? "var(--bg-primary)" : "var(--text-muted)",
                border: "1px solid",
                borderColor: isActive ? "var(--accent-neon)" : "var(--card-border)",
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: isActive ? "0 4px 15px var(--accent-neon-glow)" : "none",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = "var(--accent-neon)";
                  e.currentTarget.style.color = "var(--text-primary)";
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.06)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = "var(--card-border)";
                  e.currentTarget.style.color = "var(--text-muted)";
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.03)";
                }
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="shop-layout">
        <Filters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedBrands={selectedBrands}
          setSelectedBrands={setSelectedBrands}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
          mainCategory={mainCategory}
          setMainCategory={setMainCategory}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          onClear={handleClearAllFilters}
        />

        <div className="shop-products-section">
          <div className="shop-controls">
            <span className="results-count">
              Showing {filteredShoes.length} of {shoes.length} Results
            </span>

            <div className="sort-wrapper">
              <label htmlFor="sort-select" className="sort-label">Sort by</label>
              <select
                id="sort-select"
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </div>
          </div>

          {filteredShoes.length > 0 ? (
            <div className="product-grid">
              {filteredShoes.map((shoe) => (
                <ShoeCard key={shoe.id} shoe={shoe} onOpenDetails={onOpenDetails} />
              ))}
            </div>
          ) : (
            <div className="empty-shop-state">
              <h3>No items matched your criteria</h3>
              <p>Try clearing your active filters or adjusting the search term.</p>
              <button className="btn-primary" onClick={handleClearAllFilters}>
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;

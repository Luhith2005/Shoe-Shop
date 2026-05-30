import React, { useState, useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";
import { shoes } from "../data/data";
import { 
  MessageSquare, 
  Send, 
  X, 
  Sparkles, 
  RotateCcw, 
  ShoppingBag, 
  ChevronRight, 
  Check, 
  HelpCircle 
} from "lucide-react";

const AIChat = ({ onOpenDetails }) => {
  const { navigateTo, addToCart, theme } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1); // Start with 1 for the welcome message
  const [addedProductNotification, setAddedProductNotification] = useState(null);
  
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("sriram_chat_history");
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        sender: "ai",
        text: "Namaste! Welcome to **SriRam's FootWear** AI assistant. 👟\n\nI can help you search our catalog, suggest running or basketball shoes, share discount codes, or assist with shipping policies. \n\nWhat are you looking for today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        products: []
      }
    ];
  });

  const chatEndRef = useRef(null);
  const isDark = theme === "dark";

  // Auto scroll to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  // Persist chat history
  useEffect(() => {
    localStorage.setItem("sriram_chat_history", JSON.stringify(messages));
  }, [messages]);

  // Reset unread count when chat is opened
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  const quickActions = [
    { label: "👟 Recommend Running Shoes", query: "Show me running shoes" },
    { label: "🔥 Nike under ₹15,000", query: "Nike shoes under 15000" },
    { label: "🏷️ Any Shoes on Sale?", query: "Are there any shoes on sale?" },
    { label: "📦 Returns Policy", query: "What is your return policy?" }
  ];

  const handleSendMessage = (textToSend) => {
    const queryText = textToSend || inputValue;
    if (!queryText.trim()) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      products: []
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = generateAIResponse(queryText);
      const aiMsg = {
        id: Date.now() + 1,
        sender: "ai",
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        products: response.products || []
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
      
      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
      }
    }, 1000);
  };

  const generateAIResponse = (input) => {
    const query = input.toLowerCase();
    
    // 1. FAQ / Policy Matches
    if (query.includes("return") || query.includes("refund") || query.includes("exchange")) {
      return {
        text: "🔄 **Easy Returns & Exchanges**:\nSriRam's FootWear offers a **30-day return policy** on all unworn items in their original packaging. You can easily initiate a return/exchange from your dashboard, or visit our nearest store for immediate service.",
        products: []
      };
    }
    
    if (query.includes("shipping") || query.includes("delivery") || query.includes("track") || query.includes("charge")) {
      return {
        text: "🚚 **Shipping Details**:\n- **Free standard shipping** is provided on all orders above ₹4,999!\n- For orders below ₹4,999, a flat delivery fee of ₹150 applies.\n- Deliveries take **3 to 5 business days** depending on your location. A tracking link will be sent via email once dispatched.",
        products: []
      };
    }
    
    if (query.includes("discount") || query.includes("coupon") || query.includes("code") || query.includes("promo")) {
      return {
        text: "🎟️ **Exclusive Coupon For You**:\nUse coupon code **SRIRAM10** at checkout to get an instant **10% OFF** on your first purchase! \n\nWe also have special prices on several footwear items. Ask me to show 'shoes on sale' to check them out!",
        products: []
      };
    }
    
    if (query.includes("contact") || query.includes("support") || query.includes("email") || query.includes("phone") || query.includes("address")) {
      return {
        text: "📞 **Get in Touch**:\n- **Support Email**: care@sriramsfootwear.com\n- **Toll-Free Helpline**: +91 1800 456 7890 (9 AM - 6 PM, Mon-Sat)\n- **Main Showroom**: SriRam's Footwear Hub, Brigade Road, Bengaluru, India.",
        products: []
      };
    }

    // 2. Product Search & Catalog Matches
    let filtered = [...shoes];
    let criteria = [];

    // Brand check
    const brands = ["nike", "adidas", "puma", "jordan", "reebok", "under armour", "converse", "vans", "new balance", "asics", "fila", "skechers"];
    let matchedBrand = null;
    for (const b of brands) {
      if (query.includes(b)) {
        matchedBrand = b;
        break;
      }
    }
    if (matchedBrand) {
      let targetBrand = matchedBrand;
      if (matchedBrand === "under armour") targetBrand = "Under Armour";
      else if (matchedBrand === "new balance") targetBrand = "New Balance";
      else targetBrand = matchedBrand.charAt(0).toUpperCase() + matchedBrand.slice(1);
      
      filtered = filtered.filter(s => s.brand.toLowerCase() === targetBrand.toLowerCase());
      criteria.push(`brand **${targetBrand}**`);
    }

    // Category check
    let matchedCategory = null;
    if (query.includes("running") || query.includes("run") || query.includes("jogging")) {
      matchedCategory = "Running";
    } else if (query.includes("lifestyle") || query.includes("casual") || query.includes("sneaker") || query.includes("everyday")) {
      matchedCategory = "Lifestyle";
    } else if (query.includes("basketball") || query.includes("hoops") || query.includes("court")) {
      matchedCategory = "Basketball";
    } else if (query.includes("chappal") || query.includes("slide") || query.includes("sandal") || query.includes("flip") || query.includes("flop")) {
      matchedCategory = "Chappals";
    }
    if (matchedCategory) {
      filtered = filtered.filter(s => s.category === matchedCategory);
      criteria.push(`category **${matchedCategory === "Chappals" ? "Slides & Sandals" : matchedCategory}**`);
    }

    // Gender check
    let matchedGender = null;
    if (query.includes("women") || query.includes("woman") || query.includes("female") || query.includes("lady") || query.includes("ladies")) {
      matchedGender = "Women";
    } else if (query.includes("men") || query.includes("man") || query.includes("male") || query.includes("boy")) {
      matchedGender = "Men";
    } else if (query.includes("unisex")) {
      matchedGender = "Unisex";
    }
    if (matchedGender) {
      // Return exact gender or unisex
      filtered = filtered.filter(s => s.gender === matchedGender || s.gender === "Unisex");
      criteria.push(`gender **${matchedGender}**`);
    }

    // Price checks
    let priceLimit = null;
    const underRegex = /(?:under|below|less than|within)\s*(?:rs\.?|inr|₹)?\s*(\d+)/i;
    const match = query.match(underRegex);
    if (match) {
      priceLimit = parseInt(match[1]);
      filtered = filtered.filter(s => s.price <= priceLimit);
      criteria.push(`price under **₹${priceLimit.toLocaleString('en-IN')}**`);
    } else if (query.includes("cheap") || query.includes("budget") || query.includes("affordable") || query.includes("lowest")) {
      filtered.sort((a, b) => a.price - b.price);
      criteria.push("affordable models");
    } else if (query.includes("expensive") || query.includes("premium") || query.includes("costly") || query.includes("high-end") || query.includes("luxury")) {
      filtered = filtered.filter(s => s.price >= 12000);
      filtered.sort((a, b) => b.price - a.price);
      criteria.push("premium models");
    }

    // Sale check
    if (query.includes("sale") || query.includes("discount") || query.includes("offer") || query.includes("deal") || query.includes("percentage") || query.includes("percent")) {
      filtered = filtered.filter(s => s.discount > 0);
      filtered.sort((a, b) => b.discount - a.discount);
      criteria.push("on sale");
    }

    // New check
    if (query.includes("new") || query.includes("latest") || query.includes("fresh") || query.includes("recent")) {
      filtered = filtered.filter(s => s.isNew);
      criteria.push("new arrivals");
    }

    // Check if we found anything
    if (criteria.length > 0) {
      const criteriaStr = criteria.join(", ");
      if (filtered.length > 0) {
        const topMatches = filtered.slice(0, 4);
        return {
          text: `🎯 I found **${filtered.length}** matches for ${criteriaStr}. Here are the top suggestions:`,
          products: topMatches
        };
      } else {
        // Fallback: recommend featured/best-sellers
        const featured = shoes.filter(s => s.isFeatured).slice(0, 3);
        return {
          text: `😔 I couldn't find any products matching your specific search for ${criteriaStr}.\n\nHowever, you might like some of our **best-sellers** instead:`,
          products: featured
        };
      }
    }

    // 3. Fallback greeting
    if (query.includes("hi") || query.includes("hello") || query.includes("hey") || query.includes("namaste") || query.includes("hola")) {
      return {
        text: "👋 Hello! Great to see you. How can I help you find your next perfect pair of shoes today? \n\nYou can ask me things like:\n- *'Show me Nike running shoes'*\n- *'Are there any Jordans under 18000?'*\n- *'What is the refund policy?'*",
        products: []
      };
    }

    // Unrecognized queries
    const defaultFeatured = shoes.filter(s => s.isFeatured).slice(0, 3);
    return {
      text: "🤔 I'm not sure I fully understood. I'm SriRam's Footwear assistant and specialize in shoes, brand suggestions, delivery status, and store info.\n\nHere are some of our **highly recommended sneakers** to browse:",
      products: defaultFeatured
    };
  };

  const handleAddToCart = (product) => {
    // default size and color
    const size = product.sizes[0] || 9;
    const color = product.colors[0] || "#ffffff";
    addToCart(product, size, color);
    
    setAddedProductNotification(`${product.name} (Size US ${size}) added to cart!`);
    setTimeout(() => setAddedProductNotification(null), 3000);
  };

  const clearChat = () => {
    const initialMsg = [
      {
        id: 1,
        sender: "ai",
        text: "Namaste! Welcome back to **SriRam's FootWear** AI assistant. 👟\n\nI can help you search our catalog, suggest running or basketball shoes, share discount codes, or assist with shipping policies. \n\nWhat are you looking for today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        products: []
      }
    ];
    setMessages(initialMsg);
    localStorage.setItem("sriram_chat_history", JSON.stringify(initialMsg));
  };

  return (
    <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 9999, fontFamily: "var(--font-body)" }}>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--accent-neon) 0%, var(--accent-crimson) 100%)",
            color: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: isDark 
              ? "0 4px 20px rgba(102, 252, 241, 0.4), 0 0 15px rgba(255, 42, 95, 0.2)" 
              : "0 4px 15px rgba(0, 0, 0, 0.2)",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            position: "relative"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1) rotate(5deg)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1) rotate(0deg)";
          }}
          aria-label="Open AI Support Chat"
        >
          <Sparkles size={24} style={{ color: "#0b0c10" }} />
          {unreadCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-4px",
                right: "-4px",
                background: "var(--accent-crimson)",
                color: "#fff",
                fontSize: "0.75rem",
                fontWeight: "800",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                border: "2px solid var(--bg-primary)"
              }}
            >
              {unreadCount}
            </span>
          )}
        </button>
      )}

      {/* Chat Window Container */}
      {isOpen && (
        <div
          style={{
            width: "390px",
            height: "540px",
            maxHeight: "calc(100vh - 100px)",
            maxWidth: "calc(100vw - 40px)",
            backgroundColor: "var(--bg-glass)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid var(--card-border)",
            borderRadius: "var(--border-radius-lg)",
            boxShadow: "var(--shadow-lg)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            animation: "chatAppear 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            transformOrigin: "bottom right"
          }}
        >
          {/* Inject dynamic animations in a style tag */}
          <style>{`
            @keyframes chatAppear {
              from { opacity: 0; transform: scale(0.9) translateY(20px); }
              to { opacity: 1; transform: scale(1) translateY(0); }
            }
            @keyframes dotPulse {
              0%, 100% { opacity: 0.3; transform: scale(0.8); }
              50% { opacity: 1; transform: scale(1.2); }
            }
            .scrollbar-hidden::-webkit-scrollbar {
              height: 6px;
              width: 6px;
            }
            .scrollbar-hidden::-webkit-scrollbar-track {
              background: transparent;
            }
            .scrollbar-hidden::-webkit-scrollbar-thumb {
              background: var(--card-border);
              border-radius: 10px;
            }
            .scrollbar-hidden::-webkit-scrollbar-thumb:hover {
              background: var(--text-muted);
            }
          `}</style>

          {/* Header */}
          <div
            style={{
              padding: "16px 20px",
              background: isDark 
                ? "linear-gradient(135deg, rgba(31, 40, 51, 0.95) 0%, rgba(11, 12, 16, 0.95) 100%)" 
                : "linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)",
              borderBottom: "1px solid var(--card-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--accent-neon) 0%, #3fe7db 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 10px rgba(102, 252, 241, 0.4)"
                }}
              >
                <Sparkles size={18} style={{ color: "#000" }} />
              </div>
              <div>
                <h3 style={{ fontSize: "0.95rem", fontWeight: "700", color: "var(--text-primary)", margin: 0, lineHeight: 1.2 }}>SriRam's AI Guide</h3>
                <span style={{ fontSize: "0.75rem", color: "var(--accent-neon)", display: "flex", alignItems: "center", gap: "4px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--success)", display: "inline-block" }}></span>
                  Online • Assistant
                </span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {/* Reset History */}
              <button
                onClick={clearChat}
                title="Reset Chat History"
                style={{
                  padding: "6px",
                  borderRadius: "50%",
                  color: "var(--text-muted)",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-primary)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
              >
                <RotateCcw size={16} />
              </button>
              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  padding: "6px",
                  borderRadius: "50%",
                  color: "var(--text-muted)",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "var(--accent-crimson)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div
            className="scrollbar-hidden"
            style={{
              flex: 1,
              padding: "20px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              backgroundColor: isDark ? "rgba(11, 12, 16, 0.2)" : "rgba(255, 255, 255, 0.4)"
            }}
          >
            {messages.map((msg) => (
              <div 
                key={msg.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: msg.sender === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                  alignSelf: msg.sender === "user" ? "flex-end" : "flex-start"
                }}
              >
                {/* Bubble */}
                <div
                  style={{
                    padding: "12px 16px",
                    borderRadius: "16px",
                    borderTopRightRadius: msg.sender === "user" ? "4px" : "16px",
                    borderTopLeftRadius: msg.sender === "ai" ? "4px" : "16px",
                    backgroundColor: msg.sender === "user" 
                      ? (isDark ? "rgba(102, 252, 241, 0.1)" : "rgba(0, 150, 136, 0.12)")
                      : "var(--bg-secondary)",
                    border: msg.sender === "user"
                      ? `1px solid var(--accent-neon)`
                      : "1px solid var(--card-border)",
                    color: "var(--text-primary)",
                    fontSize: "0.9rem",
                    whiteSpace: "pre-line",
                    boxShadow: msg.sender === "user" ? "0 2px 8px rgba(102, 252, 241, 0.05)" : "none"
                  }}
                >
                  {/* Simplistic custom markdown text formatter for bold/links */}
                  {msg.text.split("\n").map((line, lIdx) => {
                    // Check for bold terms like **text**
                    const parts = line.split(/\*\*([^*]+)\*\*/g);
                    return (
                      <div key={lIdx} style={{ margin: "2px 0" }}>
                        {parts.map((part, pIdx) => {
                          if (pIdx % 2 === 1) {
                            return <strong key={pIdx} style={{ color: "var(--accent-neon)" }}>{part}</strong>;
                          }
                          return part;
                        })}
                      </div>
                    );
                  })}
                </div>

                {/* Horizontal Product List */}
                {msg.products && msg.products.length > 0 && (
                  <div
                    className="scrollbar-hidden"
                    style={{
                      display: "flex",
                      gap: "12px",
                      width: "350px",
                      overflowX: "auto",
                      padding: "8px 0",
                      marginTop: "8px",
                      maxWidth: "100%"
                    }}
                  >
                    {msg.products.map((prod) => (
                      <div
                        key={prod.id}
                        style={{
                          flex: "0 0 160px",
                          backgroundColor: "var(--bg-secondary)",
                          border: "1px solid var(--card-border)",
                          borderRadius: "10px",
                          padding: "10px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          textAlign: "center"
                        }}
                      >
                        {/* Image */}
                        <div style={{ height: "60px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "6px" }}>
                          <img src={prod.image} alt={prod.name} style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
                        </div>
                        
                        {/* Brand & Title */}
                        <span style={{ fontSize: "0.65rem", textTransform: "uppercase", color: "var(--text-muted)", fontWeight: "700" }}>
                          {prod.brand}
                        </span>
                        <h4 style={{ 
                          fontSize: "0.8rem", 
                          fontWeight: "600", 
                          margin: "2px 0 4px 0", 
                          whiteSpace: "nowrap", 
                          overflow: "hidden", 
                          textOverflow: "ellipsis",
                          width: "100%" 
                        }} title={prod.name}>
                          {prod.name}
                        </h4>

                        {/* Price */}
                        <span style={{ fontSize: "0.85rem", fontWeight: "800", color: "var(--accent-neon)", marginBottom: "8px" }}>
                          ₹{prod.price.toLocaleString('en-IN')}
                        </span>

                        {/* Actions Row */}
                        <div style={{ display: "flex", gap: "4px", width: "100%" }}>
                          <button
                            onClick={() => onOpenDetails(prod)}
                            style={{
                              flex: 1,
                              padding: "6px 2px",
                              fontSize: "0.65rem",
                              backgroundColor: isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                              borderRadius: "4px",
                              fontWeight: "600",
                              border: "1px solid var(--card-border)",
                              transition: "all 0.2s"
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)"}
                          >
                            Details
                          </button>
                          
                          <button
                            onClick={() => handleAddToCart(prod)}
                            style={{
                              padding: "6px",
                              backgroundColor: "var(--accent-neon)",
                              color: "#000",
                              borderRadius: "4px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "all 0.2s"
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#fff"}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "var(--accent-neon)"}
                            title="Add to Cart"
                          >
                            <ShoppingBag size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Time */}
                <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", marginTop: "4px", alignSelf: msg.sender === "user" ? "flex-end" : "flex-start" }}>
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Simulating typing animation */}
            {isTyping && (
              <div style={{ display: "flex", flexDirection: "column", alignSelf: "flex-start", maxWidth: "80%" }}>
                <div
                  style={{
                    padding: "10px 16px",
                    borderRadius: "16px",
                    borderTopLeftRadius: "4px",
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid var(--card-border)",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  }}
                >
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--accent-neon)", animation: "dotPulse 1.2s infinite ease-in-out" }}></div>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--accent-neon)", animation: "dotPulse 1.2s infinite ease-in-out 0.2s" }}></div>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--accent-neon)", animation: "dotPulse 1.2s infinite ease-in-out 0.4s" }}></div>
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* Inline notification for items added to cart */}
          {addedProductNotification && (
            <div
              style={{
                padding: "8px 16px",
                backgroundColor: "var(--success)",
                color: "#fff",
                fontSize: "0.8rem",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                justifyContent: "center",
                transition: "all 0.3s ease"
              }}
            >
              <Check size={14} /> {addedProductNotification}
            </div>
          )}

          {/* Quick Action Sugestions Area */}
          <div
            className="scrollbar-hidden"
            style={{
              padding: "10px 16px",
              borderTop: "1px solid var(--card-border)",
              display: "flex",
              gap: "8px",
              overflowX: "auto",
              backgroundColor: isDark ? "rgba(11, 12, 16, 0.4)" : "rgba(245, 247, 250, 0.8)"
            }}
          >
            {quickActions.map((qa, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(qa.query)}
                style={{
                  padding: "6px 12px",
                  fontSize: "0.75rem",
                  backgroundColor: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.03)",
                  border: "1px solid var(--card-border)",
                  borderRadius: "14px",
                  color: "var(--text-muted)",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text-primary)";
                  e.currentTarget.style.borderColor = "var(--accent-neon)";
                  e.currentTarget.style.backgroundColor = isDark ? "rgba(102, 252, 241, 0.05)" : "rgba(0, 150, 136, 0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-muted)";
                  e.currentTarget.style.borderColor = "var(--card-border)";
                  e.currentTarget.style.backgroundColor = isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.03)";
                }}
              >
                {qa.label}
              </button>
            ))}
          </div>

          {/* Footer Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            style={{
              padding: "12px 16px",
              borderTop: "1px solid var(--card-border)",
              backgroundColor: "var(--bg-secondary)",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}
          >
            <input
              type="text"
              placeholder="Ask SriRam's AI Assistant..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{
                flex: 1,
                padding: "10px 14px",
                backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                border: "1px solid var(--card-border)",
                borderRadius: "var(--border-radius)",
                fontSize: "0.85rem",
                color: "var(--text-primary)",
                outline: "none",
                transition: "all 0.2s"
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--accent-neon)";
                e.currentTarget.style.boxShadow = "var(--shadow-neon)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--card-border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "var(--border-radius)",
                backgroundColor: inputValue.trim() ? "var(--accent-neon)" : (isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"),
                color: inputValue.trim() ? "#000" : "var(--text-muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
                border: "none",
                cursor: inputValue.trim() ? "pointer" : "default"
              }}
              onMouseEnter={(e) => {
                if (inputValue.trim()) {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.backgroundColor = "#fff";
                }
              }}
              onMouseLeave={(e) => {
                if (inputValue.trim()) {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.backgroundColor = "var(--accent-neon)";
                }
              }}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIChat;

# SriRam's FootWear - Premium E-Commerce Store

**SriRam's FootWear** is a state-of-the-art, highly interactive React & Vite web application designed for showcasing and selling elite sneakers and premium slides/chappals. The site is optimized with custom vanilla CSS transitions, complex keyframe animations, glassmorphism UI layouts, and local storage state persistence.

---

## 🚀 Key Implemented Features

### 1. Dynamic Theme Switching (Dark vs. Light)
Toggle between a dark cyberpunk space and a refined, luxury-styled light theme:
* **Dark Mode**: Dominated by deep space black, neon cyan, and glowing magenta/crimson accents.
* **Light Mode**: Soft warm-white background, pure white cards, elegant charcoal-slate text, luxury bronze, and emerald-teal elements.
* Binds to the `data-theme` attribute on the root html node and persists in `localStorage` as `sriram_theme`.

### 2. Auto-Swapping SVG Logos
Branding changes in real-time depending on the active theme:
* **Dark Mode**: Displays a high-performance **Sneaker** SVG logo with neon cyan and gold gradients.
* **Light Mode**: Displays a summer-ready **Slide/Chappal** SVG logo with bronze and emerald-teal gradients.
* Both feature a sunset-orange gradient wave stripe and spring hover bounce scales.

### 3. Floating Hero Shoe Showcase
* Features a parallax floating sneaker image running on keyframe coordinates.
* Kept completely clean with a **10px curved corner radius** (`border-radius: 10px`) and no surrounding card container or border outlines.

### 4. Interactive 360° Virtual Product Rotation
* Select any sneaker and toggle the **"360° View"** tab inside the details modal.
* Fully interactive: users can click and drag the image horizontally or drag the slider control to inspect the sneaker at 16 different angles.

### 5. Dynamic Color & Filter Customization
* Selecting a color indicator updates the product gallery, thumbnail grid, and 360° viewer in real-time using CSS filter shifts (hue rotation, saturation, and contrast scaling).
* Includes custom size selectors and active heart indicators that turn crimson red on favorite selection.

### 6. Cross-Brand Cross-Selling
* A recommendations grid strictly matches the vendor brand.
* Dynamically cross-sells matching slides when viewing a sneaker, and matching sneakers when viewing a slide.

### 7. INR Pricing & Coupons
* Currency format localized to Indian Rupees (`₹`) with commas (e.g., `₹12,499`).
* Supports the special 20% discount checkout coupon: `Sriram040605`.
### 8. Target Gender Categorization (Men vs. Women)
* Products are segmented into **Men's**, **Women's**, and **Unisex** collections.
* Offers quick navigation redirects from the homepage "Shop by Gender" cards.
* Displays dedicated "Shop by Gender" homepage blocks with responsive scaling animations.
* Integrates matching sidebar controls to filter products dynamically while showing Unisex sizing naturally.
### 9. Floating AI Chat Guide (Sparkles Assistant)
* A floating, glassmorphic chat widget centered at the bottom right of the page.
* Offers smart local NLP keyword detection to recommend running/basketball shoes, slides, or brand lists.
* Returns interactive scrollable shoe cards directly within the chat bubble with fully functional "Details" and "Add to Cart" actions.
* Integrates store FAQs for shipping, return policies, customer support contacts, and promotional coupons.
* Automatically switches layout, opacity levels, and color themes dynamically to remain legible in both dark and light modes.

### 10. Circular Reveal Theme View Transition
* Utilizes the modern browser View Transitions API to animate theme shifts.
* When clicking the dark/light mode button in the header, a circular reveal clip-path sweeps across the screen starting exactly from the click cursor position (top-right) towards the bottom-left corner of the page.

---

## 🎨 Theme Colors Configuration

| UI Variable | Cyberpunk Dark Mode (`[data-theme="dark"]`) | Luxury Light Mode (`[data-theme="light"]`) |
| :--- | :--- | :--- |
| **Primary BG** | `#0b0c10` (Deep Black) | `#f5f7fa` (Cool Soft White) |
| **Secondary BG** | `#1f2833` (Dark Gunmetal) | `#ffffff` (Pure Card White) |
| **Primary Text** | `#f5f5f7` (Silver Gray) | `#1e2229` (Charcoal Slate) |
| **Secondary Text** | `#c5a880` (Sand Gold) | `#9e8055` (Bronze Gold) |
| **Accent Neon** | `#66fcf1` (Cyan Glow) | `#009688` (Emerald Teal) |
| **Accent Crimson** | `#ff2a5f` (Vibrant Pink/Red) | `#d81b60` (Rose Crimson) |
| **Card Border** | `rgba(255, 255, 255, 0.08)` | `rgba(30, 34, 41, 0.08)` |

---

## 📂 Codebase Architecture & File Links

Below is the structured index of pages and components in the application:

### Context & State Provider
* [CartContext.jsx](file:///c:/Users/luhit/OneDrive/Desktop/Shoe%20Shop/src/context/CartContext.jsx) - Manages global state including shopping cart arrays, wishlists, and active dark/light mode configurations.

### Main Components
* [Header.jsx](file:///c:/Users/luhit/OneDrive/Desktop/Shoe%20Shop/src/components/Header.jsx) - Contains the navigation links, dynamic SVG logo switchers, and the floating cart/theme controls.
* [Footer.jsx](file:///c:/Users/luhit/OneDrive/Desktop/Shoe%20Shop/src/components/Footer.jsx) - Implements the page footer, secondary dynamic logos, and brand info.
* [BrandLogo.jsx](file:///c:/Users/luhit/OneDrive/Desktop/Shoe%20Shop/src/components/BrandLogo.jsx) - Shared component rendering theme-responsive sneaker/slide SVGs.
* [GenderIcons.jsx](file:///c:/Users/luhit/OneDrive/Desktop/Shoe%20Shop/src/components/GenderIcons.jsx) - Shared component providing custom Men and Women collection SVGs.
* [ShoeCard.jsx](file:///c:/Users/luhit/OneDrive/Desktop/Shoe%20Shop/src/components/ShoeCard.jsx) - Card component presenting ratings, pricing, category indicators, and cart buttons.
* [Filters.jsx](file:///c:/Users/luhit/OneDrive/Desktop/Shoe%20Shop/src/components/Filters.jsx) - The sidebar control panel managing brand checklists, price ranges, categories, and resets.
* [AIChat.jsx](file:///c:/Users/luhit/OneDrive/Desktop/Shoe%20Shop/src/components/AIChat.jsx) - Floating AI assistant with custom scrollable product recommendation sliders and FAQ responders.

### Pages
* [Home.jsx](file:///c:/Users/luhit/OneDrive/Desktop/Shoe%20Shop/src/pages/Home.jsx) - Frontpage showcasing the animated hero shoe, brand cards, category buttons, and newsletter.
* [Shop.jsx](file:///c:/Users/luhit/OneDrive/Desktop/Shoe%20Shop/src/pages/Shop.jsx) - Layout for category filtering and collection navigation.
* [Cart.jsx](file:///c:/Users/luhit/OneDrive/Desktop/Shoe%20Shop/src/pages/Cart.jsx) - Checkout sheet with items lists, promo code calculations, payment selectors, and order completion screens.

### Design System & Assets
* [index.css](file:///c:/Users/luhit/OneDrive/Desktop/Shoe%20Shop/src/index.css) - Houses variable sets, scrollbar configurations, keyframe animations, and styling overrides.
* [data.js](file:///c:/Users/luhit/OneDrive/Desktop/Shoe%20Shop/src/data/data.js) - Contains the localized product list representing global sneaker and sandal catalogs.
* [index.html](file:///c:/Users/luhit/OneDrive/Desktop/Shoe%20Shop/index.html) - Entry point of the web app containing updated SEO headers.

---

## 🛠️ Getting Started (Local Run)

1. Navigate to the project root directory in your powershell terminal.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and go to: [http://localhost:5173/](http://localhost:5173/)
5. Build the production package:
   ```bash
   npm run build
   ```

import React, { useState, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { shoes, brands } from "../data/data";
import ShoeCard from "../components/ShoeCard";
import { ArrowRight } from "lucide-react";
import { MenIcon, WomenIcon } from "../components/GenderIcons";

const brandLogos = {
  Nike: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 7.8L6.442 15.276c-1.456.616-2.679.925-3.668.925-1.12 0-1.933-.392-2.437-1.177-.317-.504-.41-1.143-.28-1.918.13-.775.476-1.6 1.036-2.478.467-.71 1.232-1.643 2.297-2.8a6.122 6.122 0 00-.784 1.848c-.28 1.195-.028 2.072.756 2.632.373.261.886.392 1.54.392.522 0 1.11-.084 1.764-.252L24 7.8z" />
    </svg>
  ),
  Adidas: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="m24 19.535-8.697-15.07-4.659 2.687 7.145 12.383Zm-8.287 0L9.969 9.59 5.31 12.277l4.192 7.258ZM4.658 14.723l2.776 4.812H1.223L0 17.41Z" />
    </svg>
  ),
  Puma: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.845 3.008c-.417-.533-1.146-.106-1.467.08-2.284 1.346-2.621 3.716-3.417 5.077-.626 1.09-1.652 1.89-2.58 1.952-.686.049-1.43-.084-2.168-.405-1.807-.781-2.78-1.792-3.017-1.97-.487-.37-4.23-4.015-7.28-4.164 0 0-.372-.75-.465-.763-.222-.025-.45.451-.616.501-.15.053-.413-.512-.565-.487-.153.02-.302.586-.6.877-.22.213-.486.2-.637.463-.052.096-.034.265-.093.42-.127.32-.551.354-.555.697 0 .381.357.454.669.72.248.212.265.362.554.461.258.088.632-.187.964-.088.277.081.543.14.602.423.054.256 0 .658-.34.613-.112-.015-.598-.174-1.198-.11-.725.077-1.553.309-1.634 1.11-.041.447.514.97 1.055.866.371-.071.196-.506.399-.716.267-.27 1.772.944 3.172.944.593 0 1.031-.15 1.467-.605.04-.029.093-.102.155-.11a.632.632 0 01.195.088c1.131.897 1.984 2.7 6.13 2.721.582.007 1.25.279 1.796.777.48.433.764 1.125 1.037 1.825.418 1.053 1.161 2.069 2.292 3.203.06.068.99.78 1.06.833.012.01.084.167.053.255-.02.69-.123 2.67 1.365 2.753.366.02.275-.231.275-.41-.005-.341-.065-.685.113-1.04.253-.478-.526-.709-.509-1.756.019-.784-.645-.651-.984-1.25-.19-.343-.368-.532-.35-.946.073-2.38-.517-3.948-.805-4.327-.227-.294-.423-.403-.207-.54 1.24-.815 1.525-1.574 1.525-1.574.66-1.541 1.256-2.945 2.075-3.57.166-.12.589-.44.852-.56.763-.362 1.173-.578 1.388-.788.356-.337.635-1.053.294-1.48z" />
    </svg>
  ),
  Jordan: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.55 2.194v-.075c0-.35.113-.663.338-.938.225-.275.512-.412.862-.412s.663.112.938.337.425.525.45.9c.025.375-.088.688-.338.938s-.55.375-.9.375l-.225.075.075.112-.075.413-.15 1.2c.05.05.075.1.075.15l-.15.75c-.05.1-.1.175-.15.225l-.075.3a22.59 22.59 0 01-.45 1.575v.15c-.05.25-.087.45-.112.6-.025.15-.113.4-.263.75-.1.2-.1.525 0 .975l.075.075c0 .15.063.325.188.525s.187.375.187.525c.05 1-.025 1.85-.225 2.55l.15.45c.6.3.775.625.525.975l.375.15c.6.3 1.025.562 1.275.787.25.225.5.463.75.713.2.05.35.125.45.225l.225.075c1.05.7 2.1 1.55 3.15 2.55l.3.225v.075l-.075.15.225.15h.075c.15.1.25.15.3.15h.075c.05 0 .1-.025.15-.075l.15-.075c.1-.1.2-.175.3-.225h.3c.05 0 .05.025 0 .075l-.3.15-.375.45h.525l.525.075c.15-.05.275-.1.375-.15l.375-.225c.15-.05.3 0 .45.15h.075c.05.05.025.125-.075.225l-.9.825c-.25.2-.475.325-.675.375l-.975.675c-.05.05-.1.05-.15 0l-.225-.3-.15-.3-.188-.263-.225-.3-.187-.225-.15-.187-.3-.225c-.1 0-.2-.025-.3-.075l-.975-.75c-.15 0-.325-.075-.525-.225-.75-.65-1.25-1.05-1.5-1.2l-.45-.3-.9-.15c-.3-.05-.7-.2-1.2-.45l-.6-.3c-.4-.2-.675-.3-.825-.3l-.3-.15c-.2-.05-.35-.1-.45-.15l-.15-.15c-.1 0-.2.025-.3.075l-1.5.75-1.875.825c-.5.4-.975.725-1.425.975l-.825.375-1.275.9c-.1.1-.2.1-.3 0l-.15.15c-.15.05-.25.075-.3.075l-.3.15v.15H3.2l-.15.225c-.1.2-.2.312-.3.337-.1.025-.162.063-.187.113a.434.434 0 01-.075.112l-.15.15-.225.15-.338-.037-.45.075-.3.075c-.25.05-.45.012-.6-.113-.15-.125-.275-.312-.375-.562-.1-.15-.05-.275.15-.375l.075-.075c.05-.05.125-.075.225-.075h.45l.6-.225.3-.075c0-.1.025-.175.075-.225.05-.05.125-.075.225-.075v-.075a.666.666 0 01-.075-.3c-.05-.1-.063-.175-.037-.225.025-.05.05-.075.075-.075h.037l.075.225c.05.25.125.325.225.225l.075-.15c.05-.1.125-.15.225-.15l.15.15.15-.15-.075-.075c0-.05.025-.075.075-.075l.3-.3c.25-.3.55-.575.9-.825.7-.55 1.45-.975 2.25-1.275.25-.25.525-.375.825-.375.2-.35.5-.725.9-1.125.35-.25.6-.425.75-.525.1-.2.225-.3.375-.3h.075l.15-.15c.1-.05.175-.1.225-.15v-.375c0-.25.025-.45.075-.6.05-.15.175-.225.375-.225l.3-.3c-.1-.2-.15-.425-.15-.675h-.075c-.1-.15-.15-.3-.15-.45-.15-.25-.25-.45-.3-.6H9.65c-.05.15-.175.25-.375.3l-.075.15c-.2.35-.375.612-.525.787-.15.175-.425.388-.825.638-.25.25-.425.525-.525.825-.05.15-.05.3 0 .45l-.075.15h.075c0 .1.025.15.075.15h.075c.1.05.15.112.15.187s-.075.1-.225.075a.606.606 0 0 1-.337-.15c-.075-.075-.138-.112-.188-.112l-.225.225c-.1.15-.2.212-.3.187-.1-.025-.125-.062-.075-.112l.075-.075c.05-.1.05-.15 0-.15l-.6.15c-.05.05-.112.05-.187 0s-.063-.1.037-.15l.375-.15c0-.05-.025-.075-.075-.075-.2.1-.4.125-.6.075l-.375-.075-.075-.075c0-.05.025-.075.075-.075.2.05.45.025.75-.075l.525-.225.6-.675.075-.15c.2-.4.413-.763.638-1.088a3.68 3.68 0 0 1 .712-.787l.075-.3c.1-.2.2-.375.3-.525.1-.15.225-.35.375-.6l.225-.3c.2-.3.425-.45.675-.45l.225-.225c.05-.05.075-.125.075-.225l.15-.15-.075-.075c-.3-.25-.45-.475-.45-.675-.05-.35.063-.65.338-.9s.55-.363.825-.338c.275.025.487.113.637.263l.15.15c.05 0 .075.025.075.075l.3.15v.225c.1.1.15.175.15.225.1-.15.25-.325.45-.525l.375-1.2c0-.2.05-.4.15-.6l.15-.225v-.15l.225-.9h.15l.225-.9a.933.933 0 0 0 0-.525l-.3-.75-.15-.6z" />
    </svg>
  ),
  Reebok: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.79 8.788H0c8.862 1.6 13.133 3.66 20 6.572-.587-.439-10.051-6.013-11.209-6.572m6.201 2.692C17.744 10.38 19.458 9.748 24 8.64c-2.467.163-7.922.537-11.682 1.271l2.673 1.57m-8.56 3.651h3.6c.713-1.08 1.422-1.606 2.248-2.191a71.382 71.382 0 0 0-1.892-.701c-2.297 1.014-3.575 2.375-3.953 2.892m.709-3.928c-3.21 1.147-4.994 2.393-6.199 3.928h3.975c.387-.539 1.862-2.093 4.633-3.174a57.092 57.092 0 0 0-2.41-.754" />
    </svg>
  ),
  "Under Armour": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.954 12c-.089.066-.195.142-.324.233-.826.585-2.023.985-3.58.985h-.104c-1.556 0-2.755-.4-3.58-.985A36.43 36.43 0 0 1 8.042 12c.09-.067.196-.143.324-.234.825-.584 2.024-.985 3.58-.985h.104c1.557 0 2.756.401 3.58.985.129.09.235.167.325.234M24 7.181s-.709-.541-2.95-1.365c-1.968-.721-3.452-.883-3.452-.883l.006 4.243c0 .598-.162 1.143-.618 1.765-1.672-.61-3.254-.985-4.981-.985-1.728 0-3.308.375-4.98.985-.457-.619-.62-1.168-.62-1.765l.007-4.243s-1.494.16-3.463.883C.709 6.642 0 7.181 0 7.181c.093 1.926 1.78 3.638 4.435 4.82C1.777 13.18.09 14.887 0 16.818c0 0 .709.54 2.949 1.365 1.968.721 3.453.883 3.453.883l-.007-4.244c0-.597.164-1.143.619-1.764 1.672.61 3.252.983 4.98.983 1.727 0 3.309-.374 4.98-.983.457.62.62 1.167.62 1.764l-.006 4.244s1.484-.16 3.452-.883c2.241-.826 2.95-1.365 2.95-1.365-.093-1.927-1.78-3.64-4.435-4.819 2.657-1.182 4.343-2.888 4.435-4.82" />
    </svg>
  ),
  Converse: (
    <svg width="20" height="20" viewBox="33 0 56 55" fill="currentColor">
      <path d="M61.281 10.53l3.875 11.927h12.541l-10.145 7.369 3.875 11.927-10.146-7.371-10.145 7.371 3.875-11.927-10.145-7.369h12.539l3.876-11.927z" />
      <path d="M61.281 16.847c0 12.91-10.467 23.376-23.376 23.376S37.905 40.287 37.905 27.377 48.371 4 61.281 4s23.376 10.467 23.376 23.377z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M61.281 0c-15.12 0-27.376 12.257-27.376 27.377 0 15.119 12.257 27.376 27.376 27.376s27.376-12.257 27.376-27.376C88.657 12.257 76.401 0 61.281 0z" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  Vans: (
    <svg width="20" height="20" viewBox="0 0 192.756 192.756" fill="currentColor">
      <path d="M8.504 37.451h18.639l10.328 71.031 10.075-71.031h127.706l-4.281 20.403H63.164l-16.373 93.449h-18.64L8.504 37.451z" />
      <path d="M69.712 121.078l5.038-32.746 5.038 32.746H69.712zm-3.022 18.387h15.617l2.015 11.838h24.936v-46.85l15.365 46.85h12.846V64.151h-13.098v44.332l-14.609-44.332H96.161v81.863L82.055 64.151h-14.61l-15.113 87.152h12.846l1.512-11.838z" />
      <path d="M178.527 124.855c.504 11.082-5.793 27.959-19.648 27.959-16.119 0-19.646-19.898-19.646-28.211h13.098c0 4.785 4.031 9.572 7.053 9.572 3.023 0 6.047-3.779 6.047-6.297 0-2.52-1.008-6.297-5.793-9.572-15.619-9.32-19.145-20.152-19.145-29.471-.504-11.083 4.785-27.456 18.639-27.456 13.855 0 17.633 19.396 17.633 27.456h-12.342c0-4.534-3.023-7.808-6.045-7.808-3.023 0-5.039 3.022-5.039 5.542 0 2.519.504 4.786 5.291 8.06 6.548 3.023 19.897 12.846 19.897 30.226z" />
    </svg>
  ),
  "New Balance": (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.169 10.306l1.111-1.937 3.774-.242.132-.236-3.488-.242.82-1.414h6.47c1.99 0 3.46.715 2.887 2.8-.17.638-.979 2.233-3.356 2.899.507.06 1.76.616 1.54 2.057-.384 2.558-3.69 3.774-5.533 3.774l-7.641.006-.38-1.48 4.005-.28.137-.237-4.346-.264-.467-1.755 6.178-.363.137-.231-11.096-.693.534-.925 11.948-.775.138-.231-3.504-.231m5 .385l1.1-.006c.738-.005 1.502-.34 1.783-1.018.259-.632-.088-1.171-.55-1.166h-1.067l-1.266 2.19zm-1.27 2.195l-1.326 2.305h1.265c.589 0 1.64-.292 1.964-1.128.302-.781-.253-1.177-.638-1.177h-1.266z" />
    </svg>
  ),
  Asics: (
    <svg width="20" height="20" viewBox="0 0 192.756 192.756" fill="currentColor">
      <path d="M64.424 109.836S45.951 97.42 73.812 65.624c0 0 9.287-11.81 25.639-17.867 16.352-6.057 18.572 2.827 18.17 7.066 0 0 15.746-18.573 6.662-28.465 0 0-7.875-8.479-31.091 11.709l-1.211-.808s27.457-27.456 41.791-19.583c0 0 16.15 6.258 1.615 35.33 0 0-11.307 23.418-26.648 36.945-.001 0-28.669 29.879-44.315 19.885z" />
      <path d="M113.582 53.814s-4.037-6.46-20.39 8.479c0 0-12.718 12.92-8.277 18.977 0 0 6.864 6.056 20.592-9.085.001 0 12.516-12.113 8.075-18.371z" />
    </svg>
  ),
  Fila: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.814 8.027c-.614 0-1.113.498-1.113 1.113v5.72a1.113 1.113 0 0 0 2.226 0V9.14c0-.614-.498-1.113-1.113-1.113m-2.849.078H1.113a1.113 1.113 0 0 0 0 2.226h4.852a1.113 1.113 0 0 0 0-2.226m17.411 4.417L21.03 8.705c-.275-.444-.65-.658-1.125-.658-.488 0-.904.229-1.162.658l-2.715 4.5c-.186.308-.4.436-.753.436h-2.019a.275.275 0 0 1-.285-.284V9.102c0-.613-.497-1.075-1.11-1.075-.614 0-1.11.463-1.11 1.076v5.215c0 .784.774 1.544 1.544 1.544h4.064c.576 0 .963-.42 1.292-.996l2.114-3.627c.018-.04.053-.091.093-.091.043 0 .07.051.091.088l1.384 2.22c.058.094.069.141.032.225-.033.077-.108.093-.23.093h-1.943a1.044 1.044 0 1 0 0 2.088h3.17c.77 0 1.638-.734 1.638-1.693 0-.608-.117-.822-.624-1.647M5.431 10.954H1.113c-.615 0-1.113.498-1.113 1.113v2.715a1.113 1.113 0 1 0 2.226 0v-1.268c0-.185.15-.334.334-.334h2.87a1.113 1.113 0 0 0 0-2.226" />
    </svg>
  ),
  Skechers: (
    <svg width="20" height="20" viewBox="0 0 192.756 192.756" fill="currentColor">
      <path d="M167.145 77.432l-12.846 6.875-.928.475 1.344 1.249c3.217 3.333 4.996 6.998 4.996 10.846 0 3.786-1.725 7.396-4.842 10.685l-.861.692 1.238.695 11.943 6.334-.127.148c-14.205 11.083-40.42 18.522-70.411 18.522-30.2 0-56.446-7.455-70.58-18.671l-.124-.089 11.881-5.725 1.264-.622-.879-.876c-3.368-3.399-5.236-7.151-5.236-11.095 0-3.842 1.774-7.503 4.98-10.83l1.179-1.109-13.593-7.135.258-.125C39.895 66.397 66.347 58.803 96.65 58.803c29.901 0 56.045 7.391 70.278 18.417l.217.212zm9.06-1.459c-16.102-11.748-45.68-19.62-79.503-19.62-34.284 0-64.207 8.089-80.152 20.103l-.292.134 15.379 7.6-1.333 1.183c-3.627 3.545-5.634 7.443-5.634 11.535 0 4.202 2.114 8.197 5.924 11.818l.992.934-1.427.662-13.443 6.1.143.096c15.983 11.945 45.677 19.887 79.844 19.887 33.927 0 63.585-7.922 79.65-19.729l.146-.157-13.512-6.75-1.4-.739.975-.737c3.527-3.504 5.475-7.348 5.475-11.383 0-4.098-2.01-8.001-5.65-11.553l-1.521-1.33 1.053-.505 14.533-7.326-.247-.223z" />
      <path d="M92.168 118.638c-8.594-.048-13.998-.267-22.01-1.038-4.102-.394-6.344-.53-10.277-1.484-4.973-1.204-8.514-2.095-12.29-4.588-1.83-1.21-3.25-2.361-3.514-4.388-.405-3.139 2.58-4.531 4.725-5.933 1.129-.737 4.525-2.743 7.24-1.722 2.107.796 2.536 2.858 3.983 4.172 1.676 1.528 6.835 3.154 6.835 3.154 3.71 1.137 5.927 1.029 9.598 1.906 1.961.451 12.93 1.075 21.205.876 4.895-.117 12.186-.83 14.545-1.222 2.477-.409 7.201-1.489 7.527-3.225.502-2.629-6.684-4.176-8.289-4.403-1.117-.159-6.955-.937-6.955-.937s-9.37-.739-15.355-1.274c-5.303-.475-11.877-1.093-13.586-1.294-2.34-.122-12.116-1.928-14.915-2.884-4.921-1.681-11.951-3.051-11.816-8.669.062-2.633 2.3-3.967 4.295-5.213 2.409-1.509 6.222-2.582 9.826-3.611 3.091-.884 11.565-2.19 16.844-2.614 1.018-.04 8.918-.544 14.628-.634 5.281-.083 8.263-.05 13.539.125 4.229.14 6.617.211 10.83.569 7.598.64 17.357 1.969 19.357 2.76 1.615.608 3.459.625 3.377 2.282-.094 1.858-5.996 3.655-7.938 4.367-2.357.854-5.223 1.59-8.484 1.419-1.586-.083-2.9-.264-4.049-.562 0 0-8.666-2.248-14.326-2.965-4.689-.595-7.373-.75-12.104-.746-3.957.004-6.193.183-10.132.543-3.85.348-8.63 1.862-8.779 3.712-.151 1.877 4.463 2.809 7.308 3.409 2.293.487 5.009.737 8.223 1.133 8.221 1.012 12.922.95 21.16 1.811 4.396.459 6.893.626 11.264 1.29 5.59.851 9.818 1.678 14.211 2.85 5.506 1.47 11.797 3.851 11.973 7.495.215 4.395-4.701 7.342-8.529 9.008-3.957 1.722-8.904 2.917-13.506 3.725-2.367.693-12.361 1.928-20.33 2.444-5.959.383-9.336.387-15.309.356z" />
    </svg>
  )
};

const Home = ({ onOpenDetails }) => {
  const { navigateTo } = useCart();
  const [activeTab, setActiveTab] = useState("Shoes");

  const displayItems = useMemo(() => {
    if (activeTab === "Shoes") {
      const featured = shoes.filter((s) => s.isFeatured && s.category !== "Chappals");
      if (featured.length >= 4) return featured.slice(0, 4);
      const nonFeatured = shoes.filter((s) => !s.isFeatured && s.category !== "Chappals");
      return [...featured, ...nonFeatured].slice(0, 4);
    } else {
      const featured = shoes.filter((s) => s.isFeatured && s.category === "Chappals");
      const nonFeatured = shoes.filter((s) => !s.isFeatured && s.category === "Chappals");
      return [...featured, ...nonFeatured].slice(0, 4);
    }
  }, [activeTab]);

  return (
    <div className="home-view">
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <h1>
              Step Into The <br />
              <span>Future of Style</span>
            </h1>
            <p>
              Discover elite performance, cushioned comfort, and modern aesthetics. SriRam's FootWear offers the absolute best sneakers from global icons.
            </p>
            <div className="hero-btn-group">
              <button className="btn-primary" onClick={() => navigateTo("shop")}>
                Shop Collection <ArrowRight size={18} />
              </button>
              <button
                className="btn-secondary"
                onClick={() => {
                  const el = document.getElementById("brands-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Explore Brands
              </button>
            </div>
          </div>
          <div className="hero-image-wrapper">
            <div className="hero-circle-bg"></div>
            <img
              src="/images/shoes/jordan-retro.png"
              alt="Featured Nike Sneaker"
              className="hero-image"
            />
          </div>
        </div>
      </section>

      <section id="brands-section" className="brand-showcase-section">
        <div className="container">
          <h2 className="brand-section-title">Explore Global Brands</h2>
          <div className="brand-grid">
            {brands.map((brand) => (
              <button
                key={brand}
                className="brand-card"
                onClick={() => navigateTo("shop", brand)}
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                {brandLogos[brand]}
                <span>{brand}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ borderBottom: "1px solid var(--card-border)", padding: "60px 0" }}>
        <div className="container">
          <h2 className="brand-section-title" style={{ marginBottom: "32px" }}>Shop by Gender</h2>
          <div 
            style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
              gap: "30px" 
            }}
          >
            {/* Men's Collection Card */}
            <div 
              className="shoe-card" 
              onClick={() => navigateTo("shop", "All", "All", "Men")}
              style={{
                position: "relative",
                height: "240px",
                overflow: "hidden",
                borderRadius: "var(--border-radius-lg)",
                cursor: "pointer",
                background: "linear-gradient(135deg, var(--accent-neon-glow) 0%, var(--bg-secondary) 100%)",
                border: "1px solid var(--card-border)",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "30px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent-neon)";
                e.currentTarget.style.boxShadow = "0 10px 25px var(--accent-neon-glow)";
                e.currentTarget.style.transform = "translateY(-4px)";
                const img = e.currentTarget.querySelector(".gender-card-img");
                if (img) img.style.transform = "scale(1.1) rotate(-15deg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--card-border)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
                const img = e.currentTarget.querySelector(".gender-card-img");
                if (img) img.style.transform = "scale(1) rotate(-10deg)";
              }}
            >
              <div style={{ zIndex: 2 }}>
                <h3 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "10px" }}>
                  <MenIcon size={28} style={{ marginRight: 0 }} /> Men
                </h3>
                <p style={{ color: "var(--accent-neon)", fontWeight: "700", display: "flex", alignItems: "center", gap: "6px", marginTop: "10px", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Explore Collection <ArrowRight size={14} />
                </p>
              </div>
              <img 
                src="/images/shoes/nike-air-max.png" 
                alt="Men's Collection" 
                className="gender-card-img"
                style={{
                  maxHeight: "140px",
                  objectFit: "contain",
                  transform: "rotate(-10deg)",
                  transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  filter: "drop-shadow(0 10px 20px rgba(0, 0, 0, 0.4))",
                  zIndex: 1
                }}
              />
            </div>

            {/* Women's Collection Card */}
            <div 
              className="shoe-card" 
              onClick={() => navigateTo("shop", "All", "All", "Women")}
              style={{
                position: "relative",
                height: "240px",
                overflow: "hidden",
                borderRadius: "var(--border-radius-lg)",
                cursor: "pointer",
                background: "linear-gradient(135deg, var(--accent-crimson-glow) 0%, var(--bg-secondary) 100%)",
                border: "1px solid var(--card-border)",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "30px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent-crimson)";
                e.currentTarget.style.boxShadow = "0 10px 25px var(--accent-crimson-glow)";
                e.currentTarget.style.transform = "translateY(-4px)";
                const img = e.currentTarget.querySelector(".gender-card-img");
                if (img) img.style.transform = "scale(1.15) rotate(-5deg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--card-border)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
                const img = e.currentTarget.querySelector(".gender-card-img");
                if (img) img.style.transform = "scale(1) rotate(-10deg)";
              }}
            >
              <div style={{ zIndex: 2 }}>
                <h3 style={{ fontSize: "2rem", fontWeight: 800, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "10px" }}>
                  <WomenIcon size={28} style={{ marginRight: 0 }} /> Women
                </h3>
                <p style={{ color: "var(--accent-crimson)", fontWeight: "700", display: "flex", alignItems: "center", gap: "6px", marginTop: "10px", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Explore Collection <ArrowRight size={14} />
                </p>
              </div>
              <img 
                src="/images/shoes/fila-disruptor.png" 
                alt="Women's Collection" 
                className="gender-card-img"
                style={{
                  maxHeight: "130px",
                  objectFit: "contain",
                  transform: "rotate(-10deg)",
                  transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  filter: "drop-shadow(0 10px 20px rgba(0, 0, 0, 0.4))",
                  zIndex: 1
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
            <div>
              <h2 className="section-title">
                Featured <span>{activeTab === "Shoes" ? "Sneakers" : "Chappals"}</span>
              </h2>
              <p className="section-subtitle">Handpicked styles chosen just for you</p>
            </div>

            {/* Separate Toggle Buttons */}
            <div 
              style={{ 
                display: "flex", 
                gap: "6px", 
                background: "rgba(255, 255, 255, 0.03)", 
                padding: "6px", 
                borderRadius: "30px", 
                border: "1px solid var(--card-border)" 
              }}
            >
              <button 
                onClick={() => setActiveTab("Shoes")}
                style={{
                  padding: "8px 22px",
                  borderRadius: "20px",
                  fontWeight: "700",
                  fontSize: "0.85rem",
                  backgroundColor: activeTab === "Shoes" ? "var(--accent-neon)" : "transparent",
                  color: activeTab === "Shoes" ? "var(--bg-primary)" : "var(--text-muted)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: activeTab === "Shoes" ? "0 2px 8px var(--accent-neon-glow)" : "none"
                }}
              >
                Shoes
              </button>
              <button 
                onClick={() => setActiveTab("Chappals")}
                style={{
                  padding: "8px 22px",
                  borderRadius: "20px",
                  fontWeight: "700",
                  fontSize: "0.85rem",
                  backgroundColor: activeTab === "Chappals" ? "var(--accent-neon)" : "transparent",
                  color: activeTab === "Chappals" ? "var(--bg-primary)" : "var(--text-muted)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: activeTab === "Chappals" ? "0 2px 8px var(--accent-neon-glow)" : "none"
                }}
              >
                Chappals
              </button>
            </div>

            <a
              href="#shop"
              className="view-all-link"
              onClick={(e) => {
                e.preventDefault();
                navigateTo("shop", "All", activeTab);
              }}
            >
              View All {activeTab} <ArrowRight size={16} />
            </a>
          </div>

          <div className="product-grid">
            {displayItems.map((shoe) => (
              <ShoeCard key={shoe.id} shoe={shoe} onOpenDetails={onOpenDetails} />
            ))}
          </div>
        </div>
      </section>



      <section className="container" style={{ marginBottom: "80px" }}>
        <div className="promo-banner">
          <div className="promo-glow"></div>
          <div className="promo-grid">
            <div className="promo-content">
              <h3>
                Get <span>20% OFF</span> Your <br />
                First Order on Shoes & Chappals
              </h3>
              <p>
                Sign up for our newsletter or make your first order to unlock exclusive benefits, free shipping, and limited release access on both premium sneakers and slides.
              </p>
              <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
                <span
                  style={{
                    backgroundColor: "var(--bg-primary)",
                    border: "1px dashed var(--accent-neon)",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    fontWeight: "700",
                    letterSpacing: "0.1em",
                    color: "var(--accent-neon)",
                  }}
                >
                  Sriram040605
                </span>
                <button 
                  className="btn-secondary" 
                  style={{ padding: "12px 24px" }} 
                  onClick={() => navigateTo("shop")}
                >
                  Claim Discount on Shoes & Chappals
                </button>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative", height: "220px", width: "100%" }}>
              <img
                src="/images/shoes/nike-air-max.png"
                alt="Promo Shoe"
                className="promo-image animated-promo-shoe"
                style={{
                  maxHeight: "160px",
                  position: "absolute",
                  zIndex: 2
                }}
              />
              <img
                src="/images/shoes/nike-slide.png"
                alt="Promo Slide"
                className="promo-image animated-promo-slide"
                style={{
                  maxHeight: "140px",
                  position: "absolute",
                  filter: "hue-rotate(180deg)",
                  zIndex: 1
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

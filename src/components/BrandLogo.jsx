import React from "react";

const BrandLogo = ({ isDark, style = {} }) => {
  if (isDark) {
    return (
      <svg
        className="logo-icon"
        viewBox="0 0 24 24"
        style={{
          transition: "all 0.3s ease",
          width: "32px",
          height: "32px",
          transform: "rotate(-10deg)",
          display: "inline-block",
          ...style
        }}
      >
        <defs>
          <linearGradient id="logoUpperGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#66fcf1" />
            <stop offset="100%" stopColor="#1f2833" />
          </linearGradient>
          <linearGradient id="logoStripeGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff2a5f" />
            <stop offset="100%" stopColor="#ff9f43" />
          </linearGradient>
          <linearGradient id="logoSoleGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c5a880" />
            <stop offset="100%" stopColor="#0b0c10" />
          </linearGradient>
        </defs>
        {/* Outersole */}
        <path 
          d="M 2 19.5 C 8 20.5, 16 20.5, 22 18 L 21.5 19.5 C 15.5 21.5, 8.5 21.5, 2 20.5 L 2 19.5 Z" 
          fill="url(#logoSoleGradDark)" 
        />
        {/* Midsole */}
        <path 
          d="M 2 18 C 8 19, 16 19, 22 16.5 L 22 18 C 16 20, 8 20, 2 19 L 2 18 Z" 
          fill="url(#logoSoleGradDark)" 
        />
        {/* Shoe Upper */}
        <path 
          d="M 3.5 17.5 C 2.5 14, 4 9.5, 6.5 8 C 7.5 7.2, 9 7.8, 9.5 9 L 11 12 L 17.5 13.5 C 19.5 14, 21 15, 21.5 16 C 16 18, 9 18.5, 3.5 17.5 Z" 
          fill="url(#logoUpperGradDark)" 
        />
        {/* Swoosh/Stripe */}
        <path 
          d="M 6 14 C 9.5 13, 13 13.5, 17.5 14.8 C 16 13.5, 12 11, 9.5 11 C 7.8 11, 6.8 12.2, 6 14 Z" 
          fill="url(#logoStripeGradDark)" 
        />
        {/* Laces */}
        <path 
          d="M 9.2 9.2 L 10.8 8.8 M 10.2 10.5 L 11.8 10 M 11 11.8 L 12.6 11.2" 
          stroke="#ffffff" 
          strokeWidth="1.2" 
          strokeLinecap="round" 
        />
      </svg>
    );
  } else {
    return (
      <svg
        className="logo-icon"
        viewBox="0 0 24 24"
        style={{
          transition: "all 0.3s ease",
          width: "32px",
          height: "32px",
          transform: "rotate(-10deg)",
          display: "inline-block",
          ...style
        }}
      >
        <defs>
          <linearGradient id="logoUpperGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#009688" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
          <linearGradient id="logoStripeGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff2a5f" />
            <stop offset="100%" stopColor="#ff9f43" />
          </linearGradient>
          <linearGradient id="logoSoleGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9e8055" />
            <stop offset="100%" stopColor="#f5f7fa" />
          </linearGradient>
        </defs>
        {/* Slide Outersole */}
        <path 
          d="M 2 18 C 2 16.5, 4.5 16.5, 8.5 17 C 12.5 17.5, 17 17.5, 21 18.5 C 22.5 19, 22.5 20, 21 20.5 C 17 21.5, 12.5 21.5, 8.5 21 C 4.5 20.5, 2 19.5, 2 18 Z" 
          fill="url(#logoSoleGradLight)" 
        />
        {/* Slide Footbed */}
        <path 
          d="M 2.5 17.5 C 2.5 16.2, 4.8 16.2, 8.5 16.7 C 12.2 17.2, 16.5 17.2, 20.2 18.2 C 19.5 19.2, 14.5 19.5, 8.5 19 C 4.5 18.5, 2.5 18.2, 2.5 17.5 Z" 
          fill="url(#logoSoleGradLight)" 
          opacity="0.9"
        />
        {/* Slide Strap */}
        <path 
          d="M 6.5 17 C 7 11.5, 12.5 10.5, 15.5 14 C 13.2 16.5, 9.8 18.2, 6.5 17 Z" 
          fill="url(#logoStripeGradLight)" 
        />
        {/* Strap detailing stripe */}
        <path 
          d="M 8.5 14.5 C 10 12.5, 12 12, 13.5 13.5" 
          stroke="#ffffff" 
          strokeWidth="1.2" 
          strokeLinecap="round" 
        />
      </svg>
    );
  }
};

export default BrandLogo;

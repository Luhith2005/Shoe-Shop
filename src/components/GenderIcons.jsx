import React from "react";

export const MenIcon = ({ size = 18, style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    style={{ display: "inline-block", verticalAlign: "middle", marginRight: "6px", ...style }}
  >
    <defs>
      <linearGradient id="menIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00f2fe" />
        <stop offset="100%" stopColor="#4facfe" />
      </linearGradient>
    </defs>
    <path
      d="M3 18c6 1, 14 1, 19 -1.5l-0.5 -1.5c-5 1.5 -12 1.5 -18 .5z"
      fill="url(#menIconGrad)"
    />
    <path
      d="M3.5 16c0.5 -3.5, 4.5 -6.5, 7.5 -7l1.5 2.5l5.5 1.5c1.5 0.5, 2.5 1.5, 3 2.5c-5 1 -12.5 1.5 -17.5 0.5z"
      fill="url(#menIconGrad)"
      opacity="0.9"
    />
    <path d="M7.5 12.5c3 -1, 6 -0.5, 9.5 0.5" fill="none" stroke="#fff" strokeWidth="1" />
  </svg>
);

export const WomenIcon = ({ size = 18, style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    style={{ display: "inline-block", verticalAlign: "middle", marginRight: "6px", ...style }}
  >
    <defs>
      <linearGradient id="womenIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff0844" />
        <stop offset="100%" stopColor="#ffb199" />
      </linearGradient>
    </defs>
    <path
      d="M21 18c-3 -0.5, -6 -1.5, -9 -1.5c-4 0, -7 1.5, -9 3c4 -0.5, 8 -0.5, 12 -0.5c3 0, 5 0.5, 6 -1z"
      fill="url(#womenIconGrad)"
    />
    <path
      d="M5.5 18c0.5 -4, 3.5 -8.5, 7.5 -9.5c0.5 1.5, 1 3, 2.5 4.5c1.5 1.5, 3.5 2.5, 5 2.5c-2.5 1.5, -8 2, -15 0.5z"
      fill="url(#womenIconGrad)"
      opacity="0.9"
    />
    <path d="M12.5 14c-1 -1.5, -1 -3, 0 -4.5" fill="none" stroke="#fff" strokeWidth="1" />
  </svg>
);

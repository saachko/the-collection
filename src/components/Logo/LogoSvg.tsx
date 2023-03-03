import React, { memo } from 'react';

function LogoSvg() {
  return (
    <svg
      width="64"
      height="48"
      viewBox="0 0 64 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(180deg) scale(0.7)` }}
    >
      <g filter="url(#filter0_d_5520_2)">
        <path
          d="M30.1458 0.0622903L48.2057 18.1953L18.5874 47.9335L0.527565 29.8004L30.1458 0.0622903Z"
          fill="var(--secondary-color)"
        />
        <path
          d="M12.0959 18.0818L30.1558 -0.0512695L59.774 29.6869L41.7141 47.8199L12.0959 18.0818Z"
          fill="var(--primary-color)"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_5520_2"
          x="-3.47243"
          y="-0.0512695"
          width="67.2464"
          height="55.9848"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_5520_2"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_5520_2"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default memo(LogoSvg);

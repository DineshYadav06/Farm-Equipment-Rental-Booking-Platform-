import React from "react";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  showTagline = false,
  size = "md"
}) => {
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14"
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl"
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Custom Original FarmRentHub Icon: Modern Tractor + Green Sprout Leaf */}
      <div
        className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-700 text-white shadow-sm ring-1 ring-emerald-700/20 shrink-0 ${iconSizes[size]}`}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[68%] h-[68%] drop-shadow-xs"
        >
          {/* Tractor Hood and Cabin */}
          <path
            d="M6 18H16L18 13H11L6 18Z"
            fill="currentColor"
            fillOpacity="0.9"
          />
          <path
            d="M17 13H21C22.1 13 23 13.9 23 15V18H17V13Z"
            fill="#FEF08A"
          />
          <path
            d="M19 14.5H21.5V16.5H19V14.5Z"
            fill="#15803D"
          />
          {/* Exhaust Pipe with small leaf plume */}
          <rect x="9" y="10" width="1.5" height="4" rx="0.5" fill="#FEF08A" />
          {/* Sprout Leaf Element Growing from Front */}
          <path
            d="M9 10C9 7 13 7 13 7C13 10 9 10 9 10Z"
            fill="#86EFAC"
          />
          {/* Big Rear Tractor Wheel */}
          <circle cx="21" cy="21" r="5" fill="#1F2937" stroke="#FEF08A" strokeWidth="1.2" />
          <circle cx="21" cy="21" r="2.2" fill="#9CA3AF" />
          {/* Front Small Wheel */}
          <circle cx="9" cy="22" r="3.2" fill="#1F2937" stroke="#FEF08A" strokeWidth="1" />
          <circle cx="9" cy="22" r="1.4" fill="#9CA3AF" />
          {/* Hitch bar */}
          <path d="M26 21H23" stroke="#FEF08A" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        {/* Small subtle wheat grain badge on top-right corner */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-amber-400 text-[8px] font-bold text-amber-950 ring-2 ring-white">
          ★
        </span>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center tracking-tight font-extrabold leading-none">
          <span className={`text-slate-900 ${textSizes[size]}`}>Farm</span>
          <span className={`text-emerald-700 ${textSizes[size]}`}>Rent</span>
          <span className={`text-amber-600 ${textSizes[size]}`}>Hub</span>
        </div>
        {showTagline && (
          <span className="text-[10px] sm:text-xs font-medium text-slate-500 tracking-tight mt-0.5">
            Rent the Right Equipment. Grow with Ease.
          </span>
        )}
      </div>
    </div>
  );
};

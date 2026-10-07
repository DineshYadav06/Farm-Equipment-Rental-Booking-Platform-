import React from "react";

interface LogoProps {
  variant?: "horizontal" | "icon" | "print";
  size?: "sm" | "md" | "lg" | "xl";
  tagline?: string;
  className?: string;
  textColor?: string;
}

/**
 * Original FarmRentHub Logo Icon:
 * - A rising sun (golden amber #d97706)
 * - A tractor wheel (hub & tread) in deep green (#14532d)
 * - 4 stylized golden wheat grains rising from the center
 * Readable at 32px, flat, 2-3 colors, zero text inside icon.
 */
export const FarmRentHubIcon: React.FC<{
  size?: number;
  monochrome?: boolean;
  className?: string;
}> = ({ size = 36, monochrome = false, className = "" }) => {
  const sunColor = monochrome ? "#000000" : "#d97706";
  const wheelColor = monochrome ? "#000000" : "#14532d";
  const wheatColor = monochrome ? "#000000" : "#f59e0b";
  const hubColor = monochrome ? "#ffffff" : "#ffffff";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="FarmRentHub Logo Icon"
      role="img"
    >
      {/* 1. Rising Sun Behind Wheel & Wheat */}
      <circle cx="32" cy="24" r="14" fill={sunColor} opacity={monochrome ? 0.3 : 0.85} />
      {/* Sun rays */}
      <path
        d="M32 4V8M16 11L19 14M48 11L45 14M10 24H14M50 24H54"
        stroke={sunColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* 2. Tractor Wheel (Bottom Half / Rim) */}
      <path
        d="M12 44C12 55.0457 20.9543 64 32 64C43.0457 64 52 55.0457 52 44C52 35.8 47.1 28.7 40 25.6V30C44.7 32.8 48 38 48 44C48 52.8366 40.8366 60 32 60C23.1634 60 16 52.8366 16 44C16 38 19.3 32.8 24 30V25.6C16.9 28.7 12 35.8 12 44Z"
        fill={wheelColor}
      />
      
      {/* Tractor Tire Deep Tread Grooves */}
      <path d="M10 44H16M13 52L18 49M20 59L23 54M44 59L41 54M51 52L46 49M54 44H48" stroke={wheelColor} strokeWidth="3" strokeLinecap="round" />
      
      {/* Wheel Hub Center */}
      <circle cx="32" cy="44" r="6" fill={wheelColor} />
      <circle cx="32" cy="44" r="2.5" fill={hubColor} />

      {/* 3. Rising Wheat Grains (4 golden grains sprouting vertically) */}
      {/* Central Stem */}
      <path d="M32 44V12" stroke={wheatColor} strokeWidth="2.5" strokeLinecap="round" />
      {/* Bottom Grain Left & Right */}
      <path
        d="M32 30C28 27 25 28 26 33C27 35 32 35 32 35"
        fill={wheatColor}
      />
      <path
        d="M32 30C36 27 39 28 38 33C37 35 32 35 32 35"
        fill={wheatColor}
      />
      {/* Upper Grain Left & Right */}
      <path
        d="M32 21C27 18 25 20 26 24C27 26 32 26 32 26"
        fill={wheatColor}
      />
      <path
        d="M32 21C37 18 39 20 38 24C37 26 32 26 32 26"
        fill={wheatColor}
      />
      {/* Top Spire Grain */}
      <path
        d="M32 12C30 9 32 7 32 5C32 7 34 9 32 12Z"
        fill={wheatColor}
      />
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({
  variant = "horizontal",
  size = "md",
  tagline,
  className = "",
  textColor = "text-[#14532d]"
}) => {
  const pixelSizes = {
    sm: 28,
    md: 38,
    lg: 48,
    xl: 60
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl"
  };

  if (variant === "icon") {
    return <FarmRentHubIcon size={pixelSizes[size]} className={className} />;
  }

  if (variant === "print") {
    return (
      <div className={`inline-flex items-center gap-3 ${className}`}>
        <FarmRentHubIcon size={pixelSizes[size]} monochrome={true} />
        <div>
          <span className="font-serif font-black tracking-tight text-black text-xl">
            FarmRentHub
          </span>
          <div className="text-[10px] uppercase tracking-wider text-black font-semibold">
            OFFICIAL RENTAL RECEIPT
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <FarmRentHubIcon size={pixelSizes[size]} />
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-serif font-black tracking-tight ${textColor} ${textSizes[size]}`}
            style={{ fontFamily: "'Roboto Slab', 'Merriweather', serif" }}
          >
            FarmRent<span className="text-[#d97706]">Hub</span>
          </span>
        </div>
        {tagline && (
          <span className="text-[11px] sm:text-xs font-semibold text-[#44403c] tracking-normal mt-0.5 leading-tight">
            {tagline}
          </span>
        )}
      </div>
    </div>
  );
};

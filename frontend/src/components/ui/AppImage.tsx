"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IMAGES_REGISTRY, ImageSlot } from "@/content/images-registry";
import { useTranslation } from "@/i18n/context";
import { Tractor, Wheat, Sprout, User, AlertCircle } from "lucide-react";

export interface AppImageProps {
  imageId: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  alt?: string;
  showCredit?: boolean;
  isDecorative?: boolean;
}

const TINY_BLUR_SVG =
  "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%208%206%27%3E%3Crect%20width%3D%278%27%20height%3D%276%27%20fill%3D%27%23e8e8e0%27%2F%3E%3C%2Fsvg%3E";

function SlotIcon({ slot, className }: { slot?: ImageSlot; className: string }) {
  switch (slot) {
    case "hero":
    case "category":
    case "owner":
      return <Tractor className={className} />;
    case "region":
      return <Wheat className={className} />;
    case "about":
      return <User className={className} />;
    case "how-it-works":
    case "illustration":
    case "sample":
    default:
      return <Sprout className={className} />;
  }
}

export function AppImage({
  imageId,
  priority = false,
  sizes,
  className = "",
  imgClassName = "",
  alt,
  showCredit = true,
  isDecorative = false
}: AppImageProps) {
  const { t } = useTranslation();
  const [hasError, setHasError] = useState(false);

  const item = IMAGES_REGISTRY[imageId];

  // Resolve responsive sizes default based on slot if not explicitly provided
  const resolvedSizes =
    sizes ||
    (item?.slot === "hero"
      ? "(min-width: 1024px) 45vw, 100vw"
      : item?.slot === "category"
      ? "(min-width: 1024px) 25vw, 50vw"
      : "(min-width: 1024px) 33vw, 100vw");

  // Determine aspect ratio class
  const aspectClass =
    item?.aspect === "1:1"
      ? "aspect-square"
      : item?.aspect === "3:2"
      ? "aspect-[3/2]"
      : item?.aspect === "16:9"
      ? "aspect-[16/9]"
      : "aspect-[4/3]"; // default 4:3

  // Alt text resolution
  const resolvedAlt = isDecorative
    ? ""
    : alt !== undefined
    ? alt
    : item?.altKey
    ? t("images", item.altKey) || item.altKey
    : "";

  // Missing or failed image fallback
  if (!item || hasError) {
    return (
      <div className={`flex flex-col ${className}`}>
        <div
          className={`relative w-full ${aspectClass} bg-[#f3f4f0] rounded-[8px] border border-[#e5e5df] flex flex-col items-center justify-center p-4 text-center select-none overflow-hidden`}
        >
          {item?.isSample && (
            <span className="absolute top-2 right-2 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-md bg-amber-500/90 text-white shadow-xs backdrop-blur-xs select-none pointer-events-none z-10">
              {t("images", "sampleBadge") || "Sample"}
            </span>
          )}
          <SlotIcon slot={item?.slot} className="w-10 h-10 text-slate-400 mb-2 stroke-[1.5]" />
          <span className="text-xs font-semibold text-slate-600">
            {t("images", "photoToBeAdded") || "Photo to be added"}
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-wide">
            {imageId}
          </span>
        </div>
      </div>
    );
  }

  const isSvg = item.path.endsWith(".svg");

  return (
    <figure className={`flex flex-col m-0 p-0 ${className}`}>
      <div
        className={`relative w-full ${aspectClass} rounded-[8px] border border-[#e5e5df] overflow-hidden bg-[#e8e8e0]`}
      >
        {/* Sample Badge for placeholder images */}
        {item.isSample && (
          <span className="absolute top-2 right-2 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-md bg-amber-500/90 text-white shadow-xs backdrop-blur-xs select-none pointer-events-none z-10">
            {t("images", "sampleBadge") || "Sample"}
          </span>
        )}

        {isSvg ? (
          // SVG illustrations rendered directly or via img tag without blur placeholder
          <img
            src={item.path}
            alt={resolvedAlt}
            loading={priority ? "eager" : "lazy"}
            onError={() => setHasError(true)}
            className={`w-full h-full object-contain p-4 ${imgClassName}`}
          />
        ) : (
          <Image
            src={item.path}
            alt={resolvedAlt}
            fill
            sizes={resolvedSizes}
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            placeholder="blur"
            blurDataURL={TINY_BLUR_SVG}
            onError={() => setHasError(true)}
            className={`object-cover ${imgClassName}`}
          />
        )}
      </div>

      {/* Credit Caption when creditName exists */}
      {showCredit && item.creditName && (
        <figcaption className="text-[10px] text-slate-500 mt-1 truncate px-0.5">
          {item.sourceUrl ? (
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-slate-600 inline-flex items-center gap-1"
            >
              <span>{t("images", "photoCredit") || "Photo"}:</span>
              <span className="font-medium">{item.creditName}</span>
              <span className="text-slate-400">({item.license})</span>
            </a>
          ) : (
            <span>
              {t("images", "photoCredit") || "Photo"}: {item.creditName} ({item.license})
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}

export default AppImage;

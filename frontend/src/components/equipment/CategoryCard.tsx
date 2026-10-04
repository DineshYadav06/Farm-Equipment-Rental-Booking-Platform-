import React from "react";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  count: number;
  image: string;
  badge?: string;
  isSelected?: boolean;
  onSelect: (categoryId: string) => void;
  lang?: "en" | "hi";
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  name,
  nameHi,
  description,
  descriptionHi,
  count,
  image,
  badge,
  isSelected = false,
  onSelect,
  lang = "en"
}) => {
  const isHi = lang === "hi";

  return (
    <div
      onClick={() => onSelect(id)}
      className={`group cursor-pointer relative flex flex-col bg-white rounded-2xl border transition-all duration-200 overflow-hidden text-left ${
        isSelected
          ? "border-emerald-600 ring-2 ring-emerald-600/20 shadow-md -translate-y-0.5"
          : "border-slate-200 hover:border-emerald-300 hover:shadow-md hover:-translate-y-0.5"
      }`}
    >
      {/* Category Image with dark gradient overlay */}
      <div className="relative h-34 w-full overflow-hidden bg-slate-100">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />

        {badge && (
          <div className="absolute top-2.5 right-2.5">
            <span className="text-[10px] font-bold text-amber-950 bg-amber-300/90 backdrop-blur-xs px-2 py-0.5 rounded-full shadow-xs">
              {badge}
            </span>
          </div>
        )}

        <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between text-white">
          <div>
            <h4 className="font-extrabold text-base leading-tight drop-shadow-xs">
              {isHi ? nameHi : name}
            </h4>
            <span className="text-[11px] font-medium text-emerald-200 drop-shadow-xs">
              {count}+ {isHi ? "मशीनें उपलब्ध" : "machines available"}
            </span>
          </div>
        </div>
      </div>

      {/* Description & Explore */}
      <div className="p-3.5 flex flex-col flex-1 justify-between gap-3">
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
          {isHi ? descriptionHi : description}
        </p>

        <div className="flex items-center justify-between text-xs font-bold pt-2 border-t border-slate-100">
          <span
            className={
              isSelected
                ? "text-emerald-700 font-extrabold"
                : "text-slate-700 group-hover:text-emerald-700 transition-colors"
            }
          >
            {isHi ? "खोजें" : "Explore"}
          </span>
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
              isSelected
                ? "bg-emerald-700 text-white"
                : "bg-slate-100 text-slate-600 group-hover:bg-emerald-100 group-hover:text-emerald-800"
            }`}
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};

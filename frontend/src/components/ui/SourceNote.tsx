import React from "react";
import { RegistryItem, getRegistryItem } from "@/content/registry";
import { ExternalLink, AlertCircle, CheckCircle2 } from "lucide-react";

interface SourceNoteProps {
  registryId?: string;
  item?: RegistryItem;
  className?: string;
  compact?: boolean;
}

export const SourceNote: React.FC<SourceNoteProps> = ({
  registryId,
  item: propItem,
  className = "",
  compact = false
}) => {
  const item = propItem || (registryId ? getRegistryItem(registryId) : null);

  if (!item) return null;

  const isSample = item.status === "sample" || item.status === "needs-verification";

  return (
    <div
      className={`inline-flex flex-wrap items-center gap-1.5 text-[11px] leading-tight text-[#44403c] mt-1 ${className}`}
    >
      {/* Sample Data Badge if unverified/sample */}
      {isSample ? (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-bold border border-amber-300 text-[10px] tracking-wide uppercase">
          <AlertCircle className="w-3 h-3 text-amber-700 shrink-0" />
          <span>Sample data / नमूना</span>
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 font-semibold border border-emerald-300 text-[10px]">
          <CheckCircle2 className="w-3 h-3 text-emerald-700 shrink-0" />
          <span>Verified Source</span>
        </span>
      )}

      {/* Source Citation */}
      {!compact && (
        <span className="text-[#78716c]">
          Source:{" "}
          {item.sourceUrl ? (
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#14532d] underline hover:text-[#16a34a] inline-flex items-center gap-0.5"
            >
              <span>{item.sourceName}</span>
              <ExternalLink className="w-2.5 h-2.5 inline shrink-0" />
            </a>
          ) : (
            <span className="font-medium text-[#44403c]">{item.sourceName}</span>
          )}
          {item.asOfDate && (
            <span className="text-[10px] text-[#78716c] ms-1">
              (as of {item.asOfDate})
            </span>
          )}
        </span>
      )}
    </div>
  );
};

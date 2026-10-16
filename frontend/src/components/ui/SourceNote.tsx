import React from "react";
import { RegistryItem, getRegistryItem } from "@/content/registry";
import { useTranslation } from "@/i18n/context";
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
  const { t } = useTranslation();
  const item = propItem || (registryId ? getRegistryItem(registryId) : null);

  if (!item) return null;

  const isSample = item.status === "sample" || item.status === "needs-verification";

  return (
    <div
      className={`inline-flex flex-wrap items-center gap-1.5 text-[11px] leading-tight text-[var(--muted)] mt-1 ${className}`}
    >
      {/* Sample Data Badge if unverified/sample */}
      {isSample ? (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 font-bold border border-amber-300 dark:border-amber-700 text-[10px] tracking-wide uppercase">
          <AlertCircle className="w-3 h-3 text-amber-700 dark:text-amber-400 shrink-0" />
          <span>{t("common", "badges.sampleData")}</span>
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-200 font-semibold border border-emerald-300 dark:border-emerald-700 text-[10px]">
          <CheckCircle2 className="w-3 h-3 text-emerald-700 dark:text-emerald-400 shrink-0" />
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

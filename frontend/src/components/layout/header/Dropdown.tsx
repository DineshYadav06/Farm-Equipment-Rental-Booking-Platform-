"use client";

import React, { useRef, useEffect, ReactNode, KeyboardEvent } from "react";

interface DropdownProps {
  trigger: (
    isOpen: boolean,
    toggle: () => void,
    ref: React.RefObject<HTMLButtonElement | null>
  ) => ReactNode;
  children: ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  align?: "start" | "end" | "center";
  className?: string;
  id?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  children,
  isOpen,
  onOpenChange,
  align = "end",
  className = "",
  id
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        onOpenChange(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isOpen, onOpenChange]);

  // Keyboard navigation inside dropdown menu
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen) return;

    if (e.key === "Escape") {
      e.preventDefault();
      onOpenChange(false);
      triggerRef.current?.focus();
      return;
    }

    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!menuRef.current) return;
      const focusable = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);

      if (focusable.length === 0) return;

      const activeIndex = focusable.indexOf(document.activeElement as HTMLElement);

      if (e.key === "ArrowDown") {
        const nextIndex = activeIndex < focusable.length - 1 ? activeIndex + 1 : 0;
        focusable[nextIndex]?.focus();
      } else {
        const prevIndex = activeIndex > 0 ? activeIndex - 1 : focusable.length - 1;
        focusable[prevIndex]?.focus();
      }
    }
  };

  const alignClasses = {
    start: "start-0",
    end: "end-0",
    center: "left-1/2 -translate-x-1/2"
  };

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onKeyDown={handleKeyDown}
      id={id}
    >
      {trigger(isOpen, () => onOpenChange(!isOpen), triggerRef)}

      {isOpen && (
        <div
          ref={menuRef}
          role="menu"
          aria-orientation="vertical"
          className={`absolute top-full mt-1.5 z-50 bg-white border border-[#e5e5df] rounded-2xl shadow-lg p-1.5 focus:outline-hidden ${alignClasses[align]} ${className}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

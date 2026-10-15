"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

import chevronDown from "@/assets/icons/merchant/chevron-down.svg";
import type { RequirementOption } from "@/lib/merchant-applications";

// Shared by every dropdown in the merchant form so they look and behave alike.
export const dropdownTriggerClass = "h-12 w-full rounded-[10px] border-0 bg-white px-3 pr-10 text-left text-sm font-normal outline-none placeholder:text-[#717182] focus:ring-2 focus:ring-[#0c3283]/20";
export const dropdownListClass = "absolute left-0 right-0 top-[calc(100%+4px)] z-30 max-h-64 overflow-y-auto rounded-[10px] border border-[#e5e7eb] bg-white py-1 shadow-lg";
export const dropdownGroupHeadingClass = "px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.5px] text-[#99a1af]";
export const dropdownEmptyClass = "px-3 py-2 text-sm font-normal text-[#717182]";

export function dropdownOptionClass(active: boolean, selected: boolean) {
  return `flex cursor-pointer items-center justify-between gap-3 px-3 py-2 text-sm ${active ? "bg-[#edf5fb] text-[#0c3283]" : "text-[#1f1a0b]"} ${selected ? "font-semibold" : "font-normal"}`;
}

export function DropdownChevron({ open }: { open: boolean }) {
  return <Image src={chevronDown} alt="" width={20} height={20} className={`pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 transition-transform duration-150 ${open ? "rotate-180" : ""}`} />;
}

export function SelectedMark({ selected }: { selected: boolean }) {
  return selected ? <span aria-hidden="true" className="text-[#0c3283]">✓</span> : null;
}

/** Select-only combobox: the same trigger and popup as the country search, without typing. */
export function DropdownSelect({ id, label, value, onChange, options, placeholder, required = false, error, hint }: { id: string; label: string; value: string; onChange: (value: string) => void; options: RequirementOption[]; placeholder: string; required?: boolean; error?: string; hint?: string }) {
  const listboxId = useId();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  const typeahead = useRef({ text: "", at: 0 });
  const selected = options.find((option) => option.code === value);

  useEffect(() => {
    if (open) listRef.current?.querySelector(`[data-index="${activeIndex}"]`)?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  const openList = () => {
    setActiveIndex(Math.max(0, options.findIndex((option) => option.code === value)));
    setOpen(true);
  };

  const select = (option: RequirementOption) => {
    onChange(option.code);
    setOpen(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) return openList();
      const delta = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((index) => (index + delta + options.length) % options.length);
    } else if (event.key === "Home" || event.key === "End") {
      if (!open) return;
      event.preventDefault();
      setActiveIndex(event.key === "Home" ? 0 : options.length - 1);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!open) return openList();
      if (options[activeIndex]) select(options[activeIndex]);
    } else if (event.key === "Escape" && open) {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Tab") {
      setOpen(false);
    } else if (event.key.length === 1 && !event.metaKey && !event.ctrlKey && !event.altKey) {
      // Type the first letters of an option to jump to it, like a native select.
      const now = Date.now();
      const text = (now - typeahead.current.at < 700 ? typeahead.current.text : "") + event.key.toLowerCase();
      typeahead.current = { text, at: now };
      const match = options.findIndex((option) => option.label.toLowerCase().startsWith(text));
      if (match >= 0) {
        if (!open) setOpen(true);
        setActiveIndex(match);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 text-sm font-medium text-[#364153]">
      <span id={`${id}-label`}>{label}{required ? "*" : ""}</span>
      <div className="relative">
        <button
          id={id}
          type="button"
          role="combobox"
          aria-labelledby={`${id}-label`}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-activedescendant={open && options[activeIndex] ? `${listboxId}-${options[activeIndex].code}` : undefined}
          aria-invalid={Boolean(error)}
          aria-required={required}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          onClick={() => (open ? setOpen(false) : openList())}
          onBlur={() => setOpen(false)}
          onKeyDown={handleKeyDown}
          className={`${dropdownTriggerClass} ${selected ? "text-[#1f1a0b]" : "text-[#717182]"}`}
        >
          <span className="block truncate">{selected?.label ?? placeholder}</span>
        </button>
        <DropdownChevron open={open} />
        {open && (
          <ul id={listboxId} ref={listRef} role="listbox" aria-labelledby={`${id}-label`} className={dropdownListClass}>
            {options.map((option, index) => (
              <li
                key={option.code}
                id={`${listboxId}-${option.code}`}
                data-index={index}
                role="option"
                aria-selected={option.code === value}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => select(option)}
                onMouseEnter={() => setActiveIndex(index)}
                className={dropdownOptionClass(index === activeIndex, option.code === value)}
              >
                <span>{option.label}</span>
                <SelectedMark selected={option.code === value} />
              </li>
            ))}
          </ul>
        )}
      </div>
      {error ? <span id={`${id}-error`} role="alert" className="text-xs font-normal text-red-700">{error}</span> : hint && <span id={`${id}-hint`} className="text-xs font-normal text-[#717182]">{hint}</span>}
    </div>
  );
}

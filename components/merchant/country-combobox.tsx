"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";

import { DropdownChevron, SelectedMark, dropdownEmptyClass, dropdownGroupHeadingClass, dropdownListClass, dropdownOptionClass, dropdownTriggerClass } from "@/components/merchant/dropdown";
import { COUNTRY_OPTIONS, POPULAR_COUNTRY_CODES, countryName, type RequirementOption } from "@/lib/merchant-applications";

type Group = { heading: string; options: RequirementOption[] };

const popularOptions = POPULAR_COUNTRY_CODES.map((code) => ({ code, label: countryName(code) }));

export function CountryCombobox({ id, label, value, onChange, required = false, error }: { id: string; label: string; value: string; onChange: (code: string) => void; required?: boolean; error?: string }) {
  const listboxId = useId();
  const [query, setQuery] = useState(value ? countryName(value) : "");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  const [syncedValue, setSyncedValue] = useState(value);

  // Keep the visible text in step when the value is set from outside (resume, start over).
  if (value !== syncedValue) {
    setSyncedValue(value);
    setQuery(value ? countryName(value) : "");
  }

  const groups: Group[] = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term || (value && term === countryName(value).toLowerCase())) {
      return [
        { heading: "Popular", options: popularOptions },
        { heading: "All countries", options: COUNTRY_OPTIONS.filter((option) => !POPULAR_COUNTRY_CODES.includes(option.code)) },
      ];
    }
    const matches = COUNTRY_OPTIONS.filter((option) => option.label.toLowerCase().includes(term) || option.code.toLowerCase() === term);
    // Names that start with the term first, so "ni" offers Niger and Nigeria before Benin.
    matches.sort((a, b) => Number(!a.label.toLowerCase().startsWith(term)) - Number(!b.label.toLowerCase().startsWith(term)));
    return [{ heading: "", options: matches }];
  }, [query, value]);

  const flat = groups.flatMap((group) => group.options);

  useEffect(() => {
    if (open) listRef.current?.querySelector(`[data-index="${activeIndex}"]`)?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  const select = (option: RequirementOption) => {
    onChange(option.code);
    setQuery(option.label);
    setOpen(false);
  };

  const handleBlur = () => {
    setOpen(false);
    const exact = COUNTRY_OPTIONS.find((option) => option.label.toLowerCase() === query.trim().toLowerCase());
    if (exact) select(exact);
    else setQuery(value ? countryName(value) : "");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      const delta = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((index) => (flat.length ? (index + delta + flat.length) % flat.length : 0));
    } else if (event.key === "Enter" && open) {
      event.preventDefault();
      if (flat[activeIndex]) select(flat[activeIndex]);
    } else if (event.key === "Escape" && open) {
      event.preventDefault();
      setOpen(false);
    }
  };

  let index = -1;
  return (
    <div className="flex flex-col gap-2 text-sm font-medium text-[#364153]">
      <label htmlFor={id}>{label}{required ? "*" : ""}</label>
      <div className="relative">
        <input
          id={id}
          name={id}
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={open && flat[activeIndex] ? `${listboxId}-${flat[activeIndex].code}` : undefined}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          autoComplete="country-name"
          value={query}
          placeholder="Search country"
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
            setOpen(true);
          }}
          onFocus={(event) => {
            event.target.select();
            setOpen(true);
          }}
          onClick={() => setOpen(true)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`${dropdownTriggerClass} text-[#1f1a0b]`}
        />
        <DropdownChevron open={open} />
        {open && (
          <ul id={listboxId} ref={listRef} role="listbox" aria-label={label} className={dropdownListClass}>
            {flat.length === 0 && <li className={dropdownEmptyClass}>No matching country</li>}
            {groups.map((group) =>
              group.options.length === 0 ? null : (
                <li key={group.heading || "results"} role="presentation">
                  {group.heading && <p className={dropdownGroupHeadingClass}>{group.heading}</p>}
                  <ul role="group" aria-label={group.heading || undefined}>
                    {group.options.map((option) => {
                      index += 1;
                      const optionIndex = index;
                      const active = optionIndex === activeIndex;
                      return (
                        <li
                          key={option.code}
                          id={`${listboxId}-${option.code}`}
                          data-index={optionIndex}
                          role="option"
                          aria-selected={option.code === value}
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => select(option)}
                          onMouseEnter={() => setActiveIndex(optionIndex)}
                          className={dropdownOptionClass(active, option.code === value)}
                        >
                          <span>{option.label}</span>
                          <SelectedMark selected={option.code === value} />
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ),
            )}
          </ul>
        )}
      </div>
      {error && <span id={`${id}-error`} role="alert" className="text-xs font-normal text-red-700">{error}</span>}
    </div>
  );
}

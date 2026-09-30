"use client";
import { MenuIcon } from "@/assets/icons";
import { SykaLogo } from "@/assets/images";
import {
  DEVELOPER_ITEMS,
  type DeveloperSlug,
} from "@/components/dropdown-pages/developer-config";
import {
  PRODUCT_ITEMS,
  type ProductSlug,
} from "@/components/dropdown-pages/product-config";
import { cn } from "@/lib/utils";
import BusinessAction from "@/components/business/business-action";
import { businessLinks, personalLinks } from "@/lib/business-links";
import {
  BookText,
  BriefcaseBusiness,
  ChevronDown,
  CreditCard,
  FileCode2,
  Landmark,
  Megaphone,
  Newspaper,
  ReceiptText,
  Send,
  Sparkles,
  WalletCards,
  X,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

type DropdownItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

type TopLevelItem =
  | {
      label: string;
      type: "link";
      href: string;
    }
  | {
      label: string;
      type: "dropdown";
      items: DropdownItem[];
    };

type RouteVariant = "personal" | "business";

const routeSwitchLinks = [
  {
    label: "Personal",
    href: "/",
  },
  {
    label: "Business",
    href: "/business",
  },
];

const companyItem: TopLevelItem = {
  label: "Company",
  type: "dropdown",
  items: [
    { label: "About Us", href: "#", icon: Sparkles },
    { label: "Blog", href: "#", icon: BookText },
    { label: "Press", href: "#", icon: Newspaper },
    { label: "Careers", href: "#", icon: BriefcaseBusiness },
    { label: "Community", href: "#", icon: Megaphone },
  ],
};

const supportItem: TopLevelItem = {
  label: "Support",
  type: "link",
  href: "#",
};

const Header = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeMenuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const wasMenuOpenRef = useRef(false);
  const isBusinessRoute = pathname.startsWith("/business") || pathname.startsWith("/privacy-policy") || pathname.startsWith("/terms-and-conditions") || pathname.startsWith("/cookies") || pathname.startsWith("/data-security");
  const routeVariant: RouteVariant = isBusinessRoute ? "business" : "personal";
  const primarySignup = isBusinessRoute ? businessLinks.signup : personalLinks.signup;
  const productBasePath = isBusinessRoute ? "/business" : "/";
  const developerBasePath = isBusinessRoute ? "/business" : "/";
  const productIcons: Record<ProductSlug, LucideIcon> = {
    "virtual-account": Landmark,
    "virtual-card": CreditCard,
    invoicing: ReceiptText,
    payments: Send,
    "treasury-management": WalletCards,
  };
  const developerIcons: Record<DeveloperSlug, LucideIcon> = {
    "api-documentation": FileCode2,
  };

  const productsItem: TopLevelItem = {
    label: "Products",
    type: "dropdown",
    items: PRODUCT_ITEMS.map((item) => ({
      label: item.label,
      href: `${productBasePath}?product=${item.slug}`,
      icon: productIcons[item.slug],
    })),
  };
  const developersItem: TopLevelItem = {
    label: "Developers",
    type: "dropdown",
    items: DEVELOPER_ITEMS.map((item) => ({
      label: item.label,
      href: `${developerBasePath}?developer=${item.slug}`,
      icon: developerIcons[item.slug],
    })),
  };

  const navItems: TopLevelItem[] = isBusinessRoute
    ? [productsItem, companyItem, { ...supportItem, href: "/business#faq" }, developersItem]
    : [productsItem, companyItem, { ...supportItem, href: "/#faq" }];
  const activeDropdown = openDropdown ?? hoveredDropdown;

  const segmentPillTranslateClass =
    routeVariant === "business" ? "translate-x-full" : "translate-x-0";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
        setHoveredDropdown(null);
      }
    };

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDropdown(null);
        setHoveredDropdown(null);
        setIsSheetOpen(false);
        return;
      }

      if (event.key === "Tab" && isSheetOpen && menuPanelRef.current) {
        const focusableElements = menuPanelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (!firstElement || !lastElement) return;
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeydown);
    };
    }, [isSheetOpen]);

  useEffect(() => {
    if (isSheetOpen) {
      document.body.style.overflow = "hidden";
      closeMenuButtonRef.current?.focus();
    } else {
      document.body.style.overflow = "";
      if (wasMenuOpenRef.current) menuButtonRef.current?.focus();
    }

    wasMenuOpenRef.current = isSheetOpen;
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSheetOpen]);

  return (
    <header className={cn("relative z-40 flex w-full flex-row items-center justify-between lg:mx-auto xl:mt-[62px] xl:mb-[62px]", isBusinessRoute ? "my-5 max-w-[1268px] px-5 sm:px-6" : "my-5 max-w-[1268px] px-5 sm:px-6")}>
      <div className="hidden lg:flex lg:items-center lg:gap-6 xl:gap-10">
        <Link href="/" aria-label="Go to Syka home">
          <Image
            src={SykaLogo}
            height={192}
            width={486}
            className="h-11 w-auto xl:h-[50px]"
            alt="Syka Logo"
          />
        </Link>
        <div className="relative inline-flex items-center rounded-full bg-[#F0F0F0] p-1">
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-[#F9B004] transition-transform duration-300 ease-out",
              segmentPillTranslateClass,
            )}
          />
          {routeSwitchLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? routeVariant === "personal"
                : routeVariant === "business";

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative z-10 w-20 rounded-full px-2 py-2 text-center text-base leading-4 font-medium transition-colors",
                  isActive
                    ? "text-white"
                    : "text-[#2C2F54] hover:text-[#1E213F]",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>

      <nav ref={dropdownContainerRef} className="hidden lg:block">
        <ul className={cn("flex items-center text-[#4A4E66]", isBusinessRoute ? "gap-6 xl:gap-8" : "gap-8 text-base")}>
          {navItems.map((item) =>
            item.type === "link" ? (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-base font-medium transition-colors hover:text-[#1F2238]"
                >
                  {item.label}
                </Link>
              </li>
            ) : (
              <li
                key={item.label}
                className="group relative"
                onMouseEnter={() => setHoveredDropdown(item.label)}
                onMouseLeave={() => setHoveredDropdown(null)}
                onBlur={(event) => {
                  if (
                    activeDropdown === item.label &&
                    !event.currentTarget.contains(
                      event.relatedTarget as Node | null,
                    )
                  ) {
                    setOpenDropdown(null);
                    setHoveredDropdown(null);
                  }
                }}
              >
                <button
                  type="button"
                  aria-expanded={activeDropdown === item.label}
                  className="flex items-center gap-1 text-base font-medium text-[#4A4E66] transition-colors hover:text-[#1F2238] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1F2238]"
                  onClick={() =>
                    setOpenDropdown((prev) => (prev === item.label ? null : item.label))
                  }
                >
                  <span>{item.label}</span>
                  <ChevronDown className="size-4" />
                </button>
                <div
                  className={cn(
                    "absolute top-full left-0 z-[120] min-w-52 pt-2",
                    activeDropdown === item.label ? "block" : "hidden",
                  )}
                >
                  <div className="rounded-xl border border-[#E6E8F1] bg-white p-2 shadow-lg">
                    <ul className="space-y-1">
                      {item.items.map((subItem) => (
                        <li key={subItem.label}>
                          <Link
                            href={subItem.href}
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[#4A4E66] transition-colors hover:bg-[#F5F7FB] hover:text-[#1F2238]"
                            onClick={() => {
                              setOpenDropdown(null);
                              setHoveredDropdown(null);
                            }}
                          >
                            <span
                              className="inline-flex size-8 shrink-0 items-center justify-center rounded-xl bg-[#8CC3DE] text-white"
                            >
                              <subItem.icon className="size-4" />
                            </span>
                            <span>{subItem.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ),
          )}
        </ul>
      </nav>

      <BusinessAction href={primarySignup} className="hidden h-12 w-[183px] rounded-lg bg-xenon px-5 text-base font-semibold text-white transition-colors hover:bg-xenon-600 lg:inline-flex">
        Get started
      </BusinessAction>

      <div className="flex w-full items-center justify-between lg:hidden">
        <Link href="/" aria-label="Go to Syka home">
          <Image
            src={SykaLogo}
            height={192}
            width={486}
            className="h-11 w-auto"
            alt="Syka Logo"
          />
        </Link>
        <button
          ref={menuButtonRef}
          onClick={() => setIsSheetOpen((prev) => !prev)}
          className="text-[#2094DF]"
          aria-label="Toggle menu"
          aria-expanded={isSheetOpen}
          aria-controls="mobile-navigation"
        >
          <MenuIcon />
        </button>
      </div>

      <div
        id="mobile-navigation"
        ref={menuPanelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-full transform bg-white transition-transform duration-300",
          isSheetOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-[#ECEEF5] px-4 py-4">
          <Link href="/" aria-label="Go to Syka home">
            <Image src={SykaLogo} className="h-10 w-auto" alt="Syka Logo" />
          </Link>
          <button
            ref={closeMenuButtonRef}
            onClick={() => setIsSheetOpen(false)}
            className="text-[#2094DF]"
            aria-label="Close menu"
          >
            <X className="size-6" />
          </button>
        </div>

        <div className="px-4 pt-5">
          <div className="relative inline-flex items-center rounded-full bg-[#F0F0F0] p-1">
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-[#F9B004] transition-transform duration-300 ease-out",
                segmentPillTranslateClass,
              )}
            />
            {routeSwitchLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? routeVariant === "personal"
                  : routeVariant === "business";

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsSheetOpen(false)}
                  className={cn(
                    "relative z-10 w-20 rounded-full px-2 py-2 text-center text-base leading-4 font-medium transition-colors",
                    isActive
                      ? "text-white"
                      : "text-[#2C2F54] hover:text-[#1E213F]",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        <nav className="mt-8 flex flex-col gap-8 px-4 pb-10">
          {navItems.map((item) =>
            item.type === "link" ? (
              <Link
                onClick={() => setIsSheetOpen(false)}
                href={item.href}
                key={item.label}
                className="text-base font-semibold text-[#1F2238]"
              >
                {item.label}
              </Link>
            ) : (
              <section key={item.label}>
                <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-[#8B90A6] uppercase">
                  {item.label}
                </p>
                <ul className="space-y-3">
                  {item.items.map((subItem) => (
                    <li key={subItem.label}>
                      <Link
                        onClick={() => setIsSheetOpen(false)}
                        href={subItem.href}
                        className="flex items-center gap-3 text-base text-[#343955]"
                      >
                        <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#8CC3DE] text-white">
                          <subItem.icon className="size-3.5" />
                        </span>
                        <span>{subItem.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ),
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

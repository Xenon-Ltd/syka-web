"use client";
import { MenuIcon } from "@/assets/icons";
import { SykaLogo } from "@/assets/images";
import {
  PRODUCT_ITEMS,
  type ProductSlug,
} from "@/components/dropdown-pages/product-config";
import { cn } from "@/lib/utils";
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

const developersItem: TopLevelItem = {
  label: "Developers",
  type: "dropdown",
  items: [{ label: "API Documentation", href: "#", icon: FileCode2 }],
};

const Header = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  const isBusinessRoute = pathname.startsWith("/business");
  const routeVariant: RouteVariant = isBusinessRoute ? "business" : "personal";
  const productBasePath = isBusinessRoute ? "/business" : "/";
  const productIcons: Record<ProductSlug, LucideIcon> = {
    "virtual-account": Landmark,
    "virtual-card": CreditCard,
    invoicing: ReceiptText,
    payments: Send,
    "treasury-management": WalletCards,
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

  const navItems: TopLevelItem[] = isBusinessRoute
    ? [productsItem, companyItem, developersItem, supportItem]
    : [productsItem, companyItem, supportItem];
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
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
    <header className="relative z-40 my-3 mb-24 flex w-full flex-row items-center justify-between xl:mx-auto xl:my-5 xl:max-w-[1211px]">
      <div className="hidden xl:flex xl:items-center xl:gap-12">
        <Link href="/" aria-label="Go to Syka home">
          <Image
            src={SykaLogo}
            height={192}
            width={486}
            className="h-11 w-auto"
            alt="Syka Logo"
          />
        </Link>
        <div className="relative inline-flex items-center rounded-full bg-[#EDF0F5] p-1">
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-[#F2AE00] transition-transform duration-300 ease-out",
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
                  "relative z-10 w-24 rounded-full px-4 py-1.5 text-center text-sm font-medium transition-colors",
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

      <nav ref={dropdownContainerRef} className="hidden xl:block">
        <ul className="flex items-center gap-10 text-[21px] text-[#4A4E66]">
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
                  className="flex items-center gap-1 text-base font-medium text-[#4A4E66] transition-colors hover:text-[#1F2238] focus:outline-none"
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
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[#4A4E66] transition-colors hover:bg-[#F5F7FB] hover:text-[#1F2238]",
                              item.label === "Developers" &&
                                "py-3 text-[24px] leading-none",
                            )}
                            onClick={() => {
                              setOpenDropdown(null);
                              setHoveredDropdown(null);
                            }}
                          >
                            <span
                              className={cn(
                                "inline-flex size-8 shrink-0 items-center justify-center rounded-xl bg-[#8CC3DE] text-white",
                                item.label === "Developers" &&
                                  "size-[88px] rounded-[28px]",
                              )}
                            >
                              <subItem.icon
                                className={cn(
                                  "size-4",
                                  item.label === "Developers" && "size-[44px]",
                                )}
                              />
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

      <Link
        href="#"
        className="hidden h-12 items-center rounded-lg bg-[#2094DF] px-10 text-lg font-semibold text-white transition-colors hover:bg-[#1886CE] xl:inline-flex"
      >
        Get started
      </Link>

      <div className="flex w-full items-center justify-between xl:hidden">
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
          onClick={() => setIsSheetOpen((prev) => !prev)}
          className="text-[#2094DF]"
          aria-label="Toggle menu"
        >
          <MenuIcon />
        </button>
      </div>

      <div
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
            onClick={() => setIsSheetOpen(false)}
            className="text-[#2094DF]"
            aria-label="Close menu"
          >
            <X className="size-6" />
          </button>
        </div>

        <div className="px-4 pt-5">
          <div className="relative inline-flex items-center rounded-full bg-[#EDF0F5] p-1">
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-[#F2AE00] transition-transform duration-300 ease-out",
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
                    "relative z-10 w-24 rounded-full px-4 py-1.5 text-center text-sm font-medium transition-colors",
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
                <p className="mb-3 text-xs font-bold tracking-[0.14em] text-[#8B90A6] uppercase">
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

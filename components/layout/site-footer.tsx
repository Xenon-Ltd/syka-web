import Image from "next/image";
import Link from "next/link";
import { SykaLogoWhite } from "@/assets/icons";
import { PRODUCT_ITEMS } from "@/components/dropdown-pages/product-config";
import { businessLinks, companyLinks, transparencyLinks } from "@/lib/business-links";
import FooterLocations from "./footer-locations";

type FooterLink = { label: string; href: string };
type FooterGroup = { title: string; links: FooterLink[] };

const definedLinks = (links: { label: string; href?: string }[]): FooterLink[] =>
  links.filter((link): link is FooterLink => Boolean(link.href));

export default function SiteFooter({ variant }: { variant: "personal" | "business" }) {
  const isBusiness = variant === "business";
  const basePath = isBusiness ? "/business" : "/";
  const company = definedLinks([
    { label: "About Us", href: companyLinks.about },
    { label: "Blog", href: companyLinks.blog },
    { label: "Press", href: companyLinks.press },
    { label: "Careers", href: companyLinks.careers },
    { label: "Community", href: companyLinks.community },
  ]);
  const transparency = definedLinks([
    { label: "Terms & Conditions", href: transparencyLinks.terms },
    { label: "Privacy Policy", href: transparencyLinks.privacy },
    { label: "Cookie Policy", href: transparencyLinks.cookies },
  ]);
  const groups: FooterGroup[] = [
    { title: "Products", links: PRODUCT_ITEMS.map(({ label, slug }) => ({ label, href: `${basePath}?product=${slug}` })) },
    ...(company.length ? [{ title: "Company", links: company }] : []),
    ...(transparency.length ? [{ title: "Transparency", links: transparency }] : []),
    { title: "Support", links: [{ label: "Contact Us", href: businessLinks.sales }, { label: "FAQs", href: `${basePath}#faq` }, { label: "API Documentation", href: `${basePath}?developer=api-documentation` }] },
  ];

  return (
    <footer className="bg-[#151132] px-5 pt-16 pb-8 text-white sm:px-6 lg:pt-[120px] lg:pb-[100px]">
      <div className="mx-auto max-w-[1241px]">
        <div className="grid gap-12 lg:grid-cols-[297px_1fr] lg:gap-12">
          <div>
            <Link href={basePath} aria-label={isBusiness ? "Syka business home" : "Syka personal home"} className="inline-block rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              <Image src={SykaLogoWhite} alt="Syka" className="h-10 w-auto lg:h-12" />
            </Link>
            <p className="mt-5 max-w-[297px] text-sm leading-relaxed text-white/65 lg:text-base">{isBusiness ? "Syka, The Smarter Bridge Between Borders" : "Syka is a product of Xenon Ltd."}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {groups.map(({ title, links }) => (
              <nav key={title} aria-label={`${title} footer links`}>
                <h2 className="text-sm font-semibold text-white/55 lg:text-base">{title}</h2>
                <ul className="mt-5 space-y-[14px] text-lg leading-[22px] text-white/75">
                  {links.map(({ label, href }) => (
                    <li key={label}><Link href={href} className="rounded transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">{label}</Link></li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <p className="mt-12 border-t  border-white/25 pt-12 text-xs leading-relaxed text-white/60 lg:text-lg">
          Syka is a product of Xenon Technologies Inc., which is a financial technology company and not a bank. Our services are provided by our partner banks and other financial institutions that are duly licensed by BOG.
        </p>
      </div>
      <FooterLocations />

      <p className="mt-12 text-center text-xs text-white/45 lg:mt-14">© {new Date().getFullYear()} Xenon Ltd.</p>
    </footer>
  );
}

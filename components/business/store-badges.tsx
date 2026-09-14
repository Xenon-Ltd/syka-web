import Image from "next/image";
import { AppStoreBadgeIcon, PlayStoreBadgeIcon } from "@/assets/icons";
import { businessLinks } from "@/lib/business-links";
import BusinessAction from "./business-action";
import { cn } from "@/lib/utils";

export default function StoreBadges({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-3 lg:gap-4", className)}>
      {businessLinks.googlePlay && (
        <BusinessAction href={businessLinks.googlePlay} aria-label="Get Syka on Google Play" className="rounded-md">
          <Image src={PlayStoreBadgeIcon} alt="Get it on Google Play" className="h-10 w-[135px] lg:h-14 lg:w-[193px]" />
        </BusinessAction>
      )}
      {businessLinks.appStore && (
        <BusinessAction href={businessLinks.appStore} aria-label="Download Syka on the App Store" className="rounded-md">
          <Image src={AppStoreBadgeIcon} alt="Download on the App Store" className="h-10 w-[135px] lg:h-12 lg:w-[162px]" />
        </BusinessAction>
      )}
    </div>
  );
}

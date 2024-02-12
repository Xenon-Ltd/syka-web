import {
  AlignCenterIcon,
  CheckCircleBrokenIcon,
  CreditCard02Icon,
  Dotpoints01Icon,
  ReceiptCheckIcon,
  UserCheck02Icon,
} from "@/assets/icons/how-it-works";
import Image from "next/image";
import React from "react";

const howItworksdata = [
  {
    Icon: UserCheck02Icon,
    label: "1. Sign up for Syka",
    description:
      "Begin by signing up for Syka Pay and creating your business account. It only takes a few minutes to register, and you'll gain access to our intuitive platform designed for efficient cross-border payments.",
  },
  {
    Icon: CreditCard02Icon,
    label: "2. Choose Your Payment Method",
    description:
      "Select your preferred payment method from our range of options tailored to meet your business needs. Whether you prefer bank transfers, credit/debit cards, or alternative payment solutions, Syka Pay offers flexibility and convenience.",
  },
  {
    Icon: Dotpoints01Icon,
    label: "3. Enter Transaction Details",
    description:
      "Enter the transaction details, including the recipient's information, amount to be transferred, and currency of the transaction. Syka Pay supports multi-currency transactions, allowing you to navigate international markets effortlessly.",
  },
  {
    Icon: AlignCenterIcon,
    label: "4. Review and Confirm",
    description:
      "Review the transaction details to ensure accuracy and completeness. Once satisfied, proceed to confirm the transaction. Syka Pay prioritizes transparency, providing you with a clear overview of applicable fees and exchange rates.",
  },
  {
    Icon: CheckCircleBrokenIcon,
    label: "5. Execute the Transaction",
    description:
      "Upon confirmation, Syka Pay swiftly executes the transaction, securely transferring funds to the recipient's account. Our advanced blockchain technology ensures the integrity and security of every transaction, giving you peace of mind throughout the process.",
  },
  {
    Icon: ReceiptCheckIcon,
    label: "6. Track Your Transactions",
    description:
      "Monitor the status of your transactions in real-time through the Syka Pay dashboard. Stay informed at every step of the journey, from initiation to completion, and receive instant notifications for added convenience.",
  },
];

const HowItWorks = () => {
  return (
    <section className="flex flex-col items-center justify-center xl:h-[730px] bg-[#E4F4FB] py-16 xl:py-0 px-3.5 xl:px-0">
      <div className="xl:w-[1220px] mx-auto flex flex-col items-center gap-16 xl:gap-12">
        <p className="text-2xl xl:text-3xl font-bold leading-[32px] xl:leading-[41px]">
          How It Works
        </p>
        <div className="grid xl:grid-cols-2 grid-cols-1 gap-3 gap-x-16">
          {howItworksdata.map((item) => (
            <div
              key={item.label}
              className="flex flex-row w-full items-center gap-8 px-7 py-5 rounded-2xl bg-white"
            >
              <div className="w-14 h-14 shrink-0 rounded-full bg-[#E4F4FB] flex items-center justify-center">
                <Image
                  src={item.Icon}
                  alt={`${item.label}-icon`}
                  className="w-6 h-6"
                />
              </div>
              <div className="flex flex-col gap-2.5">
                <p className="text-xs xl:text-sm font-bold font-dmSans text-xenon-text">
                  {item.label}
                </p>
                <p className="text-xs xl:text-sm text-[#8893A4]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

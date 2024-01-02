import React from "react";

const whys = [
  {
    title: "Swift Transactions, Unmatched Speed",
    description:
      "At Syka, we understand the importance of time in business. Experience lightning-fast transactions, quick approvals, and instant updates. Your business moves at the speed of Syka.",
    icon: "",
  },
  {
    title: "Excellence in Customer Service",
    description:
      "Your success is our priority. Syka Business Banking comes with a dedicated account manager for every business. Enjoy personalized support that goes beyond transactions – it's a partnership focused on your business growth.",
    icon: "",
  },
  {
    title: "Advanced Analytics",
    description:
      "Gain insights into your business's financial health with Syka's advanced analytics. From expense tracking to revenue projections, make informed decisions backed by data. Stay steps ahead in your financial strategy.",
    icon: "",
  },
  {
    title: "Multi-Layered Security Protocols",
    description:
      "Security isn't just a feature; it's our commitment. Syka employs multi-layered security protocols to ensure your financial data is protected at every level. Your peace of mind is our top priority.",
    icon: "",
  },
  {
    title: "Seamless Integration, Effortless Operations",
    description:
      "Syka integrates seamlessly with your business processes. From invoicing to expenses, payments to analytics, experience a unified platform that simplifies financial operations. Efficiency is the cornerstone of Syka.",
    icon: "",
  },
];

const WhyYouShouldChooseSyka = () => {
  return (
    <section className="relative">
      <div className="opacity-0 bg-xenon/10 py-16 w-screen top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-[1211px] mx-auto flex flex-col gap-16 items-center">
          <h3 className="font-dmSans font-bold text-4.5xl text-xenon-gray">
            Why You Should Choose Syka
          </h3>
          <div className="flex flex-row flex-wrap items-center justify-center">
            {whys.map((why, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center gap-4 w-[300px] h-[300px]"
              >
                <h4 className="font-dmSans font-bold text-2xl text-xenon-gray">
                  {why.title}
                </h4>
                <p className="text-lg text-center">{why.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bg-xenon/10 py-16 w-screen top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-[1211px] mx-auto flex flex-col gap-16 items-center">
          <h3 className="font-dmSans font-bold text-4.5xl text-xenon-gray">
            Why You Should Choose Syka
          </h3>
          <div className="flex flex-row flex-wrap items-center gap-16 justify-center">
            {whys.map((why, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-4 w-[360px] h-[230px]"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-white rounded-full">
                  <div className="flex items-center justify-center w-10 h-10 bg-xenon/10 rounded-full"></div>
                </div>
                <p className="font-bold text-lg text-xenon-primary">
                  {why.title}
                </p>
                <p className="text-center">{why.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyYouShouldChooseSyka;

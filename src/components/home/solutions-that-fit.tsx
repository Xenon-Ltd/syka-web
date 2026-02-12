import React from "react";

function SolutionsThatFit() {
  const solutions = [
    {
      title: "For Freelancers & Remote Workers",
      description:
        "Invoice clients globally, get paid in USD or EUR, and convert to your local currency with minimal loss.",
    },
    {
      title: "For SMEs & Startups",
      description:
        "Pay global contractors and suppliers instantly, while managing multi-currency cash flow without high bank fees.",
    },
    {
      title: "For Digital Nomads & Expats",
      descriptions:
        "Send money home affordably and spend anywhere online with your virtual card with no foreign transaction fees.",
    },
  ];
  return (
    <div>
      <div>
        <p>Solutions That Fit</p>{" "}
        <p>
          Your <span>Workflow</span>
        </p>
      </div>
      <div></div>
    </div>
  );
}

export default SolutionsThatFit;

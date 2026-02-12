import React from "react";

function BuiltOnStability() {
  return (
    <div>
      <div>
        <p>
          Built on <span>Stability,</span>
        </p>
        <p>
          Guarded by <span>Security</span>
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="border">
          <div></div>
          <div>
            <p>Stablecoin-Powered</p>
            <p>
              We use fully-backed, regulated stablecoins for predictable value
            </p>
          </div>
        </div>
        <div className="border">
          <p>Bank-Grade Security</p>
          <p>
            SOC 2 compliant, encryption, and multi-sig custody protocols,
            operating within global compliance frameworks.
          </p>
        </div>
        <div className="border">
          <p>Transparent Wallet</p>
          <p>
            You control your funds, with clear balances, real-time visibility,
            and no hidden restrictions
          </p>
        </div>
      </div>
    </div>
  );
}

export default BuiltOnStability;

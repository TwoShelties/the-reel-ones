import React from "react";

const PaymentInputs = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <input type="text" placeholder="First Name" style={{ width: "50%" }} />
      <input type="text" placeholder="Last Name" style={{ width: "50%" }} />

      <input
        type="text"
        placeholder="Address Line 1"
        style={{ width: "75%" }}
      />
      <input
        type="text"
        placeholder="Address Line 2"
        style={{ width: "75%" }}
      />
    </div>
  );
};

export default PaymentInputs;

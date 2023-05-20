import React from "react";

import { loader } from "../assets";

const TransactionLoading = () => {
  //   return <p style={{ fontWeight: "bold", fontSize: "30px" }}>Loading.....</p>;
  return (
    <div
      style={{
        position: "fixed",
        height: "100vh",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        zIndex: "10",
      }}
    >
      <img
        alt="loader"
        src={loader}
        style={{ width: "100px", height: "100px", objectFit: "contain" }}
      />

      <p
        style={{
          marginTop: "20px",
          fontWeight: "bold",
          fontSize: "20px",
          color: "#fff",
        }}
      >
        Transaction is in progress <br /> Please wait...
      </p>
    </div>
  );
};

export default TransactionLoading;

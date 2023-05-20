import React from "react";

import { categoryIcon } from "../assets";

const Category = ({ name }) => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        background: "#fff",
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);",
        maxWidth: "180px",
        minHeight: "150px",
        display: "grid",
        flexDirection: "column",
        placeItems: "center",
        padding: "50px",
        borderRadius: "10px",
        border: "2px solid rgba(0, 0, 0, 0.05)",
        marginRight: "30px",
        marginBottom: "30px",
      }}
    >
      <div className="mb-3" style={{ width: "60px" }}>
        <img src={categoryIcon} alt="category icon" />
      </div>

      <p
        style={{
          fontSize: "22px",
          fontWeight: "bold",
          letterSpacing: "2px",
          textAlign: "center",
        }}
      >
        {name}
      </p>
    </div>
  );
};

export default Category;

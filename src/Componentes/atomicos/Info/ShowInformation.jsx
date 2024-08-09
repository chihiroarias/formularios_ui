import React, { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";

export default function ShowInformation({ info }) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <FaQuestionCircle
        onMouseEnter={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
        style={{ cursor: "pointer", color: "#007BFF" }}
      />
      {showInfo && (
        <div
          style={{
            position: "absolute",
            backgroundColor: "#f9f9f9",
            border: "1px solid #ddd",
            padding: "8px",
            borderRadius: "4px",
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
            whiteSpace: "nowrap",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          {info}
        </div>
      )}
    </div>
  );
}

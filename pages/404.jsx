import { faDivide } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Image from "next/image";

const NotFound = () => {
  return (
    <div
      style={{
        // width: "500px",
        height: "100%",
        background: "#9ddfd3",
        margin: "auto",
        color: "white",
        textAlign: "center",
        fontSize: "3em",
      }}
    >
      <div
        style={{ marginBottom: "30px", fontSize: ".5em", paddingTop: "20px" }}
      >
        404 -- Page Not Found
      </div>
      <div style={{ marginBottom: "50px" }}>
        Like a sad unicorn, the page you're looking for doesn't exist
      </div>
      <div style={{ width: "500px" }}>
        <Image
          src="/sadUnicorn.png"
          width={500}
          height={300}
          // style={{ margin: "20px 0" }}
        />
      </div>
    </div>
  );
};

export default NotFound;

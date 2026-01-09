"use client";
import React, { useEffect } from "react";

const TawkTo = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/6821c12e44abcc190d947b1e/1ir1tl7fs";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    script.id = "tawk-to-script";

    // Check if script already exists
    if (!document.getElementById("tawk-to-script")) {
      document.body.appendChild(script);
    }

    return () => {
      const existingScript = document.getElementById("tawk-to-script");
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []);

  return null;
};

export default TawkTo;

"use client";
import React, { useEffect } from "react";


const TawkTo = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/6821c12e44abcc190d947b1e/1ir1tl7fs";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Clean up the script when the component is unmounted
    };
  }, []);

  return null; // This component doesn't need to render anything
};

export default TawkTo;

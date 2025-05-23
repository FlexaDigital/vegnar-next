// app/global-loader.tsx
"use client"; // This is crucial

import React from "react";
import { useLoading } from "@/lib/context/LoadingContext";
import Loader from "@/components/Loader";

const GlobalLoader = () => {
  const { isLoading } = useLoading();
  return isLoading ? <Loader /> : null;
};

export default GlobalLoader;
"use client";
import { useLoader } from "@/lib/loader-context";
import { ClipLoader } from "react-spinners";

export default function LoaderOverlay() {
  const { loading } = useLoader();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-white/80 z-[999] flex items-center justify-center">
      <ClipLoader size={60} color="#22c55e" />
    </div>
  );
}

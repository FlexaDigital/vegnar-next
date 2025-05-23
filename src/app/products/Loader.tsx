// app/loading.tsx
"use client";

import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <ClipLoader size={60} color="#16a34a" loading={true} />
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLoading } from "@/context/LoadingContext";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function LoadingListener() {
  const router = useRouter();
  const { isLoading, setLoading } = useLoading();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    // Next.js 13 app router doesn't expose router.events like pages router.
    // But router exposes 'beforePopState' and 'push' can be intercepted by overriding.

    // Workaround: monkey-patch router.push and router.replace to detect navigation:
    const originalPush = router.push;
    const originalReplace = router.replace;

    router.push = async (...args) => {
      setLoading(true);
      try {
        const result = await originalPush(...args);
        setLoading(false);
        return result;
      } catch (e) {
        setLoading(false);
        throw e;
      }
    };

    router.replace = async (...args) => {
      setLoading(true);
      try {
        const result = await originalReplace(...args);
        setLoading(false);
        return result;
      } catch (e) {
        setLoading(false);
        throw e;
      }
    };

    // Clean up on unmount
    return () => {
      router.push = originalPush;
      router.replace = originalReplace;
    };
  }, [router, setLoading]);

  return isLoading ? <LoadingSpinner /> : null;
}

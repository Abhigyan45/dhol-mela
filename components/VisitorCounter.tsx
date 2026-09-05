"use client";

import { useEffect, useState } from "react";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const alreadyCounted = sessionStorage.getItem("visitor_counted");

    async function load() {
      const res = await fetch("/api/visitor-count", {
        method: alreadyCounted ? "GET" : "POST",
      });
      const data = await res.json();
      setCount(data.count);
      if (!alreadyCounted) sessionStorage.setItem("visitor_counted", "true");
    }

    load();
  }, []);

  if (count === null) return null;

  return (
    <p className="text-xs text-gray-400">👀 {count.toLocaleString()} visitors so far</p>
  );
}
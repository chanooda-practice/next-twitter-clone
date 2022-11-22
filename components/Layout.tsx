import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-xl mx-auto  px-4 py-4">
      <h1 className="text-3xl mb-6 text-blue-400 font-bold">Twitter</h1>
      {children}
    </div>
  );
}

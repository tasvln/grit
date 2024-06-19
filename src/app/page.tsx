"use client";

import DropBox from "@/components/dropBox";
import { useState } from "react";

export default function Home() {
  const [preview, setPreview] = useState<string | null>(null);
  
  return (
    <main className="h-dvh w-full flex flex-col items-center p-4">
      <section className="w-2/5 p-4 mt-32">
        <p className="text-xl uppercase font-bold text-center">grit<sup className="lowercase italic text-sm opacity-50">3000</sup></p>
        <div className="mt-10">
          <DropBox 
            title="Upload audio" 
            optional={false} 
            acceptedFiles={{ audio: ["audio/*"] }} 
            setPreview={setPreview}
          />
        </div>
      </section>
    </main>
  );
}

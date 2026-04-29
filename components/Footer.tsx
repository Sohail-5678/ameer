"use client";

import { Heart } from "lucide-react";
import { profile } from "@/lib/profile";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-10">
      <div className="container-x flex justify-center">
        <p className="font-mono text-xs text-white/40">
          © {new Date().getFullYear()} {profile.name}. Crafted with{" "}
          <Heart className="inline h-3.5 w-3.5 text-accent-warm" /> in
          College Park.
        </p>
      </div>
    </footer>
  );
}

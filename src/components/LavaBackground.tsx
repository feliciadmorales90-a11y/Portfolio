"use client";

import { useEffect, useState } from "react";

const blobs = [
  { size: 700, color: "#B5736E", opacity: 0.18, stop: 65, pos: { top: "5%", right: "-10%" }, anim: "lava1 28s" },
  { size: 600, color: "#C48B8B", opacity: 0.15, stop: 65, pos: { top: "25%", left: "-15%" }, anim: "lava2 32s" },
  { size: 500, color: "#B5736E", opacity: 0.16, stop: 65, pos: { top: "45%", right: "5%" }, anim: "lava3 24s" },
  { size: 550, color: "#D4A5A5", opacity: 0.14, stop: 65, pos: { top: "65%", left: "10%" }, anim: "lava4 36s" },
  { size: 800, color: "#A06560", opacity: 0.12, stop: 60, pos: { bottom: "-5%", left: "40%" }, anim: "lava5 40s" },
];

export default function LavaBackground() {
  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(true), []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden transition-opacity duration-1000"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {blobs.map((b) => (
        <div
          key={b.anim}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            opacity: b.opacity,
            background: `radial-gradient(circle, ${b.color} 0%, transparent ${b.stop}%)`,
            animation: `${b.anim} ease-in-out infinite`,
            ...b.pos,
          }}
        />
      ))}
    </div>
  );
}

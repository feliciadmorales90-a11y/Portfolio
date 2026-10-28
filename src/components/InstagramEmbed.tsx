"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

export default function InstagramEmbed({ url }: { url: string }) {
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
      return;
    }
    if (document.getElementById("instagram-embed-script")) return;
    const s = document.createElement("script");
    s.id = "instagram-embed-script";
    s.async = true;
    s.src = "https://www.instagram.com/embed.js";
    document.body.appendChild(s);
  }, []);

  return (
    <blockquote
      className="instagram-media"
      data-instgrm-captioned
      data-instgrm-permalink={`${url}?utm_source=ig_embed`}
      data-instgrm-version="14"
      style={{ background: "#fff", border: 0, borderRadius: 12, margin: 0, maxWidth: 540, minWidth: 280, width: "100%" }}
    >
      <a href={url} target="_blank" rel="noopener noreferrer" className="block p-6 text-sm text-accent">
        Watch on Instagram →
      </a>
    </blockquote>
  );
}

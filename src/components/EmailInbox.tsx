"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import type { EmailItem } from "@/data/work";

/** An inbox list beside a scrollable preview of the selected email, so visitors read the sequence as the audience did. */
export default function EmailInbox({ emails, sender }: { emails: EmailItem[]; sender: string }) {
  const [current, setCurrent] = useState(0);
  const pane = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const id = useId();
  const email = emails[current];

  const select = (i: number, fromList = false) => {
    setCurrent(i);
    pane.current?.scrollTo({ top: 0 });
    // On narrow screens the preview sits below the list, so bring it into view.
    if (fromList && window.matchMedia("(max-width: 1023px)").matches) {
      panel.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const nav =
    "w-8 h-8 rounded-full border border-card-border bg-white flex items-center justify-center text-sm hover:border-accent disabled:opacity-30 disabled:cursor-default";

  return (
    <div className="grid lg:grid-cols-[22rem_minmax(0,1fr)] rounded-2xl border border-card-border overflow-hidden bg-card-bg">
      <div className="lg:border-r border-card-border">
        <p className="text-[11px] font-mono uppercase tracking-widest text-muted px-4 py-3 border-b border-card-border">
          Inbox · {emails.length} emails
        </p>
        <div role="tablist" aria-label="Emails in the sequence" aria-orientation="vertical">
          {emails.map((e, i) => {
            const active = i === current;
            return (
              <button
                key={e.src}
                type="button"
                role="tab"
                id={`${id}-tab-${i}`}
                aria-selected={active}
                aria-controls={`${id}-panel`}
                onClick={() => select(i, true)}
                className={`w-full text-left grid grid-cols-[1.75rem_1fr] gap-3 px-4 py-3.5 border-b border-card-border transition-colors ${
                  active ? "bg-white shadow-[inset_3px_0_0_var(--accent)]" : "hover:bg-white/60"
                }`}
              >
                <span className={`font-mono text-[13px] pt-0.5 ${active ? "text-accent" : "text-muted"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-xs text-muted">
                    {sender} · <span className="font-mono text-[11px]">{e.label.replace(/^Email \d+ · /, "")}</span>
                  </span>
                  <span className={`block mt-1 text-[15px] leading-snug text-foreground ${active ? "font-semibold" : "font-medium"}`}>
                    {e.subject}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div ref={panel} id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${current}`} className="flex flex-col bg-[#eef0ee]">
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-card-border bg-white/70">
          <p className="text-sm text-foreground font-semibold truncate">{email.label}</p>
          <div className="flex items-center gap-2 shrink-0">
            {email.href && (
              <a href={email.href} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-accent hover:text-accent-light mr-2">
                View live ↗
              </a>
            )}
            <button type="button" className={nav} onClick={() => select(current - 1)} disabled={current === 0} aria-label="Previous email">
              ←
            </button>
            <button type="button" className={nav} onClick={() => select(current + 1)} disabled={current === emails.length - 1} aria-label="Next email">
              →
            </button>
          </div>
        </div>
        <div ref={pane} className="h-[70vh] lg:h-[720px] overflow-y-auto p-4 md:p-6">
          <div className="max-w-[600px] mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
            <Image
              key={email.src}
              src={email.src}
              alt={`${email.label}: ${email.subject}`}
              width={email.width}
              height={email.height}
              sizes="600px"
              className="w-full h-auto block"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

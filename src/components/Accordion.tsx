"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState, type ReactNode } from "react";

function Plus({ open, className = "" }: { open: boolean; className?: string }) {
  return (
    <span
      aria-hidden
      className={`text-accent text-xl leading-none shrink-0 ml-4 transition-transform duration-300 ${className}`}
      style={{ transform: open ? "rotate(45deg)" : "none" }}
    >
      +
    </span>
  );
}

function Panel({ open, id, children }: { open: boolean; id: string; children: ReactNode }) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          id={id}
          key="panel"
          className="overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Top-level section (The Problem, What I Did…). */
export function Section({ title, defaultOpen = true, children }: { title: string; defaultOpen?: boolean; children: ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className="border-b border-card-border">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 md:py-6 text-left group"
      >
        <h2 className="text-sm font-mono text-accent tracking-widest uppercase group-hover:text-accent-light transition-colors">
          {title}
        </h2>
        <Plus open={open} />
      </button>
      <Panel open={open} id={id}>
        <div className="pb-8 md:pb-10">{children}</div>
      </Panel>
    </div>
  );
}

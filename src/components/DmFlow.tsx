import type { DmFlow as Flow } from "@/data/work";

/** A DM automation shown as the conversation a follower sees, with a numbered key alongside. */
export default function DmFlow({ flow }: { flow: Flow }) {
  return (
    <div className="grid md:grid-cols-[400px_minmax(0,1fr)] gap-10 items-start">
      <div className="mx-auto w-full max-w-[380px] rounded-[44px] bg-[#111] p-3 shadow-[0_20px_50px_#0003]">
        <div className="bg-white rounded-[34px] overflow-hidden">
          <div className="flex items-center gap-2.5 px-4 pt-5 pb-3 border-b border-[#eee]">
            <span aria-hidden className="w-9 h-9 rounded-full bg-[#1414d8] text-white font-bold flex items-center justify-center">
              {flow.account[0].toUpperCase()}
            </span>
            <span>
              <span className="block font-semibold text-[15px] text-[#111]">{flow.account}</span>
              <span className="block text-xs text-[#888]">{flow.platform}</span>
            </span>
          </div>
          <ol aria-label="The automated conversation" className="flex flex-col gap-1.5 p-4 pb-6">
            <li className="text-center text-[11px] text-[#999] mb-2">{flow.trigger}</li>
            {flow.messages.map((m, i) => (
              <li key={m.button} className="flex flex-col gap-1.5">
                <p className="max-w-[80%] whitespace-pre-line bg-[#efefef] rounded-[20px_20px_20px_6px] px-3.5 py-3 text-sm leading-snug text-[#111]">
                  {m.text}
                </p>
                <span className="max-w-[80%] border border-[#dbdbdb] rounded-xl py-2.5 text-center text-sm font-semibold text-[#0064e0]">
                  {m.button}
                  {m.external && <span aria-hidden> ↗</span>}
                </span>
                {i < flow.messages.length - 1 && (
                  <span className="self-end my-2.5 bg-[#3797f0] text-white rounded-[20px_20px_6px_20px] px-3.5 py-2.5 text-sm">{m.button}</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
      <ol className="md:pt-4 space-y-6">
        {flow.steps.map((s, i) => (
          <li key={s.title} className="flex gap-4">
            <span className="shrink-0 w-8 h-8 rounded-full border-2 border-accent text-accent font-mono text-sm font-semibold flex items-center justify-center">
              {i + 1}
            </span>
            <span>
              <span className="block text-xs font-mono uppercase tracking-widest text-foreground/70 mt-0.5 mb-1">{s.title}</span>
              <span className="block text-muted leading-relaxed">{s.detail}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

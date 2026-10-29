import type { DmFlow as Flow } from "@/data/work";

const bubble = "max-w-[80%] whitespace-pre-line bg-[#efefef] rounded-[20px_20px_20px_6px] px-3.5 py-3 text-sm leading-snug text-[#111]";

function Avatar({ letter, color, small }: { letter: string; color?: string; small?: boolean }) {
  return (
    <span
      aria-hidden
      className={`shrink-0 rounded-full text-white font-bold flex items-center justify-center ${small ? "w-7 h-7 text-xs" : "w-9 h-9"}`}
      style={{ backgroundColor: color ?? "#1414d8" }}
    >
      {letter}
    </span>
  );
}

/** A DM automation shown as the conversation a follower sees, with a numbered key alongside. */
export default function DmFlow({ flow }: { flow: Flow }) {
  const letter = flow.account[0].toUpperCase();
  return (
    <section aria-label={flow.name}>
      <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-6">{flow.name}</h3>
      <div className="grid md:grid-cols-[400px_minmax(0,1fr)] gap-10 items-start">
        <div className="mx-auto w-full max-w-[380px] rounded-[44px] bg-[#111] p-3 shadow-[0_20px_50px_#0003]">
          <div className="bg-white rounded-[34px] overflow-hidden">
            {flow.comment && (
              <div className="px-4 pt-5 pb-4 border-b border-[#eee] bg-[#fafafa]">
                <p className="text-[11px] font-semibold text-[#999] uppercase tracking-wide mb-3">Comments on the post</p>
                <div className="flex gap-2.5">
                  <span aria-hidden className="shrink-0 w-7 h-7 rounded-full bg-[#d9d3cf]" />
                  <p className="text-[13px] text-[#111]">
                    {flow.comment.text}
                  </p>
                </div>
                <div className="flex gap-2.5 mt-3 ml-9">
                  <Avatar letter={letter} color={flow.avatarColor} small />
                  <p className="text-[13px] text-[#111]">
                    <span className="font-semibold">{flow.account}</span> {flow.comment.replies[0]}
                  </p>
                </div>
                {flow.comment.replies.length > 1 && (
                  <p className="text-[11px] text-[#888] mt-3 ml-9">Or: {flow.comment.replies.slice(1).join(" / ")}</p>
                )}
              </div>
            )}
            <div className="flex items-center gap-2.5 px-4 pt-5 pb-3 border-b border-[#eee]">
              <Avatar letter={letter} color={flow.avatarColor} />
              <span>
                <span className="block font-semibold text-[15px] text-[#111]">{flow.account}</span>
                <span className="block text-xs text-[#888]">{flow.platform}</span>
              </span>
            </div>
            <ol aria-label="The automated conversation" className="flex flex-col gap-1.5 p-4 pb-6">
              <li className="text-center text-[11px] text-[#999] mb-2">{flow.trigger}</li>
              {flow.messages.map((m, i) => (
                <li key={m.text} className="flex flex-col gap-1.5">
                  <p className={bubble}>{m.text}</p>
                  {m.button && (
                    <span className="max-w-[80%] border border-[#dbdbdb] rounded-xl py-2.5 text-center text-sm font-semibold text-[#0064e0]">
                      {m.button}
                      {m.external && <span aria-hidden> ↗</span>}
                    </span>
                  )}
                  {m.button && i < flow.messages.length - 1 && (
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
    </section>
  );
}

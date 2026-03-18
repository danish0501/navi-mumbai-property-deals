"use client";

interface FilterGroupProps {
    title: string;
    children: React.ReactNode;
}

export default function FilterGroup({ title, children }: FilterGroupProps) {
    return (
        <div className="pb-5 mb-5 border-b border-zinc-100 last:border-0 last:pb-0 last:mb-0">
            <p className="text-[11px] font-black text-zinc-400 uppercase tracking-widest mb-3">
                {title}
            </p>
            {children}
        </div>
    );
}

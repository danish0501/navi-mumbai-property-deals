"use client";

interface FilterPillProps {
    label: string;
    active: boolean;
    onClick: () => void;
}

export default function FilterPill({ label, active, onClick }: FilterPillProps) {
    return (
        <button
            onClick={onClick}
            className={`px-3.5 py-2 rounded-xl text-[13px] font-bold
                       border transition-all duration-250 whitespace-nowrap
                       ${active
                    ? "bg-[#baa360] text-white border-[#baa360] shadow-md"
                    : "bg-white text-zinc-600 border-zinc-200 hover:border-[#baa360]/50 hover:text-[#baa360]"
                }`}
        >
            {label}
        </button>
    );
}

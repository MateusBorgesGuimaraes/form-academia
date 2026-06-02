import type { CollectionEntry } from "astro:content";
import { cn } from "../../../lib/utils";

interface AulaCardProps {
  data: CollectionEntry<"aulas">["data"];
  id: string;
}

export default function AulaCard({ data, id }: AulaCardProps) {
  return (
    <a
      href={`/aulas/${id}`}
      className={cn(
        "group bg-black-mid py-6 px-5 border-t-2 border-transparent cursor-pointer transition-all duration-300 hover:border-yellow hover:bg-black-card",
        data.featured && "bg-yellow",
      )}
    >
      <p
        className={cn(
          "text-xs font-medium tracking-[0.18em] uppercase text-text-ghost mb-3 transition-colors duration-300",

          data.featured && "text-[rgba(0,0,0,0.4)] group-hover:text-text-ghost",
        )}
      >
        {data.tag}
      </p>

      <p
        className={cn(
          "font-display text-2xl font-bold text-text-primary uppercase tracking-[0.4em] mb-2 transition-colors duration-300",

          data.featured && "text-[#0A0A0A] group-hover:text-text-primary",
        )}
      >
        {data.name}
      </p>

      <p
        className={cn(
          "text-xs font-light text-text-subtle leading-[1.6] transition-colors duration-300",

          data.featured &&
            "text-[rgba(0,0,0,0.55)] group-hover:text-text-subtle",
        )}
      >
        {data.desc}
      </p>

      <div className="flex gap-2 mt-4 flex-wrap">
        <span
          className={cn(
            "text-[10px] font-normal tracking-widest uppercase text-text-ghost border-[0.5px] border-border-mid py-1 px-2 transition-colors duration-300",

            data.featured &&
              "border-[rgba(0,0,0,0.2)] text-[#0A0A0A] group-hover:text-text-ghost group-hover:border-border-mid",
          )}
        >
          {data.duration}
        </span>
        <span
          className={cn(
            "text-[10px] font-normal tracking-widest uppercase text-text-ghost border-[0.5px] border-border-mid py-1 px-2 transition-colors duration-300",

            data.featured &&
              "border-[rgba(0,0,0,0.2)] text-[#0A0A0A] group-hover:text-text-ghost group-hover:border-border-mid",
          )}
        >
          {data.level}
        </span>
      </div>

      <p
        className={cn(
          "text-xs font-light text-text-subtle leading-[1.6] transition-colors duration-300 mt-3",

          data.featured &&
            "text-[rgba(0,0,0,0.55)] group-hover:text-text-subtle",
        )}
      >
        {data.instructor}
      </p>
    </a>
  );
}

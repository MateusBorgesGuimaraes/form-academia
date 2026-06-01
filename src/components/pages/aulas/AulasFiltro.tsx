import type { CollectionEntry } from "astro:content";
import { useState } from "react";
import AulaCard from "../../ui/react/AulaCard";

type Aula = CollectionEntry<"aulas">;

interface Props {
  aulas: Aula[];
}

const CATEGORIES = [
  { value: "Todos", label: "Todos" },
  { value: "Força", label: "Força" },
  { value: "Cardio", label: "Cardio" },
  { value: "Mente & Corpo", label: "Mente e corpo" },
  { value: "Luta", label: "Luta" },
];

export default function AulasFiltro({ aulas }: Props) {
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filtered = aulas.filter(
    (aula) => activeFilter === "Todos" || aula.data.category === activeFilter,
  );

  return (
    <section>
      <div className="bg-black-mid">
        <div className="wrapper flex item-center justify-between">
          <div className="px-12 flex gap-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveFilter(cat.value)}
                className={`border-b-2 border-transparent py-8 px-5 cursor-pointer transition hover:border-yellow hover:text-yellow
                ${activeFilter === cat.value && "text-yellow border-yellow"}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="wrapper grid grid-cols-3 gap-0.5 py-12">
        {filtered.map((c) => (
          <AulaCard key={c.id} data={c.data} />
        ))}
      </div>
    </section>
  );
}

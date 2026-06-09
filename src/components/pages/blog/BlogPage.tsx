import type { CollectionEntry } from "astro:content";
import { useState } from "react";
import { cn } from "../../../lib/utils";
import { formatDate } from "../../../lib/format-date";

type Post = CollectionEntry<"blog">;

interface Props {
  posts: Post[];
}

const CATEGORIES = [
  { value: "todos", label: "Todos" },
  { value: "treino", label: "Treino" },
  { value: "nutricao", label: "Nutrição" },
  { value: "saude", label: "Saúde" },
  { value: "performance", label: "Performace" },
  { value: "lifestyle", label: "Lifestyle" },
];

export default function BlogPage({ posts }: Props) {
  const [category, setCategory] = useState("todos");
  const featured = posts.find((p) => p.data.featured);
  const rest = featured ? posts.filter((p) => p !== featured) : posts;

  const firstSix =
    category === "todos"
      ? rest.slice(0, 6)
      : rest.filter((p) => p.data.category === category).slice(0, 6);

  return (
    <section>
      <div className="py-6 border-y border-border">
        <div className="wrapper flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <h3 className="text-4xl">BLOG</h3>
            <p className="text-sm">{posts.length} artigos</p>
          </div>

          <div className="flex items-center gap-6">
            {CATEGORIES.map((c) => (
              <button
                onClick={() => setCategory(c.value)}
                className={cn(
                  "font-display! text-xl! uppercase font-bold! border-b-2 border-transparent hover:text-text-primary transition ",
                  category === c.value && "text-yellow border-yellow",
                )}
                key={c.value}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="wrapper grid grid-cols-2">
        <div className="border-r border-border py-12 pr-8 flex flex-col justify-between gap-12">
          <div>
            <p className="eyebrow">{featured?.data.category} · Destaque</p>
            <h2 className="title-page max-w-150 mt-2 mb-4">
              {featured?.data.title}
            </h2>
            <p className="mb-4">{featured?.data.excerpt}</p>
            <div className="flex items-center gap-1.5">
              <p className="w-8 h-8 rounded-full bg-black border border-border flex items-center justify-center font-display font-bold text-base text-yellow shrink-0">
                {featured?.data.author
                  .split(" ")
                  .map((w: string) => w[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </p>
              <p className="text-xs">{featured?.data.author}</p>
              <span>·</span>
              <p className="text-xs">
                {featured?.data.date && formatDate(featured.data.date)}
              </p>
              <span>·</span>
              <p className="text-xs">{featured?.data.readTime}</p>
            </div>

            <a
              href={"/"}
              className="mt-6 self-start text-lg font-display font-semibold uppercase no-underline border-b-[0.5px] pb-0.75 inline-block transition text-yellow border-border-sub hover:border-yellow"
            >
              Ler artigo →
            </a>
          </div>

          <div className="font-display font-bold text-text-dim text-9xl">
            01
          </div>
        </div>

        <div className="border-r border-border">
          <ul className="flex flex-col">
            {firstSix.map((p, i) => (
              <li
                key={p.id}
                className="group border-b border-border last-of-type:border-none hover:bg-black-mid transition-colors
                    duration-200"
              >
                <a className="flex gap-6 items-center py-6 pl-12 pr-6" href="/">
                  <span className="font-display font-bold text-4xl text-text-dim transition-colors  group-hover:text-yellow">
                    0{i + 2}
                  </span>

                  <div>
                    <span className="eyebrow-muted">{p.data.category}</span>

                    <h3 className="text-2xl text-text-subtle! transition-colors group-hover:text-text-primary!">
                      {p.data.title}
                    </h3>

                    <div className="flex items-center gap-1 mt-1.5">
                      <p className="text-xs">{p.data.author}</p>
                      <span>·</span>
                      <p className="text-xs">{formatDate(p.data.date)}</p>
                      <span>·</span>
                      <p className="text-xs">{p.data.readTime}</p>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

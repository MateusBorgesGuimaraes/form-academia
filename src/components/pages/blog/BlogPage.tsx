import type { CollectionEntry } from "astro:content";
import { useEffect, useState } from "react";
import { cn } from "../../../lib/utils";
import { formatDate } from "../../../lib/format-date";

type Post = CollectionEntry<"blog">;

interface Props {
  posts: Post[];
}

const TITLES = [
  "createina funciona?",
  "quantas vezes treinar",
  "defict calorico",
  "mobilidade no treino",
  "ovetraining",
];

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
  const [visible, setVisible] = useState(false);
  const [showAllArticles, setShowAllArticles] = useState(false);
  const featured = posts.find((p) => p.data.featured);
  const rest = featured ? posts.filter((p) => p !== featured) : posts;

  const firstSix =
    category === "todos"
      ? rest.slice(0, 6)
      : rest.filter((p) => p.data.category === category).slice(0, 6);

  const afterSix =
    category === "todos"
      ? rest.slice(6, 11)
      : rest.filter((p) => p.data.category === category).slice(6, 11);

  const allActive = rest.slice(6);
  useEffect(() => {
    if (showAllArticles) {
      setVisible(false);
      return;
    }

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY && currentScrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
              href={`/blog/${featured?.id}`}
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
                <a
                  className="flex gap-6 items-center py-6 pl-12 pr-6"
                  href={`/blog/${p.id}`}
                >
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

      {showAllArticles && (
        <div className="wrapper pb-12">
          <div className="grid grid-cols-3 ">
            {allActive.map((post) => (
              <a
                key={post.id}
                href={`/blog/${post.id}`}
                className="group border border-border p-8 bg-black hover:bg-black-mid transition-colors min-h-65 flex flex-col justify-between"
              >
                <div>
                  <span className="eyebrow-muted">{post.data.category}</span>

                  <h3 className="text-3xl mt-3 mb-4 group-hover:text-yellow transition-colors">
                    {post.data.title}
                  </h3>

                  <p className="text-text-dim line-clamp-3">
                    {post.data.excerpt}
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-2 text-xs text-text-dim">
                  <span>{post.data.author}</span>
                  <span>·</span>
                  <span>{formatDate(post.data.date)}</span>
                  <span>·</span>
                  <span>{post.data.readTime}</span>
                </div>
              </a>
            ))}
          </div>

          <div className="flex justify-end mt-8">
            <button
              onClick={() => setShowAllArticles(false)}
              className="text-sm uppercase border-b border-border-mid hover:text-yellow hover:border-yellow"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      <div
        className={cn(
          "fixed bottom-0 left-0 z-50 w-full bg-black-mid border-t border-border py-2 transition-transform duration-300",
          visible && !showAllArticles ? "translate-y-0" : "translate-y-full",
        )}
      >
        <div className="wrapper flex items-center justify-between gap-6">
          <p className="text-yellow uppercase tracking-widest text-xs">
            MAIS ARTIGOS
          </p>

          <div className="grid grid-cols-5 gap-3 flex-1">
            {afterSix.map((a) => (
              <a
                href={`/blog/${a.id}`}
                key={a.data.title}
                className="text-text-dim px-2 py-2 w-full overflow-hidden truncate text-base uppercase font-display font-semibold transition hover:text-yellow"
                title={a.data.title}
              >
                {a.data.title}
              </a>
            ))}
          </div>

          <button
            onClick={() => setShowAllArticles(true)}
            className="text-nowrap text-xs! uppercase border-b border-border-mid transition hover:text-yellow hover:border-yellow"
          >
            Ver todos os artigos →
          </button>
        </div>
      </div>
    </section>
  );
}

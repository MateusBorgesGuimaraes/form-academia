import type { CollectionEntry } from "astro:content";

type Trainer = CollectionEntry<"trainers">;

export function formatTrainerSummary(trainer: Trainer) {
  const { experience, formation, spec } = trainer.data;

  const mainSpec = spec.split("·")[0].trim().toLowerCase();

  const graduation = formation.find(
    (item) =>
      item.title.toLowerCase().includes("bacharelado") ||
      item.title.toLowerCase().includes("graduação"),
  );

  const postGraduation = formation.find(
    (item) =>
      item.title.toLowerCase().includes("pós") ||
      item.title.toLowerCase().includes("especialização"),
  );

  const parts = [
    `CREF ativo com ${experience} ${
      experience === 1 ? "ano" : "anos"
    } de experiência.`,

    `Especialista em ${mainSpec}.`,
  ];

  if (graduation) {
    parts.push(
      `Formado em ${graduation.title} pela ${graduation.institution}.`,
    );
  }

  if (postGraduation) {
    parts.push(`${postGraduation.title} pela ${postGraduation.institution}.`);
  }

  return parts.join(" ");
}

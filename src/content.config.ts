import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

/* ── Aulas ── */
const aulas = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/aulas" }),
  schema: z.object({
    name: z.string(),
    tag: z.string(), // ex: "Cardio · Alta intensidade"
    desc: z.string(),
    duration: z.string(), // ex: "45 min"
    level: z.enum(["Todos", "Iniciante", "Intermediário", "Avançado"]),
    category: z.enum(["Força", "Cardio", "Mente & Corpo", "Luta"]),
    featured: z.boolean().default(false),
    instructor: z.string(), // nome do trainer
    spots: z.number().default(20), // vagas por turma
    plan: z.enum(["Basic", "Pro", "Elite"]), // plano mínimo para participar
    schedules: z
      .array(
        z.object({
          day: z.string(), // ex: "Segunda"
          times: z.array(z.string()), // ex: ["07h00", "12h00", "19h00"]
          instructor: z.string(),
        }),
      )
      .optional(),
  }),
});

/* ── Trainers ── */
const trainers = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/trainers" }),
  schema: z.object({
    name: z.string(),
    initials: z.string(), // ex: "RV"
    spec: z.string(), // ex: "Hipertrofia · Emagrecimento · HIIT"
    bio: z.string(),
    tags: z.array(z.string()),
    cref: z.string(), // número do CREF
    students: z.number(), // alunos atendidos
    experience: z.number(), // anos de experiência
    satisfaction: z.number(), // % de satisfação
    formation: z.array(
      z.object({
        year: z.string(),
        title: z.string(),
        institution: z.string(),
      }),
    ),
    specialties: z.array(
      z.object({
        name: z.string(),
        desc: z.string(),
      }),
    ),
    availability: z
      .array(
        z.object({
          day: z.string(),
          slots: z.array(z.string()), // ex: ["06h", "08h", "10h"]
        }),
      )
      .optional(),
  }),
});

/* ── Blog ── */
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    author: z.string(),
    date: z.date(),
    category: z.enum([
      "treino",
      "nutricao",
      "saude",
      "performance",
      "lifestyle",
    ]),
    featured: z.boolean().default(false),
    readTime: z.string(),
    cover: z.url().optional(),
  }),
});

export const collections = { aulas, trainers, blog };

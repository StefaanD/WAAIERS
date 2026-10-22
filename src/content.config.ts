
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// --------------------------------------------------
// Herbruikbaar schema voor artikels binnen een editie
// --------------------------------------------------

const artikelSchema = z.object({
  titel: z.string(),

  auteurs: z.array(z.string()).optional(),
  jaren: z.array(z.number().int()).optional(),
  onderwerp: z.string().optional(),
  renners: z.array(z.string()).optional(),
  ploegen: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

// --------------------------------------------------
// Edities
// --------------------------------------------------

const edities = defineCollection({
  loader: glob({
    base: "./src/content/edities",
    pattern: "**/*.md",
  }),
  schema: z.object({
    titel: z.string(),
    jaargang: z.number().int(),
    nummer: z.number().int(),
    verschijningsdatum: z.coerce.date(),

    cover: z.string(),
    pdf: z.string(),
    bestandsgrootte: z.string(),
    paginas: z.number().int().positive(),

    artikels: z.array(artikelSchema),

    franse_editie: z.object({
      beschikbaar: z.boolean(),
      cover: z.string().nullable(),
      pdf: z.string().nullable(),
      bestandsgrootte: z.string().nullable(),
    }),
  }),
});

 // --------------------------------------------------
 // Franstalige edities
 // --------------------------------------------------

const editiesFr = defineCollection({
  loader: glob({
    base: "./src/content/edities-fr",
    pattern: "**/*.md",
  }),
  schema: z.object({
    titel: z.string(),
    jaargang: z.number().int(),
    nummer: z.number().int(),
    verschijningsdatum: z.coerce.date(),
    cover: z.string(),
    pdf: z.string(),
    bestandsgrootte: z.string(),
    paginas: z.number().int().positive(),
    artikels: z.array(
      z.object({
        titel: z.string(),
      })
    ),
  }),
});

// --------------------------------------------------
// Berichten
// --------------------------------------------------

const berichten = defineCollection({
  loader: glob({
    base: "./src/content/berichten",
    pattern: "**/*.md",
  }),
  schema: z.object({
    titel: z.string(),
    datum: z.coerce.date(),
    omschrijving: z.string(),

    afbeelding: z.string().optional(),

    auteur: z.string().optional(),
    rol: z.string().optional(),
    redactietitel: z.string().optional(),
    redactie: z.string().optional(),
  }),
});

// --------------------------------------------------
// Geactualiseerde artikels
// --------------------------------------------------

const geactualiseerdeArtikels = defineCollection({
  loader: glob({
    base: "./src/content/geactualiseerde-artikels",
    pattern: "**/*.md",
  }),
  schema: z.object({
    titel: z.string(),
    subtitel: z.string(),
    verschijningsdatum: z.coerce.date(),

    broneditie: z.string(),
    bronpaginas: z.string(),

    cover: z.string(),
    pdf: z.string(),
    bestandsgrootte: z.string(),
    paginas: z.number().int().positive(),

    onderwerp: z.string().optional(),
    jaren: z.array(z.number().int()).optional(),
    tags: z.array(z.string()).optional(),
    renners: z.array(z.string()).optional(),
  }),
});

// --------------------------------------------------
// Andere publicaties
// --------------------------------------------------

const anderePublicaties = defineCollection({
  loader: glob({
    base: "./src/content/andere-publicaties",
    pattern: "**/*.md",
  }),
  schema: z.object({
    titel: z.string(),
    verschijningsjaar: z.number().int(),

    cover: z.string(),
    paginas: z.number().int().positive(),
    formaat: z.string(),
    bindwijze: z.string(),
    ISBN: z.string().optional(),
    taal: z.string(),

    auteurs: z.array(z.string()),
    uitgever: z.string(),
  }),
});

// --------------------------------------------------
// Redactie
// --------------------------------------------------

const redactie = defineCollection({
  loader: glob({
    base: "./src/content/redactie",
    pattern: "**/*.md",
  }),
  schema: z.object({
    naam: z.string(),
    functie: z.string(),
    afbeelding: z.string(),
  }),
});

// --------------------------------------------------
// Alle collecties beschikbaar maken voor Astro
// --------------------------------------------------

export const collections = {
  edities,
  "edities-fr": editiesFr,
  berichten,
  "geactualiseerde-artikels": geactualiseerdeArtikels,
  "andere-publicaties": anderePublicaties,
  redactie,
};
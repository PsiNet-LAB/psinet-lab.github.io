/**
 * Blog entries data source.
 * Both index.html (recent blogs) and blog/index.html (full blog page)
 * read from this array.
 *
 * To add a new entry, append an object with the following fields:
 *   date  – ISO 8601 date string (used for sorting, most‑recent first)
 *   tag   – category label displayed above the title
 *   emoji – emoji shown in the card image area
 *   title – blog post title
 *   excerpt – short description / summary
 *   url   – link to the full article (optional, defaults to "#")
 */
var BLOG_ENTRIES = [
  {
    date: "2026-04-03",
    tag: "Investigación",
    emoji: "🕸️",
    title: "Análisis de redes psicométricas en R: un enfoque alternativo para la evaluación psicológica",
    excerpt: "Descubre cómo el análisis de redes complementa los modelos tradicionales de variables latentes para comprender la estructura de los constructos psicológicos.",
    url: "blog/analisis-redes-psicometricas/"
  }
];

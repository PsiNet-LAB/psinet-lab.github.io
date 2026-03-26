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
    date: "2025-06-01",
    tag: "Investigación",
    emoji: "🧠",
    title: "Explorando la complejidad del comportamiento humano",
    excerpt: "Descubre cómo la teoría de la complejidad transforma nuestra comprensión del bienestar psicológico.",
    url: "#"
  },
  {
    date: "2025-05-15",
    tag: "Proyectos",
    emoji: "🌱",
    title: "BienEstar: impacto comunitario basado en evidencia",
    excerpt: "Cómo el proyecto BienEstar está transformando comunidades a través de intervenciones psicológicas.",
    url: "#"
  },
  {
    date: "2025-05-01",
    tag: "Educación",
    emoji: "🎓",
    title: "PsiNet EsCool: ciencia psicológica en las aulas",
    excerpt: "Llevando el conocimiento psicológico a estudiantes para fomentar una cultura científica desde temprana edad.",
    url: "#"
  }
];

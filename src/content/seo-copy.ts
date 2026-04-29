/**
 * Default SSR SEO copy (Spanish). Aligns with html lang="es" and site marketing.
 */
export const seoCopyEs = {
  home: {
    title: "Ai /abs — El hub de tech e IA de El Salvador",
    description:
      "Una comunidad de builders curiosos explorando lo posible con IA. Empezando en El Salvador.",
  },
  partners: {
    title: "Partners — Ai /abs",
    description:
      "Alianzas con builders en El Salvador: herramientas, espacio y visibilidad para experimentos reales con IA.",
  },
  showcaseIndex: {
    title: "Showcase — Ai /abs",
    description:
      "Proyectos y experimentos que la comunidad construye con IA: demos, herramientas y aprendizajes compartidos.",
  },
  hackathonGroupsIndex: {
    title: "Hackathon Groups — Ai /abs",
    description:
      "Sube proyectos de tu grupo durante el hackathon y mantén un historial claro de avances.",
  },
  hackathonGroupsSubmit: {
    title: "Subir proyecto de hackathon — Ai /abs",
    description:
      "Carga o actualiza proyectos de tu grupo en cualquier momento durante la sesión.",
  },
  terms: {
    title: "Términos — Ai /abs",
    description:
      "Términos del servicio y uso de la comunidad Ai /abs en El Salvador.",
  },
  links: {
    title: "Enlaces oficiales — Ai /abs | WhatsApp, eventos y redes",
    description:
      "Página de enlaces de Ai /abs (El Salvador): comunidad en WhatsApp, próximos meetups, Instagram, LinkedIn, X y sitio principal.",
  },
  eventDetail: {
    title: "Evento — Ai /abs",
    description: "Detalle del evento (próximamente).",
  },
  blog: {
    title: "Blog — Ai /abs",
    description: "Próximamente: artículos y aprendizajes del Lab.",
  },
  signIn: {
    title: "Iniciar sesión — Ai /abs",
    description: "Acceso a la comunidad Ai /abs.",
  },
  signUp: {
    title: "Crear cuenta — Ai /abs",
    description: "Únete a la comunidad Ai /abs.",
  },
  onboarding: {
    title: "Onboarding — Ai /abs",
    description: "Completa tu perfil en Ai /abs.",
  },
  me: {
    title: "Mi perfil — Ai /abs",
    description: "Tu perfil en Ai /abs.",
  },
  admin: {
    title: "Admin — Ai /abs",
    description: "Administración Ai /abs.",
  },
  showcaseSubmit: {
    title: "Enviar proyecto — Ai /abs",
    description: "Publica un proyecto en el showcase.",
  },
  designSystem: {
    title: "Design system — Ai /abs",
    description: "Uso interno Ai /abs.",
  },
  slidesIndex: {
    title: "Presentaciones — Ai /abs",
    description:
      "Listado de decks de presentación. Acceso restringido; no aparece en el mapa del sitio.",
  },
  slidesDeck: (deckId: string) => ({
    title: `Presentación (${deckId}) — Ai /abs`,
    description:
      "Material para eventos y presentaciones. No aparece en el mapa del sitio; uso compartido por enlace.",
  }),
  ssoCallback: {
    title: "Iniciando sesión — Ai /abs",
    description: "Redirección de inicio de sesión.",
  },
} as const;

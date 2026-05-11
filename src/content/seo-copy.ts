/**
 * Default SSR SEO copy (Spanish). Aligns with html lang="es" and site marketing.
 */
export const seoCopyEs = {
  home: {
    title: 'Ai /abs — El lab práctico de IA de El Salvador',
    description:
      'Comunidad, training y práctica con IA para builders, equipos y aliados que quieren usar IA con criterio.',
  },
  workWithUs: {
    title: 'Work with us — Training y consultoría IA | Ai /abs',
    description:
      'Training, consultoría, workshops y prototipos para equipos que quieren usar herramientas de IA con más criterio.',
  },
  partners: {
    title: 'Partners — Ai /abs',
    description:
      'Alianzas para apoyar el ecosistema de IA y llevar práctica, training y workshops a equipos e instituciones.',
  },
  events: {
    title: 'Eventos — Ai /abs',
    description:
      'Workshops, hackathons, meetups y campus labs donde builders, equipos y aliados aprenden IA haciendo.',
  },
  showcaseIndex: {
    title: 'Showcase — Ai /abs',
    description:
      'Proyectos que la comunidad construye con IA: demos, herramientas y aprendizajes compartidos.',
  },
  terms: {
    title: 'Términos — Ai /abs',
    description:
      'Términos del servicio y uso de la comunidad Ai /abs en El Salvador.',
  },
  links: {
    title: 'Enlaces oficiales — Ai /abs | WhatsApp, eventos y redes',
    description:
      'Página de enlaces de Ai /abs (El Salvador): comunidad en WhatsApp, próximos meetups, Instagram, LinkedIn, X y sitio principal.',
  },
  eventDetail: {
    title: 'Evento — Ai /abs',
    description: 'Detalle del evento (próximamente).',
  },
  blog: {
    title: 'Blog — Ai /abs',
    description: 'Próximamente: artículos y aprendizajes del Lab.',
  },
  signIn: {
    title: 'Iniciar sesión — Ai /abs',
    description: 'Acceso a la comunidad Ai /abs.',
  },
  signUp: {
    title: 'Crear cuenta — Ai /abs',
    description: 'Únete a la comunidad Ai /abs.',
  },
  onboarding: {
    title: 'Onboarding — Ai /abs',
    description: 'Completa tu perfil en Ai /abs.',
  },
  me: {
    title: 'Mi perfil — Ai /abs',
    description: 'Tu perfil en Ai /abs.',
  },
  admin: {
    title: 'Admin — Ai /abs',
    description: 'Administración Ai /abs.',
  },
  showcaseSubmit: {
    title: 'Enviar proyecto — Ai /abs',
    description: 'Publica un proyecto en el showcase.',
  },
  designSystem: {
    title: 'Design system — Ai /abs',
    description: 'Uso interno Ai /abs.',
  },
  slidesIndex: {
    title: 'Presentaciones — Ai /abs',
    description:
      'Listado de decks de presentación. Acceso restringido; no aparece en el mapa del sitio.',
  },
  slidesDeck: (deckId: string) => ({
    title: `Presentación (${deckId}) — Ai /abs`,
    description:
      'Material para eventos y presentaciones. No aparece en el mapa del sitio; uso compartido por enlace.',
  }),
  slidesDeckFigma: (deckId: string) => ({
    title: `Captura Figma (${deckId}) — Ai /abs`,
    description:
      'Vista interna para capturar slides reales en Figma desde el DOM de la presentación.',
  }),
  ssoCallback: {
    title: 'Iniciando sesión — Ai /abs',
    description: 'Redirección de inicio de sesión.',
  },
} as const

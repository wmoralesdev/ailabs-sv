export type Language = "es" | "en";

export interface SiteContent {
  site: {
    name: string;
    pageTitle: string;
    description: string;
    location: string;
    whatsappLink: string;
    newsletterLink?: string;
  };
  hero: {
    headlineLine1: string;
    headlineLine2: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
  };
  communityMembers: Array<{
    name: string;
    role: string;
    bio: string;
    avatar?: string;
    socials?: { twitter?: string; linkedin?: string; github?: string };
    badges?: Array<string>;
  }>;
  ambassador: {
    name: string;
    role: string;
    bio: string;
    image: string;
    sectionTitle: string;
    cta: string;
    purposeFraming: string;
    purposeItems: Array<string>;
    socials: {
      twitter?: string;
      linkedin?: string;
      github?: string;
      website?: string;
    };
  };
  stats: {
    members: string;
    membersBadge?: string;
    eventsHeld: string;
    projectsShipped: string;
    partners: string;
  };
  lab: {
    label: string;
    heading: string;
    cards: Array<{ title: string; description: string }>;
  };
  why: {
    badge: string;
    heading: string;
    subtext: string;
  };
  learningPreview: {
    badge: string;
    heading: string;
    cards: Array<{ title: string; description: string; date: string }>;
  };
  ecosystem: {
    label: string;
    heading: string;
    ctaLabel: string;
    partners: Array<{ name: string; url: string }>;
  };
  joinCta: {
    badge: string;
    heading: string;
    subtext: string;
    cta: string;
    finePrint: string;
  };
  eventsGallery: {
    badge: string;
    title: string;
  };
  testimonials: Array<{
    quote: string;
    author: string;
    role: string;
  }>;
  events: {
    badge: string;
    sectionTitle: string;
    tagline: string;
    upcomingTitle: string;
    pastTitle: string;
    noUpcoming: string;
    rsvpButton: string;
    recapButton: string;
    upcoming: Array<{
      id: string;
      title: string;
      date: string;
      location: string;
      description: string;
      rsvpLink: string;
      type: "Meetup" | "Workshop" | "Social" | "Conference" | "Hackathon";
      tags: Array<string>;
    }>;
    past: Array<{
      id: string;
      title: string;
      date: string;
      image: string;
      recapLink?: string;
      span?: "col-span-1" | "col-span-2" | "row-span-2";
    }>;
  };
  partner: {
    title: string;
    description: string;
    cta: string;
    email: string;
    ctaSecondary: string;
  };
  sponsorKit: {
    title: string;
    subtitle: string;
    valueProp: Array<string>;
    audienceTitle: string;
    audienceDescription: string;
    packagesTitle: string;
    packages: Array<{
      name: string;
      price?: string;
      features: Array<string>;
    }>;
    contactTitle: string;
    contactDescription: string;
    contactCta: string;
  };
  midPageCta: {
    badge: string;
    sectionTitle: string;
    prompt: string;
    linkText: string;
  };
  ui: {
    nav: { overview: string; community: string; events: string; partners: string; blog: string; join: string };
    footer: {
      organization: string;
      resources: string;
      stayUpdated: string;
      newsletterText: string;
      emailPlaceholder: string;
      subscribe: string;
      madeWith: string;
      inSanSalvador: string;
      overview: string;
      community: string;
      events: string;
      contact: string;
      whatsapp: string;
    };
    hero: { badgeLabel: string };
    communityMembers: { badge: string; title: string; desc: string };
    stats: {
      badge: string;
      sectionTitle: string;
      sectionDesc: string;
      members: string;
      membersDetail: string;
      events: string;
      eventsDetail: string;
      projectsShipped: string;
      projectsShippedDetail: string;
      partners: string;
      partnersDetail: string;
    };
    testimonials: { badge: string; title: string };
    highlights: { badge: string; whySponsor: string };
    ambassador: { github: string; x: string; photoPlaceholder: string };
    a11y: { search: string; switchToEnglish: string; switchToSpanish: string; selectTheme: string; themeLight: string; themeDark: string; themeSystem: string };
  };
}

const contentEs: SiteContent = {
  site: {
    name: "AI Labs SV",
    pageTitle: "AI Labs SV - El hub de tech e IA de El Salvador",
    description: "Una comunidad de builders curiosos explorando lo posible con IA. Empezando en El Salvador.",
    location: "San Salvador, El Salvador",
    whatsappLink: "https://chat.whatsapp.com/PLACEHOLDER",
  },
  hero: {
    headlineLine1: "La curiosidad nos mueve.",
    headlineLine2: "La IA es como exploramos.",
    subheadline: "Una comunidad de builders en El Salvador que hace preguntas, experimenta y comparte lo que aprende.",
    primaryCta: "Explorar el Lab",
    secondaryCta: "Ver qué estamos explorando",
  },
  communityMembers: [
    { name: "Walter Morales", role: "EVENT LEAD", bio: "Construyendo AI Labs SV. Preguntando por qué no." },
    { name: "Andrea Gómez", role: "MENTOR", bio: "Haciendo que React haga cosas nuevas." },
    { name: "Carlos Méndez", role: "CTO", bio: "Escalando sistemas. Cuestionando lo establecido." },
    { name: "Sofía Ruiz", role: "AI ENGINEER", bio: "Enseñando a los LLMs a pensar diferente." },
    { name: "Javier López", role: "FULLSTACK DEV", bio: "Experimentos full-stack, a diario." },
    { name: "Elena Martínez", role: "PRODUCT DESIGNER", bio: "Diseñando para humanos, probando con IA." },
    { name: "Ricardo S.", role: "BACKEND DEV", bio: "Sistemas distribuidos, curiosidad concentrada." },
    { name: "Gabriela P.", role: "DATA SCIENTIST", bio: "Encontrando patrones que otros no ven." },
  ],
  ambassador: {
    name: "Walter Morales",
    role: "Founder",
    bio: "Fundó AI Labs SV porque tenía preguntas sobre qué podía hacer la IA — y no encontraba a nadie en El Salvador haciéndolas. Ahora más de 500 builders de la región exploran juntos.",
    image: "/images/walter-morales.webp",
    sectionTitle: "THE STORY",
    cta: "wmorales.dev →",
    purposeFraming: "¿Quieres construir algo con nosotros?",
    purposeItems: [
      "Alianzas que crean oportunidades de aprendizaje",
      "Invitaciones a charlas que generan discusiones",
      "Conexiones con builders curiosos",
    ],
    socials: {
      twitter: "https://twitter.com/wmoralesdev",
      linkedin: "https://linkedin.com/in/wmoralesdev",
      github: "https://github.com/wmoralesdev",
      website: "https://wmorales.dev",
    },
  },
  stats: {
    members: "500+",
    membersBadge: "+12%",
    eventsHeld: "12",
    projectsShipped: "20+",
    partners: "8",
  },
  lab: {
    label: "THE LAB",
    heading: "Donde las preguntas se vuelven proyectos",
    cards: [
      { title: "Hackathons", description: "48 horas para responder una pregunta: ¿qué podemos construir?" },
      { title: "Workshops", description: "Sesiones prácticas con las herramientas que vale la pena aprender ahora mismo." },
      { title: "Demo Days", description: "Muestras mensuales. Sin diapositivas. Solo experimentos reales." },
    ],
  },
  why: {
    badge: "WHY",
    heading: "Creemos que la mejor forma de entender la IA es haciendo tus propias preguntas.",
    subtext: "No seguir un currículum. No ver un tutorial. Hacer una pregunta, construir algo para responderla y compartir lo que aprendes. Eso es lo que hacemos aquí — y creemos que América Latina debería tener más de esto.",
  },
  learningPreview: {
    badge: "FROM THE LAB",
    heading: "Lo que estamos aprendiendo",
    cards: [
      { title: "Construyendo con agentes de IA", description: "Cómo pasamos de prototipos de LLM a agentes que realmente funcionan en producción.", date: "Febrero 2026" },
      { title: "Cursor + v0: el stack de los curiosos", description: "Por qué estas herramientas cambiaron la forma en que prototipeamos — y qué aprendimos en el camino.", date: "Enero 2026" },
      { title: "Las preguntas que nadie hace", description: "Tres experimentos que fallaron, y por qué importan más que los que funcionaron.", date: "Diciembre 2025" },
    ],
  },
  ecosystem: {
    label: "PARTNERS",
    heading: "Aliados de aprendizaje",
    ctaLabel: "¿Curiosidad por colaborar?",
    partners: [
      { name: "Cursor", url: "https://cursor.com" },
      { name: "Vercel", url: "https://vercel.com" },
      { name: "Supabase", url: "https://supabase.com" },
      { name: "Convex", url: "https://convex.dev" },
      { name: "v0", url: "https://v0.dev" },
    ],
  },
  eventsGallery: {
    badge: "GALERÍA",
    title: "Galería de eventos",
  },
  joinCta: {
    badge: "ÚNETE",
    heading: "¿Tienes preguntas? Bien.",
    subtext: "Únete a más de 500 builders explorando lo posible con IA.",
    cta: "Unirse a AI Labs",
    finePrint: "Gratis. Sin gatekeeping. Solo gente curiosa.",
  },
  testimonials: [
    {
      quote: "Vine a aprender una herramienta. Me fui haciendo mejores preguntas sobre cómo construyo.",
      author: "Andrea Gómez",
      role: "Senior Frontend Dev",
    },
    {
      quote: "Lo mejor no es la IA. Es estar rodeado de gente que de verdad quiere entender las cosas.",
      author: "Carlos Méndez",
      role: "CTO @ TechSV",
    },
  ],
  events: {
    badge: "PRÓXIMOS",
    sectionTitle: "Eventos",
    tagline: "Workshops, hackathons y meetups para builders curiosos.",
    upcomingTitle: "Próximos eventos",
    pastTitle: "Galería de eventos",
    noUpcoming: "Pronto anunciaremos nuevas fechas.",
    rsvpButton: "Confirmar asistencia",
    recapButton: "Ver resumen",
    upcoming: [
      {
        id: "next-meetup",
        title: "AI Labs & Coffee: AI Workflow Deep Dive",
        date: "Sábado 15 de marzo, 10:00 AM",
        location: "Impact Hub San Salvador",
        description: "Trae tu laptop y tus preguntas. Lo demás lo resolvemos juntos.",
        rsvpLink: "https://chat.whatsapp.com/PLACEHOLDER",
        type: "Workshop",
        tags: ["AI", "Workflow", "Networking"],
      },
      {
        id: "hackathon-agents",
        title: "Hackathon: Build with Agents",
        date: "Sábado 12 de abril, 9:00 AM",
        location: "Tech Loft",
        description: "Una pregunta, 48 horas, y lo que puedas construir para responderla.",
        rsvpLink: "https://chat.whatsapp.com/PLACEHOLDER",
        type: "Hackathon",
        tags: ["Hackathon", "Agents", "Code"],
      },
      {
        id: "social-night",
        title: "Social Night: Devs & Drinks",
        date: "Viernes 25 de abril, 7:00 PM",
        location: "Cervecería La 20",
        description: "Sin agenda. Solo conversaciones con gente construyendo cosas interesantes.",
        rsvpLink: "https://chat.whatsapp.com/PLACEHOLDER",
        type: "Social",
        tags: ["Networking", "Community", "Fun"],
      },
    ],
    past: [
      {
        id: "launch-party",
        title: "AI Labs Launch Party",
        date: "febrero 2026",
        image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop",
        span: "col-span-2",
      },
      {
        id: "ai-talk",
        title: "Charla: El Futuro del Código",
        date: "enero 2026",
        image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=2072&auto=format&fit=crop",
        span: "row-span-2",
      },
      {
        id: "networking-night",
        title: "Networking Night",
        date: "diciembre 2025",
        image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop",
      },
      {
        id: "workshop-1",
        title: "Primer Workshop",
        date: "noviembre 2025",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
      },
      {
        id: "panel-ai",
        title: "Panel: IA en Producción",
        date: "octubre 2025",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format&fit=crop",
        span: "col-span-2",
      },
      {
        id: "ama-session",
        title: "AI Labs AMA",
        date: "septiembre 2025",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop",
      },
    ],
  },
  partner: {
    title: "¿Curiosidad por colaborar?",
    description: "Buscamos espacios, speakers y patrocinadores que creen en aprender haciendo.",
    cta: "Contactar para alianza",
    email: "hello@ailabs.sv",
    ctaSecondary: "Ver oportunidades",
  },
  sponsorKit: {
    title: "Kit de patrocinio",
    subtitle: "Llega a los builders que hacen las preguntas difíciles.",
    valueProp: [
      "Acceso directo a talento tech de alto nivel.",
      "Posicionamiento de marca en eventos exclusivos.",
      "Oportunidad de presentar tus productos o servicios.",
    ],
    audienceTitle: "¿Por qué patrocinar?",
    audienceDescription: "Nuestra comunidad está formada por early adopters, tech leads y fundadores que están moldeando el futuro del software en la región.",
    packagesTitle: "Paquetes de patrocinio",
    packages: [
      {
        name: "Community Partner",
        features: ["Logo en sitio web", "Mención en redes sociales", "Espacio para swag en eventos"],
      },
      {
        name: "Event Sponsor",
        features: ["Todo lo anterior", "5 minutos de pitch en evento", "Logo destacado en banners"],
      },
      {
        name: "Ecosystem Lead",
        features: ["Patrocinio anual", "Workshop dedicado", "Acceso a base de talento (opt-in)"],
      },
    ],
    contactTitle: "Hagamos historia juntos",
    contactDescription: "Contáctanos para personalizar un paquete que se ajuste a tus objetivos.",
    contactCta: "Solicitar información",
  },
  midPageCta: {
    badge: "ÚNETE",
    sectionTitle: "¿Listo para hacer preguntas?",
    prompt: "Únete a la comunidad de builders que exploran lo posible con IA.",
    linkText: "Unirse al grupo de WhatsApp",
  },
  ui: {
    nav: {
      overview: "Inicio",
      community: "Comunidad",
      events: "Eventos",
      partners: "Partners",
      blog: "Blog",
      join: "Explorar el Lab",
    },
    footer: {
      organization: "Explorar",
      resources: "Recursos",
      stayUpdated: "Mantente al día",
      newsletterText: "Recibe lo último del lab — eventos, experimentos y preguntas que vale la pena hacer.",
      emailPlaceholder: "correo@ejemplo.com",
      subscribe: "Suscribirme",
      madeWith: "Hecho con",
      inSanSalvador: "en San Salvador.",
      overview: "Inicio",
      community: "Comunidad",
      events: "Eventos",
      contact: "Contacto",
      whatsapp: "WhatsApp",
    },
    hero: { badgeLabel: "Abierto a los curiosos" },
    communityMembers: {
      badge: "THE CURIOUS ONES",
      title: "Gente que pregunta por qué",
      desc: "Builders, diseñadores y líderes que aprenden haciendo y comparten lo que descubren.",
    },
    stats: {
      badge: "IMPACTO",
      sectionTitle: "Impacto del ecosistema",
      sectionDesc: "Crecimiento de la comunidad en números, contribuciones y momentos creados.",
      members: "Miembros activos",
      membersDetail: "BUILDERS CURIOSOS",
      events: "Eventos realizados",
      eventsDetail: "EVENTOS REALIZADOS",
      projectsShipped: "Proyectos",
      projectsShippedDetail: "EXPERIMENTOS LANZADOS",
      partners: "Aliados",
      partnersDetail: "ALIADOS DE APRENDIZAJE",
    },
    testimonials: { badge: "VOICES", title: "Lo que dicen los miembros" },
    highlights: { badge: "Destacados", whySponsor: "Por qué patrocinar" },
    ambassador: { github: "GitHub", x: "X", photoPlaceholder: "Foto del embajador" },
    a11y: {
      search: "Buscar",
      switchToEnglish: "Cambiar a inglés",
      switchToSpanish: "Cambiar a español",
      selectTheme: "Seleccionar tema",
      themeLight: "Claro",
      themeDark: "Oscuro",
      themeSystem: "Sistema",
    },
  },
};

const contentEn: SiteContent = {
  site: {
    name: "AI Labs SV",
    pageTitle: "AI Labs SV - El Salvador's Tech and AI Community Hub",
    description: "A community of curious builders exploring what's possible with AI. Starting in El Salvador.",
    location: "San Salvador, El Salvador",
    whatsappLink: "https://chat.whatsapp.com/PLACEHOLDER",
  },
  hero: {
    headlineLine1: "Curiosity is what drives us.",
    headlineLine2: "AI is how we explore.",
    subheadline: "A community of builders in El Salvador who ask questions, run experiments, and share what they learn.",
    primaryCta: "Explore the Lab",
    secondaryCta: "See what we're exploring",
  },
  communityMembers: [
    { name: "Walter Morales", role: "EVENT LEAD", bio: "Building AI Labs SV. Asking why not." },
    { name: "Andrea Gómez", role: "MENTOR", bio: "Making React do new things." },
    { name: "Carlos Méndez", role: "CTO", bio: "Scaling systems. Questioning defaults." },
    { name: "Sofía Ruiz", role: "AI ENGINEER", bio: "Teaching LLMs to think differently." },
    { name: "Javier López", role: "FULLSTACK DEV", bio: "Full-stack experiments, daily." },
    { name: "Elena Martínez", role: "PRODUCT DESIGNER", bio: "Designing for humans, testing with AI." },
    { name: "Ricardo S.", role: "BACKEND DEV", bio: "Distributed systems, concentrated curiosity." },
    { name: "Gabriela P.", role: "DATA SCIENTIST", bio: "Finding patterns others miss." },
  ],
  ambassador: {
    name: "Walter Morales",
    role: "Founder",
    bio: "Started AI Labs SV because he had questions about what AI could do — and couldn't find anyone in El Salvador asking them. Now 500+ builders across the region are exploring together.",
    image: "/images/walter-morales.webp",
    sectionTitle: "THE STORY",
    cta: "wmorales.dev →",
    purposeFraming: "Want to build something with us?",
    purposeItems: [
      "Partnerships that create learning opportunities",
      "Speaking invitations that spark discussions",
      "Connections with curious builders",
    ],
    socials: {
      twitter: "https://twitter.com/wmoralesdev",
      linkedin: "https://linkedin.com/in/wmoralesdev",
      github: "https://github.com/wmoralesdev",
      website: "https://wmorales.dev",
    },
  },
  stats: {
    members: "500+",
    membersBadge: "+12%",
    eventsHeld: "12",
    projectsShipped: "20+",
    partners: "8",
  },
  lab: {
    label: "THE LAB",
    heading: "Where questions become projects",
    cards: [
      { title: "Hackathons", description: "48 hours to answer one question: what can we build?" },
      { title: "Workshops", description: "Hands-on sessions with the tools worth learning right now." },
      { title: "Demo Days", description: "Monthly showcases. No slides. Just real experiments." },
    ],
  },
  why: {
    badge: "WHY",
    heading: "We believe the best way to understand AI is to ask your own questions.",
    subtext: "Not follow a curriculum. Not watch a tutorial. Ask a question, build something to answer it, and share what you learn. That's what we do here — and we think Latin America should have more of it.",
  },
  learningPreview: {
    badge: "FROM THE LAB",
    heading: "What we're learning",
    cards: [
      { title: "Building with AI agents", description: "How we went from LLM prototypes to agents that actually work in production.", date: "February 2026" },
      { title: "Cursor + v0: the curious builder's stack", description: "Why these tools changed how we prototype — and what we learned along the way.", date: "January 2026" },
      { title: "The questions nobody asks", description: "Three experiments that failed, and why they matter more than the ones that worked.", date: "December 2025" },
    ],
  },
  ecosystem: {
    label: "PARTNERS",
    heading: "Learning partners",
    ctaLabel: "Curious about partnering?",
    partners: [
      { name: "Cursor", url: "https://cursor.com" },
      { name: "Vercel", url: "https://vercel.com" },
      { name: "Supabase", url: "https://supabase.com" },
      { name: "Convex", url: "https://convex.dev" },
      { name: "v0", url: "https://v0.dev" },
    ],
  },
  eventsGallery: {
    badge: "GALLERY",
    title: "Event Gallery",
  },
  joinCta: {
    badge: "JOIN",
    heading: "Got questions? Good.",
    subtext: "Join 500+ builders exploring what's possible with AI.",
    cta: "Join AI Labs",
    finePrint: "Free. No gatekeeping. Just curious people.",
  },
  testimonials: [
    {
      quote: "I came to learn a tool. I left asking better questions about how I build.",
      author: "Andrea Gómez",
      role: "Senior Frontend Dev",
    },
    {
      quote: "The best part isn't the AI. It's being around people who actually want to figure things out.",
      author: "Carlos Méndez",
      role: "CTO @ TechSV",
    },
  ],
  events: {
    badge: "WHAT'S ON",
    sectionTitle: "Events",
    tagline: "Workshops, hackathons, and meetups for curious builders.",
    upcomingTitle: "Upcoming Events",
    pastTitle: "Event Gallery",
    noUpcoming: "New dates coming soon.",
    rsvpButton: "RSVP Now",
    recapButton: "View Recap",
    upcoming: [
      {
        id: "next-meetup",
        title: "AI Labs & Coffee: AI Workflow Deep Dive",
        date: "Saturday, March 15th, 10:00 AM",
        location: "Impact Hub San Salvador",
        description: "Bring your laptop and your questions. We'll figure out the rest together.",
        rsvpLink: "https://chat.whatsapp.com/PLACEHOLDER",
        type: "Workshop",
        tags: ["AI", "Workflow", "Networking"],
      },
      {
        id: "hackathon-agents",
        title: "Hackathon: Build with Agents",
        date: "Saturday, April 12th, 9:00 AM",
        location: "Tech Loft",
        description: "One question, 48 hours, and whatever you can build to answer it.",
        rsvpLink: "https://chat.whatsapp.com/PLACEHOLDER",
        type: "Hackathon",
        tags: ["Hackathon", "Agents", "Code"],
      },
      {
        id: "social-night",
        title: "Social Night: Devs & Drinks",
        date: "Friday, April 25th, 7:00 PM",
        location: "Cervecería La 20",
        description: "No agenda. Just conversations with people building interesting things.",
        rsvpLink: "https://chat.whatsapp.com/PLACEHOLDER",
        type: "Social",
        tags: ["Networking", "Community", "Fun"],
      },
    ],
    past: [
      {
        id: "launch-party",
        title: "AI Labs Launch Party",
        date: "February 2026",
        image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop",
        span: "col-span-2",
      },
      {
        id: "ai-talk",
        title: "Talk: The Future of Code",
        date: "January 2026",
        image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=2072&auto=format&fit=crop",
        span: "row-span-2",
      },
      {
        id: "networking-night",
        title: "Networking Night",
        date: "December 2025",
        image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2070&auto=format&fit=crop",
      },
      {
        id: "workshop-1",
        title: "First Workshop",
        date: "November 2025",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
      },
      {
        id: "panel-ai",
        title: "Panel: AI in Production",
        date: "October 2025",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format&fit=crop",
        span: "col-span-2",
      },
      {
        id: "ama-session",
        title: "AI Labs AMA",
        date: "September 2025",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop",
      },
    ],
  },
  partner: {
    title: "Curious about partnering?",
    description: "We're looking for spaces, speakers, and sponsors who believe in learning by doing.",
    cta: "Partner With Us",
    email: "hello@ailabs.sv",
    ctaSecondary: "View Opportunities",
  },
  sponsorKit: {
    title: "Sponsorship Kit",
    subtitle: "Reach the builders who ask the hard questions.",
    valueProp: [
      "Direct access to top-tier tech talent.",
      "Brand positioning at exclusive events.",
      "Opportunity to showcase your products or services.",
    ],
    audienceTitle: "Why Sponsor?",
    audienceDescription: "Our community consists of early adopters, tech leads, and founders shaping the future of software in the region.",
    packagesTitle: "Sponsorship Packages",
    packages: [
      {
        name: "Community Partner",
        features: ["Logo on website", "Social media mention", "Swag space at events"],
      },
      {
        name: "Event Sponsor",
        features: ["All of the above", "5-minute pitch at event", "Featured logo on banners"],
      },
      {
        name: "Ecosystem Lead",
        features: ["Annual sponsorship", "Dedicated workshop", "Talent pool access (opt-in)"],
      },
    ],
    contactTitle: "Let's make history together",
    contactDescription: "Contact us to customize a package that fits your goals.",
    contactCta: "Request Information",
  },
  midPageCta: {
    badge: "JOIN",
    sectionTitle: "Ready to start asking questions?",
    prompt: "Join the community of builders exploring what's possible with AI.",
    linkText: "Join the WhatsApp group",
  },
  ui: {
    nav: {
      overview: "Overview",
      community: "Community",
      events: "Events",
      partners: "Partners",
      blog: "Blog",
      join: "Explore the Lab",
    },
    footer: {
      organization: "Explore",
      resources: "Resources",
      stayUpdated: "Stay updated",
      newsletterText: "Get the latest from the lab — events, experiments, and questions worth asking.",
      emailPlaceholder: "email@example.com",
      subscribe: "Subscribe",
      madeWith: "Made with",
      inSanSalvador: "in San Salvador.",
      overview: "Overview",
      community: "Community",
      events: "Events",
      contact: "Contact",
      whatsapp: "WhatsApp",
    },
    hero: { badgeLabel: "Open to the curious" },
    communityMembers: {
      badge: "THE CURIOUS ONES",
      title: "People who ask why",
      desc: "Builders, designers, and leaders who learn by doing and share what they find.",
    },
    stats: {
      badge: "IMPACT",
      sectionTitle: "Ecosystem Impact",
      sectionDesc: "Community growth in numbers, contributions, and moments created.",
      members: "Active members",
      membersDetail: "CURIOUS BUILDERS",
      events: "Events hosted",
      eventsDetail: "EVENTS HOSTED",
      projectsShipped: "Projects",
      projectsShippedDetail: "EXPERIMENTS LAUNCHED",
      partners: "Partners",
      partnersDetail: "LEARNING PARTNERS",
    },
    testimonials: { badge: "VOICES", title: "What members say" },
    highlights: { badge: "Highlights", whySponsor: "Why sponsor" },
    ambassador: { github: "GitHub", x: "X", photoPlaceholder: "Ambassador Photo" },
    a11y: {
      search: "Search",
      switchToEnglish: "Switch to English",
      switchToSpanish: "Switch to Spanish",
      selectTheme: "Select theme",
      themeLight: "Light",
      themeDark: "Dark",
      themeSystem: "System",
    },
  },
};

export const content = {
  es: contentEs,
  en: contentEn,
};

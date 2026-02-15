import testimonialsEs from "./testimonials.es.json";
import testimonialsEn from "./testimonials.en.json";

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
    name: string;
    title: string;
    testimonial: string;
    avatar?: string;
    twitter?: string;
    linkedin?: string;
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
  partnersPage: {
    hero: {
      badge: string;
      headlineLine1: string;
      headlineLine2: string;
      subheadline: string;
      primaryCta: string;
      secondaryCta: string;
      note: string;
    };
    whatMeans: {
      eyebrow: string;
      title: string;
      body1: string;
      body2: string;
      principles: Array<string>;
    };
    pastPartners: {
      eyebrow: string;
      title: string;
      body: string;
    };
    waysToHelp: {
      eyebrow: string;
      title: string;
      intro: string;
      cards: Array<{ title: string; description: string }>;
    };
    howItWorks: {
      eyebrow: string;
      title: string;
      steps: Array<string>;
    };
    faq: {
      eyebrow: string;
      title: string;
      items: Array<{ q: string; a: string }>;
    };
    finalCta: {
      badge: string;
      title: string;
      body: string;
      cta: string;
    };
  };
  terms: {
    title: string;
    lastUpdated: string;
    sections: Array<{ heading: string; body: string }>;
  };
  feed: {
    wipLabel: string;
    wipDescription: string;
  };
  resources: {
    wipLabel: string;
    wipDescription: string;
  };
  blog: {
    wipLabel: string;
    wipDescription: string;
  };
  wip: {
    comingSoon: string;
    underConstruction: string;
  };
  midPageCta: {
    badge: string;
    sectionTitle: string;
    prompt: string;
    linkText: string;
  };
  onboarding: {
    welcome: {
      headline: string;
      headlineAccent: string;
      subheadline: string;
      cta: string;
    };
    about: {
      headline: string;
      subheadline: string;
      nameLabel: string;
      namePlaceholder: string;
      slugLabel: string;
      slugDescription: string;
      slugPlaceholder: string;
      avatarLabel: string;
      avatarUploadCta: string;
      avatarUploading: string;
      locationLabel: string;
      locationPlaceholder: string;
      nameRequired: string;
      slugRequired: string;
    };
    work: {
      headline: string;
      subheadline: string;
      roleLabel: string;
      rolePlaceholder: string;
      roleOptions: { value: string; label: string }[];
      titleLabel: string;
      titlePlaceholder: string;
      companyLabel: string;
      companyPlaceholder: string;
      experienceLabel: string;
      experienceOptions: { value: string; label: string; description?: string }[];
      bioLabel: string;
      bioPlaceholder: string;
      titleRequired: string;
      bioRequired: string;
    };
    interests: {
      headline: string;
      subheadline: string;
      interestsLabel: string;
      interestsRequired: string;
      toolsLabel: string;
      lookingForLabel: string;
      availabilityLabel: string;
      interests: string[];
      tools: string[];
      lookingFor: string[];
      availability: string[];
    };
    connect: {
      headline: string;
      subheadline: string;
      linkedinLabel: string;
      linkedinPlaceholder: string;
      xLabel: string;
      xPlaceholder: string;
      contactLabel: string;
      contactDescription: string;
      contactPlaceholder: string;
    };
    done: {
      headline: string;
      subheadline: string;
      viewProfile: string;
      goHome: string;
    };
    nav: {
      back: string;
      continue: string;
      finish: string;
    };
  };
  signIn: {
    title: string;
    subtitle: string;
    emailDescription: string;
    emailLabel: string;
    emailPlaceholder: string;
    emailRequired: string;
    emailInvalid: string;
    sendCode: string;
    sending: string;
    orContinueWith: string;
    google: string;
    github: string;
    checkEmailTitle: string;
    checkEmailDescription: string;
    codeLength: string;
    continue: string;
    verifying: string;
    cancel: string;
    oauthError: string;
    authMethodUnavailable: string;
    sendCodeError: string;
    signInIncomplete: string;
    invalidCodeError: string;
  };
  ui: {
    nav: {
      overview: string;
      community: string;
      events: string;
      partners: string;
      blog: string;
      join: string;
      account: string;
    };
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
      feed: string;
      terms: string;
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
    backToHome: string;
  };
}

const contentEs: SiteContent = {
  site: {
    name: "ailabs.sv",
    pageTitle: "ailabs.sv - El hub de tech e IA de El Salvador",
    description: "Una comunidad de builders curiosos explorando lo posible con IA. Empezando en El Salvador.",
    location: "San Salvador, El Salvador",
    whatsappLink: "https://chat.whatsapp.com/Ga8mG1fqDM9C0ryxAw1eIj",
  },
  hero: {
    headlineLine1: "La curiosidad nos mueve.",
    headlineLine2: "La IA es como exploramos.",
    subheadline: "Una comunidad de builders en El Salvador que hace preguntas, experimenta y comparte lo que aprende.",
    primaryCta: "Explorar el Lab",
    secondaryCta: "Ver qué estamos explorando",
  },
  communityMembers: [
    { name: "Walter Morales", role: "EVENT LEAD", bio: "Construyendo ailabs.sv. Preguntando por qué no." },
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
    bio: "Fundó ailabs.sv porque tenía preguntas sobre qué podía hacer la IA — y no encontraba a nadie en El Salvador haciéndolas. Ahora más de 500 builders de la región exploran juntos.",
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
    cta: "Unirse a ailabs.sv",
    finePrint: "Gratis. Sin gatekeeping. Solo gente curiosa.",
  },
  testimonials: testimonialsEs as SiteContent["testimonials"],
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
        title: "ailabs.sv & Coffee: AI Workflow Deep Dive",
        date: "Sábado 15 de marzo, 10:00 AM",
        location: "Impact Hub San Salvador",
        description: "Trae tu laptop y tus preguntas. Lo demás lo resolvemos juntos.",
        rsvpLink: "https://chat.whatsapp.com/Ga8mG1fqDM9C0ryxAw1eIj",
        type: "Workshop",
        tags: ["AI", "Workflow", "Networking"],
      },
      {
        id: "hackathon-agents",
        title: "Hackathon: Build with Agents",
        date: "Sábado 12 de abril, 9:00 AM",
        location: "Tech Loft",
        description: "Una pregunta, 48 horas, y lo que puedas construir para responderla.",
        rsvpLink: "https://chat.whatsapp.com/Ga8mG1fqDM9C0ryxAw1eIj",
        type: "Hackathon",
        tags: ["Hackathon", "Agents", "Code"],
      },
      {
        id: "social-night",
        title: "Social Night: Devs & Drinks",
        date: "Viernes 25 de abril, 7:00 PM",
        location: "Cervecería La 20",
        description: "Sin agenda. Solo conversaciones con gente construyendo cosas interesantes.",
        rsvpLink: "https://chat.whatsapp.com/Ga8mG1fqDM9C0ryxAw1eIj",
        type: "Social",
        tags: ["Networking", "Community", "Fun"],
      },
    ],
    past: [
      {
        id: "launch-party",
        title: "ailabs.sv Launch Party",
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
        title: "ailabs.sv AMA",
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
  partnersPage: {
    hero: {
      badge: "PARTNERS",
      headlineLine1: "Construyamos ",
      headlineLine2: "juntos.",
      subheadline: "Somos una comunidad de builders explorando IA en El Salvador. Si quieres aportar herramientas, espacio o visibilidad a experimentos reales, hablemos.",
      primaryCta: "Hablar de una alianza",
      secondaryCta: "Ver cómo ayudar",
      note: "Sin paquetes. Sin niveles. Solo colaboración honesta.",
    },
    whatMeans: {
      eyebrow: "QUÉ SIGNIFICA",
      title: "Cómo trabajamos con partners",
      body1: "Somos builders. Tú respaldas experimentos, no presentaciones.",
      body2: "Construimos en público, damos crédito a quienes ayudaron, y seguimos con la siguiente pregunta.",
      principles: ["Construir experimentos juntos.", "Abierto por defecto.", "Sin gatekeeping. Sin política."],
    },
    pastPartners: {
      eyebrow: "QUIENES HAN AYUDADO",
      title: "Quiénes respaldan a los builders",
      body: "Estos equipos e individuos pusieron recursos detrás de experimentos. Se presentaron cuando importaba.",
    },
    waysToHelp: {
      eyebrow: "FORMAS DE AYUDAR",
      title: "Formas simples de ayudar",
      intro: "No necesitas un \"gran sponsorship\". A veces lo que cambia todo es una puerta abierta.",
      cards: [
        { title: "Espacio", description: "Presta un lugar para que los builders hackeen." },
        { title: "Acceso", description: "Abre una puerta — tu red, tus herramientas, tu plataforma." },
        { title: "Herramientas", description: "Créditos, licencias o acceso para que los builders puedan romper cosas." },
        { title: "Señal", description: "Amplifica experimentos en tu audiencia." },
        { title: "Tiempo", description: "Preséntate. Revisa proyectos. Haz preguntas incómodas." },
      ],
    },
    howItWorks: {
      eyebrow: "PROCESO",
      title: "Cómo colaboramos",
      steps: [
        "Nos cuentas qué puedes aportar. Te contamos qué estamos construyendo.",
        "Acordamos un formato: evento, herramientas, acceso, o algo nuevo.",
        "Construimos. Tú recibes crédito. Todos ven lo que pasó.",
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Preguntas frecuentes",
      items: [
        {
          q: "¿Qué recibe un partner?",
          a: "Tu nombre en lo que construimos juntos. Exposición a 500+ builders que construyen. Sin métricas infladas — solo trabajo real.",
        },
        {
          q: "¿Tienen precios o paquetes?",
          a: "No. Preferimos acuerdos simples: qué aportas, qué sucede, y cómo lo contamos.",
        },
        {
          q: "¿Pueden ser partners comunidades o personas?",
          a: "Sí. Si puedes abrir una puerta, compartir una herramienta o prestar tiempo — encajas.",
        },
      ],
    },
    finalCta: {
      badge: "ÚNETE",
      title: "¿Tienes algo que aportar?",
      body: "Un correo. Qué aportas. Qué te interesa. Nosotros arreglamos el resto.",
      cta: "Contactar",
    },
  },
  terms: {
    title: "Términos y condiciones",
    lastUpdated: "Última actualización: febrero 2026",
    sections: [
      {
        heading: "Uso del sitio",
        body: "ailabs.sv es una comunidad de builders en El Salvador. Al usar este sitio aceptas participar de forma respetuosa. No permitimos spam, acoso ni contenido que viole la privacidad de terceros.",
      },
      {
        heading: "Eventos y actividades",
        body: "Los eventos y workshops organizados por ailabs.sv pueden tener reglas propias. La asistencia implica aceptar esas reglas y el código de conducta del evento.",
      },
      {
        heading: "Contenido y responsabilidad",
        body: "El contenido publicado por miembros es responsabilidad de quienes lo publican. ailabs.sv no se hace responsable del contenido generado por la comunidad, aunque nos reservamos el derecho de retirar contenido que considere inapropiado.",
      },
      {
        heading: "Contacto",
        body: "Para preguntas sobre estos términos: hello@ailabs.sv.",
      },
    ],
  },
  feed: {
    wipLabel: "En construcción",
    wipDescription: "El feed estará disponible pronto.",
  },
  resources: {
    wipLabel: "En construcción",
    wipDescription: "Los recursos estarán disponibles pronto.",
  },
  blog: {
    wipLabel: "En construcción",
    wipDescription: "El blog estará disponible pronto.",
  },
  wip: {
    comingSoon: "Próximamente",
    underConstruction: "En construcción",
  },
  midPageCta: {
    badge: "ÚNETE",
    sectionTitle: "¿Listo para hacer preguntas?",
    prompt: "Únete a la comunidad de builders que exploran lo posible con IA.",
    linkText: "Unirse al grupo de WhatsApp",
  },
  onboarding: {
    welcome: {
      headline: "¡Hola! Soy Walter.",
      headlineAccent: "Walter",
      subheadline: "Bienvenido a ailabs.sv — una comunidad de builders explorando lo posible con IA. En unos pasos tendrás tu perfil listo para conectar con otros curiosos.",
      cta: "Empezar",
    },
    about: {
      headline: "Cuéntanos un poco de ti",
      subheadline: "Así la comunidad podrá encontrarte.",
      nameLabel: "Nombre",
      namePlaceholder: "Tu nombre",
      slugLabel: "Slug del perfil",
      slugDescription: "Tu URL será: /community/tu-slug",
      slugPlaceholder: "jane-doe",
      avatarLabel: "Foto de perfil",
      avatarUploadCta: "Subir foto",
      avatarUploading: "Subiendo…",
      locationLabel: "Ubicación",
      locationPlaceholder: "San Salvador, El Salvador",
      nameRequired: "El nombre es requerido",
      slugRequired: "El slug es requerido",
    },
    work: {
      headline: "¿Qué te trae por aquí?",
      subheadline: "Todos estamos aprendiendo — cuéntanos dónde estás.",
      roleLabel: "Rol principal",
      rolePlaceholder: "Selecciona tu rol…",
      roleOptions: [
        { value: "student", label: "Estudiante" },
        { value: "developer", label: "Developer" },
        { value: "designer", label: "Diseñador" },
        { value: "product", label: "Product Manager" },
        { value: "founder", label: "Fundador / Emprendedor" },
        { value: "research", label: "Investigador" },
        { value: "other", label: "Otro (escríbelo)" },
      ],
      titleLabel: "Título o rol específico",
      titlePlaceholder: "Ej: Senior Developer, Estudiante de CS, etc.",
      companyLabel: "Empresa o escuela (opcional)",
      companyPlaceholder: "Universidad, Tech Co…",
      experienceLabel: "Tu recorrido con IA",
      experienceOptions: [
        { value: "exploring", label: "Explorando", description: "Recién empezando con herramientas de IA" },
        { value: "building", label: "Construyendo", description: "Usando IA en proyectos y experimentos" },
        { value: "shipping", label: "Desplegando", description: "Lanzando soluciones con IA" },
      ],
      bioLabel: "Bio breve",
      bioPlaceholder: "Cuéntanos sobre ti — qué te apasiona, qué exploras…",
      titleRequired: "El título es requerido",
      bioRequired: "La bio es requerida",
    },
    interests: {
      headline: "Tus intereses",
      subheadline: "¿Qué estás explorando? ¿Qué herramientas usas?",
      interestsLabel: "Temas de IA que te interesan",
      interestsRequired: "Selecciona al menos uno",
      toolsLabel: "Herramientas de IA que has explorado",
      lookingForLabel: "Qué buscas",
      availabilityLabel: "Disponibilidad",
      interests: [
        "Agentes y automatización",
        "RAG y bases de conocimiento",
        "Visión por computadora",
        "NLP y LLMs",
        "Voz y audio",
        "Generación de código",
        "Datos y analytics",
        "MLOps e infraestructura",
        "Producto y UX con IA",
      ],
      tools: [
        "ChatGPT",
        "Claude",
        "Cursor",
        "GitHub Copilot",
        "v0",
        "Midjourney",
        "Stable Diffusion",
        "DALL-E",
        "OpenAI API",
        "Anthropic API",
        "Gemini",
        "Perplexity",
        "LangChain",
        "Hugging Face",
        "Replit AI",
        "Vercel AI SDK",
      ],
      lookingFor: [
        "Compañeros de aprendizaje",
        "Colaboradores de proyectos",
        "Mentoría (como aprendiz)",
        "Mentoría (como mentor)",
        "Oportunidades laborales",
        "Co-fundadores",
        "Solo explorando",
      ],
      availability: [
        "Abierto a cafés",
        "Abierto a colaboraciones",
        "Disponible para hablar",
        "Abierto a mentoría",
      ],
    },
    connect: {
      headline: "Conectar",
      subheadline: "¿Cómo puede la gente contactarte? (El contacto solo es visible para miembros)",
      linkedinLabel: "LinkedIn",
      linkedinPlaceholder: "https://linkedin.com/in/…",
      xLabel: "X (Twitter)",
      xPlaceholder: "https://x.com/…",
      contactLabel: "Contacto",
      contactDescription: "Teléfono o email — solo visible para miembros",
      contactPlaceholder: "+503 1234 5678",
    },
    done: {
      headline: "¡Listo!",
      subheadline: "Bienvenido al lab. Tu perfil está listo.",
      viewProfile: "Ver mi perfil",
      goHome: "Ir al inicio",
    },
    nav: {
      back: "Atrás",
      continue: "Continuar",
      finish: "Finalizar",
    },
  },
  signIn: {
    title: "Iniciar sesión",
    subtitle: "Inicia sesión para editar tu perfil de comunidad",
    emailDescription: "Te enviaremos un código de un solo uso para iniciar sesión.",
    emailLabel: "Correo electrónico",
    emailPlaceholder: "tu@ejemplo.com",
    emailRequired: "El correo electrónico es requerido",
    emailInvalid: "Correo electrónico inválido",
    sendCode: "Enviar código",
    sending: "Enviando…",
    orContinueWith: "O continúa con",
    google: "Google",
    github: "GitHub",
    checkEmailTitle: "Revisa tu correo",
    checkEmailDescription: "Ingresa el código que enviamos a",
    codeLength: "El código debe tener 6 dígitos",
    continue: "Continuar",
    verifying: "Verificando…",
    cancel: "Cancelar",
    oauthError: "No pudimos iniciar sesión. Intenta de nuevo.",
    authMethodUnavailable: "Este método de autenticación no está disponible.",
    sendCodeError: "No pudimos enviar el código. Intenta de nuevo.",
    signInIncomplete: "No se pudo completar el inicio de sesión.",
    invalidCodeError: "Código inválido. Intenta de nuevo.",
  },
  ui: {
    nav: {
      overview: "Inicio",
      community: "Comunidad",
      events: "Eventos",
      partners: "Partners",
      blog: "Blog",
      join: "Explorar el Lab",
      account: "Mi cuenta",
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
      feed: "Feed",
      terms: "Términos",
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
    backToHome: "Volver al inicio",
  },
};

const contentEn: SiteContent = {
  site: {
    name: "ailabs.sv",
    pageTitle: "ailabs.sv - El Salvador's Tech and AI Community Hub",
    description: "A community of curious builders exploring what's possible with AI. Starting in El Salvador.",
    location: "San Salvador, El Salvador",
    whatsappLink: "https://chat.whatsapp.com/Ga8mG1fqDM9C0ryxAw1eIj",
  },
  hero: {
    headlineLine1: "Curiosity is what drives us.",
    headlineLine2: "AI is how we explore.",
    subheadline: "A community of builders in El Salvador who ask questions, run experiments, and share what they learn.",
    primaryCta: "Explore the Lab",
    secondaryCta: "See what we're exploring",
  },
  communityMembers: [
    { name: "Walter Morales", role: "EVENT LEAD", bio: "Building ailabs.sv. Asking why not." },
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
    bio: "Started ailabs.sv because he had questions about what AI could do — and couldn't find anyone in El Salvador asking them. Now 500+ builders across the region are exploring together.",
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
    cta: "Join ailabs.sv",
    finePrint: "Free. No gatekeeping. Just curious people.",
  },
  testimonials: testimonialsEn as SiteContent["testimonials"],
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
        title: "ailabs.sv & Coffee: AI Workflow Deep Dive",
        date: "Saturday, March 15th, 10:00 AM",
        location: "Impact Hub San Salvador",
        description: "Bring your laptop and your questions. We'll figure out the rest together.",
        rsvpLink: "https://chat.whatsapp.com/Ga8mG1fqDM9C0ryxAw1eIj",
        type: "Workshop",
        tags: ["AI", "Workflow", "Networking"],
      },
      {
        id: "hackathon-agents",
        title: "Hackathon: Build with Agents",
        date: "Saturday, April 12th, 9:00 AM",
        location: "Tech Loft",
        description: "One question, 48 hours, and whatever you can build to answer it.",
        rsvpLink: "https://chat.whatsapp.com/Ga8mG1fqDM9C0ryxAw1eIj",
        type: "Hackathon",
        tags: ["Hackathon", "Agents", "Code"],
      },
      {
        id: "social-night",
        title: "Social Night: Devs & Drinks",
        date: "Friday, April 25th, 7:00 PM",
        location: "Cervecería La 20",
        description: "No agenda. Just conversations with people building interesting things.",
        rsvpLink: "https://chat.whatsapp.com/Ga8mG1fqDM9C0ryxAw1eIj",
        type: "Social",
        tags: ["Networking", "Community", "Fun"],
      },
    ],
    past: [
      {
        id: "launch-party",
        title: "ailabs.sv Launch Party",
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
        title: "ailabs.sv AMA",
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
  partnersPage: {
    hero: {
      badge: "PARTNERS",
      headlineLine1: "Build with ",
      headlineLine2: "us.",
      subheadline: "We're a community of builders exploring AI in El Salvador. If you want to put tools, space, or visibility behind real experiments, let's talk.",
      primaryCta: "Talk partnership",
      secondaryCta: "See ways to help",
      note: "No packages. No tiers. Just honest collaboration.",
    },
    whatMeans: {
      eyebrow: "WHAT IT MEANS",
      title: "How we work with partners",
      body1: "We're builders. You back experiments, not presentations.",
      body2: "We ship in public, credit who helped, and move on to the next question.",
      principles: ["Ship experiments together.", "Open by default.", "No gatekeeping. No politics."],
    },
    pastPartners: {
      eyebrow: "WHO HAS HELPED",
      title: "Who's backed the builders",
      body: "These teams and individuals put resources behind experiments. They showed up when it mattered.",
    },
    waysToHelp: {
      eyebrow: "WAYS TO HELP",
      title: "Simple ways to help",
      intro: "You don't need a big sponsorship. Sometimes an open door is the whole difference.",
      cards: [
        { title: "Space", description: "Lend a room for builders to hack." },
        { title: "Access", description: "Open a door — your network, your tools, your platform." },
        { title: "Tools", description: "Credits, licenses, or early access so builders can break things." },
        { title: "Signal", description: "Amplify experiments to your audience." },
        { title: "Time", description: "Show up. Review projects. Ask hard questions." },
      ],
    },
    howItWorks: {
      eyebrow: "PROCESS",
      title: "How we collaborate",
      steps: [
        "You tell us what you can bring. We tell you what we're building next.",
        "We agree on a format: event, tools, access, or something new.",
        "We ship. You get credit. Everyone sees what happened.",
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Frequently asked questions",
      items: [
        {
          q: "What do partners get?",
          a: "Your name on what we build together. Exposure to 500+ builders who ship. No fluff metrics — just real work.",
        },
        {
          q: "Do you have prices or packages?",
          a: "No. We prefer simple agreements: what you bring, what happens, and how we tell the story.",
        },
        {
          q: "Can individuals or communities be partners?",
          a: "Yes. If you can open a door, share a tool, or lend time — you're in.",
        },
      ],
    },
    finalCta: {
      badge: "JOIN",
      title: "Got something to offer?",
      body: "One email. What you bring. What interests you. We'll figure out the rest.",
      cta: "Reach out",
    },
  },
  terms: {
    title: "Terms and conditions",
    lastUpdated: "Last updated: February 2026",
    sections: [
      {
        heading: "Use of the site",
        body: "ailabs.sv is a community of builders in El Salvador. By using this site you agree to participate respectfully. We do not allow spam, harassment, or content that violates the privacy of others.",
      },
      {
        heading: "Events and activities",
        body: "Events and workshops organized by ailabs.sv may have their own rules. Attending implies acceptance of those rules and the event's code of conduct.",
      },
      {
        heading: "Content and responsibility",
        body: "Content published by members is the responsibility of those who publish it. ailabs.sv is not responsible for content generated by the community, although we reserve the right to remove content we consider inappropriate.",
      },
      {
        heading: "Contact",
        body: "For questions about these terms: hello@ailabs.sv.",
      },
    ],
  },
  feed: {
    wipLabel: "Work in progress",
    wipDescription: "The feed will be available soon.",
  },
  resources: {
    wipLabel: "Work in progress",
    wipDescription: "Resources will be available soon.",
  },
  blog: {
    wipLabel: "Coming soon",
    wipDescription: "The blog will be available soon.",
  },
  wip: {
    comingSoon: "Coming soon",
    underConstruction: "Under construction",
  },
  midPageCta: {
    badge: "JOIN",
    sectionTitle: "Ready to start asking questions?",
    prompt: "Join the community of builders exploring what's possible with AI.",
    linkText: "Join the WhatsApp group",
  },
  onboarding: {
    welcome: {
      headline: "Hey! I'm Walter.",
      headlineAccent: "Walter",
      subheadline: "Welcome to ailabs.sv — a community of builders exploring what's possible with AI. In a few steps you'll have your profile ready to connect with other curious people.",
      cta: "Get started",
    },
    about: {
      headline: "Let's get to know you",
      subheadline: "So the community can find you.",
      nameLabel: "Name",
      namePlaceholder: "Your name",
      slugLabel: "Profile slug",
      slugDescription: "Your URL will be: /community/your-slug",
      slugPlaceholder: "jane-doe",
      avatarLabel: "Profile photo",
      avatarUploadCta: "Upload photo",
      avatarUploading: "Uploading…",
      locationLabel: "Location",
      locationPlaceholder: "San Salvador, El Salvador",
      nameRequired: "Name is required",
      slugRequired: "Slug is required",
    },
    work: {
      headline: "What brings you here?",
      subheadline: "We're all learning — tell us where you're at.",
      roleLabel: "Primary role",
      rolePlaceholder: "Select your role…",
      roleOptions: [
        { value: "student", label: "Student" },
        { value: "developer", label: "Developer" },
        { value: "designer", label: "Designer" },
        { value: "product", label: "Product Manager" },
        { value: "founder", label: "Founder / Entrepreneur" },
        { value: "research", label: "Researcher" },
        { value: "other", label: "Other (type it)" },
      ],
      titleLabel: "Specific title or role",
      titlePlaceholder: "Ex: Senior Developer, CS Student, etc.",
      companyLabel: "Company or school (optional)",
      companyPlaceholder: "University, Tech Co…",
      experienceLabel: "Your AI journey",
      experienceOptions: [
        { value: "exploring", label: "Exploring", description: "Just getting started with AI tools" },
        { value: "building", label: "Building", description: "Using AI in projects and experiments" },
        { value: "shipping", label: "Shipping", description: "Deploying AI-powered solutions" },
      ],
      bioLabel: "Short bio",
      bioPlaceholder: "Tell us about yourself — what you're passionate about, what you're exploring…",
      titleRequired: "Title is required",
      bioRequired: "Bio is required",
    },
    interests: {
      headline: "Your interests",
      subheadline: "What are you exploring? What tools do you use?",
      interestsLabel: "AI topics that interest you",
      interestsRequired: "Select at least one",
      toolsLabel: "AI tools you've explored",
      lookingForLabel: "What you're looking for",
      availabilityLabel: "Availability",
      interests: [
        "Agents & Automation",
        "RAG & Knowledge Bases",
        "Computer Vision",
        "NLP & LLMs",
        "Voice & Audio",
        "Code Generation",
        "Data & Analytics",
        "MLOps & Infrastructure",
        "Product & UX with AI",
      ],
      tools: [
        "ChatGPT",
        "Claude",
        "Cursor",
        "GitHub Copilot",
        "v0",
        "Midjourney",
        "Stable Diffusion",
        "DALL-E",
        "OpenAI API",
        "Anthropic API",
        "Gemini",
        "Perplexity",
        "LangChain",
        "Hugging Face",
        "Replit AI",
        "Vercel AI SDK",
      ],
      lookingFor: [
        "Learning buddies",
        "Project collaborators",
        "Mentorship (as mentee)",
        "Mentorship (as mentor)",
        "Job opportunities",
        "Co-founders",
        "Just exploring",
      ],
      availability: [
        "Open to coffee chats",
        "Open to collaborations",
        "Available for speaking",
        "Open to mentoring",
      ],
    },
    connect: {
      headline: "Connect",
      subheadline: "How can people reach you? (Contact is members-only)",
      linkedinLabel: "LinkedIn",
      linkedinPlaceholder: "https://linkedin.com/in/…",
      xLabel: "X (Twitter)",
      xPlaceholder: "https://x.com/…",
      contactLabel: "Contact",
      contactDescription: "Phone or email — only visible to members",
      contactPlaceholder: "+503 1234 5678",
    },
    done: {
      headline: "You're in!",
      subheadline: "Welcome to the lab. Your profile is ready.",
      viewProfile: "View my profile",
      goHome: "Go home",
    },
    nav: {
      back: "Back",
      continue: "Continue",
      finish: "Finish",
    },
  },
  signIn: {
    title: "Sign in",
    subtitle: "Sign in to edit your community profile",
    emailDescription: "We'll send you a one-time code to sign in.",
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    emailRequired: "Email is required",
    emailInvalid: "Invalid email",
    sendCode: "Send code",
    sending: "Sending…",
    orContinueWith: "Or continue with",
    google: "Google",
    github: "GitHub",
    checkEmailTitle: "Check your email",
    checkEmailDescription: "Enter the code we sent to",
    codeLength: "Code must be 6 digits",
    continue: "Continue",
    verifying: "Verifying…",
    cancel: "Cancel",
    oauthError: "We couldn't sign you in. Please try again.",
    authMethodUnavailable: "This authentication method is not available.",
    sendCodeError: "We couldn't send the code. Please try again.",
    signInIncomplete: "We couldn't complete sign in.",
    invalidCodeError: "Invalid code. Please try again.",
  },
  ui: {
    nav: {
      overview: "Overview",
      community: "Community",
      events: "Events",
      partners: "Partners",
      blog: "Blog",
      join: "Explore the Lab",
      account: "My account",
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
      feed: "Feed",
      terms: "Terms",
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
    backToHome: "Back to home",
  },
};

export const content = {
  es: contentEs,
  en: contentEn,
};

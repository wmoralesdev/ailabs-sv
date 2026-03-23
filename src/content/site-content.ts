import testimonialsEs from "./testimonials.es.json";
import testimonialsEn from "./testimonials.en.json";

export type Language = "es" | "en";

/** One bento cell: image copy + optional event badge (slots 1–7 map to grid order). Omit eventName/attendees until copy is approved. */
export type CommunityProofSlot = {
  imageAlt: string;
  eventName?: string;
  attendees?: number;
};

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
    headlinePhrases: Array<string>;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
  };
  founders: {
    sectionTitle: string;
    sectionHeadline: string;
    bio: string;
    purposeFraming: string;
    purposeItems: Array<string>;
    people: Array<{
      name: string;
      role: string;
      image: string;
      cta: string;
      socials: {
        twitter?: string;
        linkedin?: string;
        github?: string;
        website?: string;
      };
    }>;
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
    empty: string;
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
  communityProof: {
    eyebrow: string;
    title: string;
    slots: readonly [
      CommunityProofSlot,
      CommunityProofSlot,
      CommunityProofSlot,
      CommunityProofSlot,
      CommunityProofSlot,
      CommunityProofSlot,
      CommunityProofSlot,
    ];
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
    noPast: string;
    rsvpButton: string;
    recapButton: string;
    albumButton: string;
    virtualLabel: string;
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
      headlinePhrases: Array<string>;
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
    title: string;
    heroBadge?: string;
    heroSubtitle?: string;
    filterAll: string;
    filterPosts: string;
    filterRepos: string;
    filterSkills: string;
    filterPrompts: string;
    filterBlog: string;
    composerPlaceholder: string;
    postButton: string;
    joinToShare: string;
    joinCta: string;
    loadMore: string;
    empty: string;
    sortNewest?: string;
    sortOldest?: string;
    sortNewestFirst?: string;
    sortOldestFirst?: string;
    searchPlaceholder?: string;
  };
  showcaseSubmit: {
    heroBadge: string;
    heroTitleSubmit: string;
    heroTitleEdit: string;
    heroSubtitle: string;
    sectionBasics: string;
    sectionStory: string;
    sectionCover: string;
    sectionLinks: string;
    sectionDetails: string;
    sectionTools: string;
    descriptionMdHint: string;
    addOtherTool: string;
    addOtherToolTitle: string;
    addOtherToolPlaceholder: string;
    addOtherToolConfirm: string;
    addOtherToolCancel: string;
    addOtherToolEmpty: string;
    addOtherToolDuplicate: string;
    addOtherToolMax: string;
    addOtherToolTooLong: string;
    titleSubmit: string;
    titleEdit: string;
    titleLabel: string;
    titlePlaceholder: string;
    titleRequired: string;
    urlPreviewLabel: string;
    urlPreviewTakenSuffix: string;
    taglineLabel: string;
    taglinePlaceholder: string;
    taglineRequired: string;
    descriptionLabel: string;
    descriptionRequired: string;
    coverLabel: string;
    coverUploadCta: string;
    coverUploading: string;
    coverDragDropHint: string;
    coverFileSizeHint: string;
    coverRequired: string;
    coverErrorMaxSize: string;
    coverErrorFileType: string;
    coverErrorUploadFailed: string;
    projectUrlLabel: string;
    projectUrlPlaceholder: string;
    invalidUrl: string;
    repoUrlLabel: string;
    repoUrlPlaceholder: string;
    socialPostUrlLabel: string;
    socialPostUrlDescription: string;
    socialPostUrlPlaceholder: string;
    eventLabel: string;
    eventPlaceholder: string;
    toolsUsedLabel: string;
    statusLabel: string;
    statusShipped: string;
    statusInProgress: string;
    statusConcept: string;
    submit: string;
    saveChanges: string;
    saving: string;
    cancel: string;
  };
  showcasePage: {
    hero: {
      badge: string;
      headlineLine1: string;
      headlinePhrases: Array<string>;
      subheadline: string;
      primaryCta: string;
      secondaryCta: string;
    };
  };
  showcaseList: {
    emptyTitle: string;
    emptyBody: string;
    emptySubmitCta: string;
    emptyPartnersCta: string;
    featured: string;
    allProjects: string;
    filterStatusLabel: string;
    filterToolsLabel: string;
    filterEventLabel: string;
    statusShipped: string;
    statusInProgress: string;
    statusConcept: string;
  };
  showcaseDetail: {
    deleteProject: string;
    deleteDialogTitle: string;
    deleteDialogDescription: string;
    deleteTypeTitleLabel: string;
    deleteConfirm: string;
    deleteCancel: string;
    deleting: string;
  };
  resources: {
    wipLabel: string;
    wipDescription: string;
    tabPosts: string;
    tabRepos: string;
    tabSkills: string;
    tabPrompts: string;
    tabBlog: string;
    addResource: string;
    titleLabel: string;
    titlePlaceholder: string;
    bodyLabel: string;
    bodyPlaceholder: string;
    urlLabel: string;
    urlLabelRepo?: string;
    urlLabelSkill?: string;
    urlPlaceholder: string;
    tagsLabel: string;
    tagsDescription: string;
    tagsPlaceholder: string;
    languageLabel: string;
    languagePlaceholder: string;
    visibilityLabel: string;
    visibilityPublic: string;
    visibilityMembers: string;
    save: string;
    cancel: string;
    empty: string;
    typeRepo: string;
    typeSkill: string;
    typePrompt: string;
    typeBlog: string;
    rawContentLabel?: string;
    rawContentDescription?: string;
    skillHelperTitle?: string;
    skillHelperText?: string;
    skillHelperLink?: string;
    writeLabel?: string;
    previewLabel?: string;
    previewEmpty?: string;
    copy?: string;
    copied?: string;
    openWithCursor?: string;
    openWithClaude?: string;
    edit?: string;
    delete?: string;
    moreActions?: string;
    deleteConfirmTitle?: string;
    deleteConfirmDescription?: string;
    editPost?: string;
  };
  interactions: {
    like: string;
    comment: string;
    bookmark: string;
    reply: string;
    addComment: string;
    commentPlaceholder: string;
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
      welcomeHostLeadPrefix: string;
      welcomeHostLeadSuffix: string;
      subheadline: string;
      cta: string;
      edit?: {
        headline: string;
        subheadline: string;
        cta: string;
      };
    };
    about: {
      headline: string;
      subheadline: string;
      nameLabel: string;
      namePlaceholder: string;
      slugLabel: string;
      slugDescription: string;
      slugPlaceholder: string;
      handleAvailable: string;
      handleTaken: string;
      handleInvalid: string;
      avatarLabel: string;
      avatarUploadCta: string;
      avatarUploading: string;
      avatarDragDropHint: string;
      avatarFileSizeHint: string;
      locationLabel: string;
      locationPlaceholder: string;
      taglineLabel: string;
      taglinePlaceholder: string;
      taglineDescription: string;
      taglineRequired: string;
      nameRequired: string;
      slugRequired: string;
    };
    work: {
      headline: string;
      subheadline: string;
      roleLabel: string;
      rolePlaceholder: string;
      roleOptions: Array<{ value: string; label: string }>;
      titleLabel: string;
      titlePlaceholder: string;
      companyLabel: string;
      companyPlaceholder: string;
      experienceLabel: string;
      experiencePlaceholder: string;
      experienceOptions: Array<{ value: string; label: string; description?: string }>;
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
      interests: Array<{ id: string; label: string }>;
      tools: Array<{ id: string; label: string }>;
      lookingFor: Array<{ id: string; label: string }>;
      availability: Array<{ id: string; label: string }>;
    };
    interestsExplore?: {
      headline: string;
      subheadline: string;
      interestsLabel: string;
      interestsRequired: string;
      toolsLabel: string;
    };
    interestsConnect?: {
      headline: string;
      subheadline: string;
      lookingForLabel: string;
      availabilityLabel: string;
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
    header?: {
      newPost: string;
      submitProject: string;
      myProfile: string;
      signOut: string;
    };
    nav: {
      overview: string;
      community: string;
      events: string;
      partners: string;
      blog: string;
      feed: string;
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
      watermarkWords: Array<string>;
    };
    hero: { badgeLabel: string };
    communityMembers: { badge: string; title: string; desc: string; emptyState: string };
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
    founder: { github: string; x: string; photoPlaceholder: string };
    a11y: { search: string; switchToEnglish: string; switchToSpanish: string; selectTheme: string; themeLight: string; themeDark: string; themeSystem: string };
    backToHome: string;
  };
  profile?: {
    activity: string;
    achievements: string;
    achievementsEmpty: string;
    eventsAttended: string;
    projects: string;
    showcaseEmpty: string;
    showcaseEmptySubtext: string;
    member: string;
    contact: string;
    editProfile: string;
    about: string;
    experience: string;
    interests: string;
    tools: string;
    lookingFor: string;
    availability: string;
    experienceLabels: {
      beginner: string;
      intermediate: string;
      advanced: string;
      exploring: string;
      building: string;
      shipping: string;
    };
  };
}

const contentEs: SiteContent = {
  site: {
    name: "Ai /abs",
    pageTitle: "Ai /abs - El hub de tech e IA de El Salvador",
    description: "Una comunidad de builders curiosos explorando lo posible con IA. Empezando en El Salvador.",
    location: "San Salvador, El Salvador",
    whatsappLink: "https://chat.whatsapp.com/Ga8mG1fqDM9C0ryxAw1eIj",
  },
  hero: {
    headlineLine1: "La curiosidad nos mueve.",
    headlineLine2: "La IA es como exploramos.",
    headlinePhrases: [
      "La IA es como exploramos.",
      "La IA es nuestro catalizador.",
      "La IA es el principio.",
      "La IA es nuestro sandbox.",
      "La IA es lo que construimos."
    ],
    subheadline: "Una comunidad de builders en El Salvador que hace preguntas, experimenta y comparte lo que aprende.",
    primaryCta: "Explorar el Lab",
    secondaryCta: "Ver qué estamos explorando",
  },
  founders: {
    sectionTitle: "THE STORY",
    sectionHeadline: "Walter Morales y Daniela Huezo",
    bio: "Fundamos Ai /abs con una pregunta simple: ¿qué puede hacer la IA aquí, realmente? Nadie en El Salvador estaba preguntando — así que creamos el espacio para descubrirlo. Lo que empezó como curiosidad se convirtió en una comunidad de 500+ builders en la región, organizando workshops, hackathons y conversaciones reales sobre lo que es posible.",
    purposeFraming: "¿Querés construir algo con nosotros?",
    purposeItems: [
      "Alianzas que convierten ideas en experiencias de aprendizaje",
      "Invitaciones a hablar que van más allá de las slides",
      "Conexiones con builders que construyen, no solo hablan",
    ],
    people: [
      {
        name: "Walter Morales",
        role: "FUNDADOR",
        image: "/images/walter-morales.webp",
        cta: "wmorales.dev →",
        socials: {
          twitter: "https://twitter.com/wmoralesdev",
          linkedin: "https://linkedin.com/in/wmoralesdev",
          github: "https://github.com/wmoralesdev",
          website: "https://wmorales.dev",
        },
      },
      {
        name: "Daniela Huezo",
        role: "CO-FUNDADORA",
        image: "/images/daniela-huezo.webp",
        cta: "dhuezo.dev →",
        socials: {
          twitter: "https://x.com/irenehl26__",
          linkedin: "https://www.linkedin.com/in/irenehl/",
          github: "https://github.com/irenehl",
          website: "https://dhuezo.dev/en",
        },
      },
    ],
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
    empty:
      "Todavía no hay publicaciones del lab. Vuelve pronto.",
  },
  ecosystem: {
    label: "PARTNERS",
    heading: "Aliados de aprendizaje",
    ctaLabel: "¿Curiosidad por colaborar?",
    partners: [
      { name: "Cursor", url: "https://cursor.com" },
      { name: "v0", url: "https://v0.dev" },
    ],
  },
  eventsGallery: {
    badge: "GALERÍA",
    title: "Galería de eventos",
  },
  communityProof: {
    eyebrow: "PRUEBA",
    title: "La comunidad en acción",
    slots: [
      {
        imageAlt:
          "Miembros de la comunidad Ai Labs en un evento, conversando y colaborando.",
        eventName: "Cursor Hackathon Guatemala",
        attendees: 140,
      },
      {
        imageAlt:
          "Personas de la comunidad Ai Labs participando en una sesión grupal.",
        eventName: "Cursor Hackathon San Salvador",
        attendees: 145,
      },
      {
        imageAlt:
          "Asistentes en Café Cursor, comunidad Ai Labs enfocada en la conversación.",
        eventName: "Café Cursor",
        attendees: 86,
      },
      {
        imageAlt:
          "Participantes en un evento Ai Labs, escuchando y tomando notas.",
        eventName: "Cursor Lab (UFG)",
        attendees: 75,
      },
      {
        imageAlt:
          "Comunidad Ai Labs en el Supabase Meetup, compartiendo en grupo.",
        eventName: "Supabase Meetup",
        attendees: 43,
      },
      {
        imageAlt:
          "Personas de Ai Labs conectando durante un encuentro de la comunidad.",
        eventName: "Cursor Meetup",
        attendees: 97,
      },
      {
        imageAlt:
          "Momento en un evento Ai Labs: la comunidad compartiendo ideas.",
        eventName: "v0 Prompt to Production GT",
        attendees: 37,
      },
    ],
  },
  joinCta: {
    badge: "ÚNETE",
    heading: "¿Tienes preguntas? Bien.",
    subtext: "Únete a más de 500 builders explorando lo posible con IA.",
    cta: "Unirse a Ai /abs",
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
    noPast: "Aún no hay eventos pasados.",
    rsvpButton: "Confirmar asistencia",
    recapButton: "Ver resumen",
    albumButton: "Ver álbum",
    virtualLabel: "Virtual",
    upcoming: [],
    past: [],
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
      headlinePhrases: [
        "juntos.",
        "en público.",
        "experimentos reales.",
        "con la comunidad.",
        "alianzas honestas.",
      ],
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
        body: "Ai /abs es una comunidad de builders en El Salvador. Al usar este sitio aceptas participar de forma respetuosa. No permitimos spam, acoso ni contenido que viole la privacidad de terceros.",
      },
      {
        heading: "Eventos y actividades",
        body: "Los eventos y workshops organizados por Ai /abs pueden tener reglas propias. La asistencia implica aceptar esas reglas y el código de conducta del evento.",
      },
      {
        heading: "Contenido y responsabilidad",
        body: "El contenido publicado por miembros es responsabilidad de quienes lo publican. Ai /abs no se hace responsable del contenido generado por la comunidad, aunque nos reservamos el derecho de retirar contenido que considere inapropiado.",
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
    title: "Feed de la Comunidad",
    heroBadge: "COMUNIDAD",
    heroSubtitle: "Comparte lo que estás construyendo, descubre recursos y conecta con builders.",
    filterAll: "Todo",
    filterPosts: "Posts",
    filterRepos: "Repos",
    filterSkills: "Skills",
    filterPrompts: "Prompts",
    filterBlog: "Blog",
    composerPlaceholder: "¿Qué tienes en mente?",
    postButton: "Publicar",
    joinToShare: "Únete a la comunidad para compartir",
    joinCta: "Iniciar sesión",
    loadMore: "Cargar más",
    empty: "Aún no hay contenido. ¡Sé el primero en publicar!",
    sortNewest: "Recientes",
    sortOldest: "Antiguos",
    sortNewestFirst: "Más recientes primero",
    sortOldestFirst: "Más antiguos primero",
    searchPlaceholder: "Buscar en el feed...",
  },
  showcaseSubmit: {
    heroBadge: "Vitrina",
    heroTitleSubmit: "Enviar un proyecto",
    heroTitleEdit: "Editar proyecto",
    heroSubtitle:
      "Cuéntanos qué construiste: historia, enlaces y herramientas. Aparecerá en el feed y en tu perfil.",
    sectionBasics: "Lo esencial",
    sectionStory: "Historia",
    sectionCover: "Portada",
    sectionLinks: "Enlaces",
    sectionDetails: "Contexto",
    sectionTools: "Herramientas",
    descriptionMdHint:
      "Usa Escribir para redactar en Markdown; Vista previa muestra el resultado renderizado.",
    addOtherTool: "Añadir otra",
    addOtherToolTitle: "Añadir herramienta",
    addOtherToolPlaceholder: "p. ej. Notion AI",
    addOtherToolConfirm: "Añadir",
    addOtherToolCancel: "Cancelar",
    addOtherToolEmpty: "Escribe un nombre.",
    addOtherToolDuplicate: "Esa herramienta ya está en la lista.",
    addOtherToolMax: "Máximo 25 herramientas.",
    addOtherToolTooLong: "Máximo 40 caracteres.",
    titleSubmit: "Enviar un proyecto",
    titleEdit: "Editar proyecto",
    titleLabel: "Título",
    titlePlaceholder: "Mi proyecto increíble",
    titleRequired: "El título es obligatorio",
    urlPreviewLabel: "Tu URL en el showcase",
    urlPreviewTakenSuffix:
      "Esa ruta ya está en uso; al publicar añadiremos un sufijo corto único.",
    taglineLabel: "Eslogan",
    taglinePlaceholder: "Descripción en una línea",
    taglineRequired: "El eslogan es obligatorio",
    descriptionLabel: "Descripción",
    descriptionRequired: "La descripción es obligatoria",
    coverLabel: "Imagen de portada",
    coverUploadCta: "Elegir imagen",
    coverUploading: "Subiendo…",
    coverDragDropHint: "Arrastra y suelta o haz clic para subir",
    coverFileSizeHint: "JPG, PNG o WebP — máx. 3MB. 1200×630 recomendado para vistas previas en redes.",
    coverRequired: "La imagen de portada es obligatoria",
    coverErrorMaxSize: "Tamaño máximo 3MB",
    coverErrorFileType: "Usa JPG, PNG o WebP",
    coverErrorUploadFailed: "Error al subir. Intenta de nuevo.",
    projectUrlLabel: "URL del proyecto",
    projectUrlPlaceholder: "https://…",
    invalidUrl: "Introduce una URL válida",
    repoUrlLabel: "URL del repositorio",
    repoUrlPlaceholder: "https://github.com/…",
    socialPostUrlLabel: "URL de la publicación",
    socialPostUrlDescription: "Enlace a tu publicación en X o LinkedIn sobre este proyecto",
    socialPostUrlPlaceholder: "https://…",
    eventLabel: "Evento",
    eventPlaceholder: "p. ej. Café Cursor #5, Hackathon UFG, Independiente",
    toolsUsedLabel: "Herramientas usadas",
    statusLabel: "Estado",
    statusShipped: "Publicado",
    statusInProgress: "En progreso",
    statusConcept: "Concepto",
    submit: "Enviar",
    saveChanges: "Guardar cambios",
    saving: "Guardando…",
    cancel: "Cancelar",
  },
  showcasePage: {
    hero: {
      badge: "VITRINA",
      headlineLine1: "Proyectos que ",
      headlinePhrases: [
        "construye la comunidad.",
        "salen del lab.",
        "merecen más ojos.",
        "cuentan con código.",
        "abren la conversación.",
      ],
      subheadline:
        "Demos, hackathons y experimentos de builders en El Salvador. Explora, inspírate y comparte el tuyo.",
      primaryCta: "Enviar proyecto",
      secondaryCta: "Colaborar con nosotros",
    },
  },
  showcaseList: {
    emptyTitle: "Aún no hay proyectos en vitrina",
    emptyBody:
      "Sé el primero en mostrar lo que estás construyendo. Tarda solo unos minutos.",
    emptySubmitCta: "Enviar un proyecto",
    emptyPartnersCta: "Ver alianzas",
    featured: "Destacados",
    allProjects: "Todos los proyectos",
    filterStatusLabel: "Estado",
    filterToolsLabel: "Herramientas",
    filterEventLabel: "Evento",
    statusShipped: "Publicado",
    statusInProgress: "En progreso",
    statusConcept: "Concepto",
  },
  showcaseDetail: {
    deleteProject: "Eliminar proyecto",
    deleteDialogTitle: "¿Eliminar este proyecto?",
    deleteDialogDescription:
      "Se borrará de forma permanente del showcase. Escribe el nombre exacto del proyecto para confirmar.",
    deleteTypeTitleLabel: "Nombre del proyecto",
    deleteConfirm: "Eliminar permanentemente",
    deleteCancel: "Cancelar",
    deleting: "Eliminando…",
  },
  resources: {
    wipLabel: "En construcción",
    wipDescription: "Los recursos estarán disponibles pronto.",
    tabPosts: "Posts",
    tabRepos: "Repos",
    tabSkills: "Skills",
    tabPrompts: "Prompts",
    tabBlog: "Blog",
    addResource: "Agregar",
    titleLabel: "Título",
    titlePlaceholder: "Ej: Mi colección de prompts",
    bodyLabel: "Contenido",
    bodyPlaceholder: "Describe tu recurso en markdown…",
    urlLabel: "URL (opcional)",
    urlLabelRepo: "URL del repositorio",
    urlLabelSkill: "URL de GitHub",
    urlPlaceholder: "https://github.com/…",
    tagsLabel: "Etiquetas",
    tagsDescription: "Separadas por comas",
    tagsPlaceholder: "cursor, ai, typescript",
    languageLabel: "Lenguaje",
    languagePlaceholder: "TypeScript",
    visibilityLabel: "Visibilidad",
    visibilityPublic: "Público",
    visibilityMembers: "Solo miembros",
    save: "Guardar",
    cancel: "Cancelar",
    empty: "Aún no hay recursos aquí.",
    typeRepo: "Repo",
    typeSkill: "Skill",
    typePrompt: "Prompt",
    typeBlog: "Blog",
    rawContentLabel: "Contenido del prompt",
    rawContentDescription: "El texto del prompt que se copiará/usará.",
    skillHelperTitle: "Los skills siguen el formato skills.sh",
    skillHelperText: "Aloja tu skill en GitHub siguiendo el formato skills.sh.",
    skillHelperLink: "Saber más →",
    writeLabel: "Escribir",
    previewLabel: "Vista previa",
    previewEmpty: "Nada que previsualizar",
    copy: "Copiar",
    copied: "¡Copiado!",
    openWithCursor: "Abrir con Cursor",
    openWithClaude: "Abrir con Claude",
    edit: "Editar",
    delete: "Eliminar",
    moreActions: "Más acciones",
    deleteConfirmTitle: "¿Eliminar este elemento?",
    deleteConfirmDescription: "Esta acción no se puede deshacer.",
    editPost: "Editar publicación",
  },
  interactions: {
    like: "Me gusta",
    comment: "Comentar",
    bookmark: "Guardar",
    reply: "Responder",
    addComment: "Agregar comentario",
    commentPlaceholder: "Escribe un comentario…",
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
      welcomeHostLeadPrefix: "¡Hola! Soy ",
      welcomeHostLeadSuffix: ".",
      subheadline: "Bienvenido a Ai /abs — una comunidad de builders explorando lo posible con IA. En unos pasos tendrás tu perfil listo para conectar con otros curiosos.",
      cta: "Empezar",
      edit: {
        headline: "¡Bienvenido de vuelta!",
        subheadline: "Tus compañeros builders quieren conocerte mejor — actualiza tu perfil cuando quieras.",
        cta: "Actualizar perfil",
      },
    },
    about: {
      headline: "Cuéntanos un poco de ti",
      subheadline: "Así la comunidad podrá encontrarte.",
      nameLabel: "Nombre",
      namePlaceholder: "Tu nombre",
      slugLabel: "Tu handle",
      slugDescription: "Tu URL será: /community/tu-handle",
      slugPlaceholder: "jane-doe",
      handleAvailable: "Este handle está disponible",
      handleTaken: "Este handle ya está en uso",
      handleInvalid: "Solo letras minúsculas, números y guiones",
      avatarLabel: "Foto de perfil",
      avatarUploadCta: "Subir foto",
      avatarUploading: "Subiendo…",
      avatarDragDropHint: "Arrastra o haz clic para subir",
      avatarFileSizeHint: "JPG, PNG, WebP — máx 2MB",
      locationLabel: "Ubicación",
      locationPlaceholder: "San Salvador, El Salvador",
      taglineLabel: "Frase o lema",
      taglinePlaceholder: "Ej: Construyendo con curiosidad.",
      taglineDescription: "Una frase corta, slogan o lema que aparecerá en tu perfil público.",
      taglineRequired: "La frase o lema es requerida",
      nameRequired: "El nombre es requerido",
      slugRequired: "El handle es requerido",
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
      experiencePlaceholder: "Selecciona…",
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
        { id: "agents-automation", label: "Agentes y automatización" },
        { id: "rag-knowledge-bases", label: "RAG y bases de conocimiento" },
        { id: "computer-vision", label: "Visión por computadora" },
        { id: "nlp-llms", label: "NLP y LLMs" },
        { id: "voice-audio", label: "Voz y audio" },
        { id: "code-generation", label: "Generación de código" },
        { id: "data-analytics", label: "Datos y analytics" },
        { id: "mlops-infrastructure", label: "MLOps e infraestructura" },
        { id: "product-ux-ai", label: "Producto y UX con IA" },
      ],
      tools: [
        { id: "chatgpt", label: "ChatGPT" },
        { id: "claude", label: "Claude" },
        { id: "cursor", label: "Cursor" },
        { id: "github-copilot", label: "GitHub Copilot" },
        { id: "v0", label: "v0" },
        { id: "midjourney", label: "Midjourney" },
        { id: "stable-diffusion", label: "Stable Diffusion" },
        { id: "dalle", label: "DALL-E" },
        { id: "openai-api", label: "OpenAI API" },
        { id: "anthropic-api", label: "Anthropic API" },
        { id: "gemini", label: "Gemini" },
        { id: "perplexity", label: "Perplexity" },
        { id: "langchain", label: "LangChain" },
        { id: "hugging-face", label: "Hugging Face" },
        { id: "replit-ai", label: "Replit AI" },
        { id: "vercel-ai-sdk", label: "Vercel AI SDK" },
      ],
      lookingFor: [
        { id: "learning-buddies", label: "Compañeros de aprendizaje" },
        { id: "project-collaborators", label: "Colaboradores de proyectos" },
        { id: "mentorship-mentee", label: "Mentoría (como aprendiz)" },
        { id: "mentorship-mentor", label: "Mentoría (como mentor)" },
        { id: "job-opportunities", label: "Oportunidades laborales" },
        { id: "co-founders", label: "Co-fundadores" },
        { id: "just-exploring", label: "Solo explorando" },
      ],
      availability: [
        { id: "coffee-chats", label: "Abierto a cafés" },
        { id: "collaborations", label: "Abierto a colaboraciones" },
        { id: "speaking", label: "Disponible para hablar" },
        { id: "mentoring", label: "Abierto a mentoría" },
      ],
    },
    interestsExplore: {
      headline: "¿Qué exploras?",
      subheadline: "Temas y herramientas que te interesan.",
      interestsLabel: "Temas de IA que te interesan",
      interestsRequired: "Selecciona al menos uno",
      toolsLabel: "Herramientas de IA que has explorado",
    },
    interestsConnect: {
      headline: "¿Cómo conectas?",
      subheadline: "Qué buscas y tu disponibilidad.",
      lookingForLabel: "Qué buscas",
      availabilityLabel: "Disponibilidad",
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
    header: {
      newPost: "Nuevo post",
      submitProject: "Enviar proyecto",
      myProfile: "Mi perfil",
      signOut: "Cerrar sesión",
    },
    nav: {
      overview: "Inicio",
      community: "Comunidad",
      events: "Eventos",
      partners: "Partners",
      blog: "Blog",
      feed: "Showcase",
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
      feed: "Showcase",
      terms: "Términos",
      watermarkWords: [
        "CURIOSOS",
        "CONSTRUIR",
        "¿POR QUÉ?",
        "LANZAR",
        "EXPLORA",
        "EL LAB",
        "CREAR",
        "APRENDER",
      ],
    },
    hero: { badgeLabel: "Abierto a los curiosos" },
    communityMembers: {
      badge: "THE CURIOUS ONES",
      title: "Gente que pregunta por qué",
      desc: "Builders, diseñadores y líderes que aprenden haciendo y comparten lo que descubren.",
      emptyState:
        "Todavía no hay perfiles públicos. Súmate y sé de los primeros en aparecer aquí.",
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
    founder: { github: "GitHub", x: "X", photoPlaceholder: "Foto del fundador" },
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
  profile: {
    activity: "Actividad",
    achievements: "Logros",
    achievementsEmpty: "Aún no hay logros",
    eventsAttended: "Eventos asistidos",
    projects: "Proyectos",
    showcaseEmpty: "Aún no has enviado ningún proyecto.",
    showcaseEmptySubtext: "Comparte lo que estás construyendo con la comunidad.",
    member: "Miembro",
    contact: "Contactar",
    editProfile: "Editar perfil",
    about: "Acerca de",
    experience: "Experiencia",
    interests: "Intereses",
    tools: "Herramientas",
    lookingFor: "Qué busco",
    availability: "Disponibilidad",
    experienceLabels: {
      beginner: "Principiante",
      intermediate: "Intermedio",
      advanced: "Avanzado",
      exploring: "Explorando",
      building: "Construyendo",
      shipping: "Desplegando",
    },
  },
};

const contentEn: SiteContent = {
  site: {
    name: "Ai /abs",
    pageTitle: "Ai /abs - El Salvador's Tech and AI Community Hub",
    description: "A community of curious builders exploring what's possible with AI. Starting in El Salvador.",
    location: "San Salvador, El Salvador",
    whatsappLink: "https://chat.whatsapp.com/Ga8mG1fqDM9C0ryxAw1eIj",
  },
  hero: {
    headlineLine1: "Curiosity is what drives us.",
    headlineLine2: "AI is how we explore.",
    headlinePhrases: [
      "AI is how we explore.",
      "AI is our catalyst.",
      "AI is the beginning.",
      "AI is our sandbox.",
      "AI is what we build."
    ],
    subheadline: "A community of builders in El Salvador who ask questions, run experiments, and share what they learn.",
    primaryCta: "Explore the Lab",
    secondaryCta: "See what we're exploring",
  },
  founders: {
    sectionTitle: "THE STORY",
    sectionHeadline: "Walter Morales & Daniela Huezo",
    bio: "We started Ai /abs with a simple question: what can AI actually do here? No one in El Salvador was asking — so we built the space to find out. What began as curiosity became a community of 500+ builders across the region, running workshops, hackathons, and real conversations about what's possible.",
    purposeFraming: "Want to build something with us?",
    purposeItems: [
      "Partnerships that turn ideas into learning experiences",
      "Speaking invitations that go beyond the slides",
      "Connections with builders who ship, not just talk",
    ],
    people: [
      {
        name: "Walter Morales",
        role: "FOUNDER",
        image: "/images/walter-morales.webp",
        cta: "wmorales.dev →",
        socials: {
          twitter: "https://twitter.com/wmoralesdev",
          linkedin: "https://linkedin.com/in/wmoralesdev",
          github: "https://github.com/wmoralesdev",
          website: "https://wmorales.dev",
        },
      },
      {
        name: "Daniela Huezo",
        role: "CO-FOUNDER",
        image: "/images/daniela-huezo.webp",
        cta: "dhuezo.dev →",
        socials: {
          twitter: "https://x.com/irenehl26__",
          linkedin: "https://www.linkedin.com/in/irenehl/",
          github: "https://github.com/irenehl",
          website: "https://dhuezo.dev/en",
        },
      },
    ],
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
    empty: "Nothing from the lab yet. Check back soon.",
  },
  ecosystem: {
    label: "PARTNERS",
    heading: "Learning partners",
    ctaLabel: "Curious about partnering?",
    partners: [
      { name: "Cursor", url: "https://cursor.com" },
      { name: "v0", url: "https://v0.dev" },
    ],
  },
  eventsGallery: {
    badge: "GALLERY",
    title: "Event Gallery",
  },
  communityProof: {
    eyebrow: "PROOF",
    title: "The community in action",
    slots: [
      {
        imageAlt:
          "Ai Labs community members at an event, talking and collaborating.",
        eventName: "Cursor Hackathon Guatemala",
        attendees: 140,
      },
      {
        imageAlt:
          "Ai Labs community members taking part in a group session.",
        eventName: "Cursor Hackathon San Salvador",
        attendees: 145,
      },
      {
        imageAlt:
          "Attendees at Cafe Cursor, Ai Labs community focused on the discussion.",
        eventName: "Cafe Cursor",
        attendees: 86,
      },
      {
        imageAlt:
          "Attendees at an Ai Labs event listening and taking notes.",
        eventName: "Cursor Lab (UFG)",
        attendees: 75,
      },
      {
        imageAlt:
          "Ai Labs community at Supabase Meetup, sharing as a group.",
        eventName: "Supabase Meetup",
        attendees: 43,
      },
      {
        imageAlt:
          "Ai Labs members connecting during a community meetup.",
        eventName: "Cursor Meetup",
        attendees: 97,
      },
      {
        imageAlt:
          "A moment from an Ai Labs event: community members sharing ideas.",
        eventName: "v0 Prompt to Production GT",
        attendees: 37,
      },
    ],
  },
  joinCta: {
    badge: "JOIN",
    heading: "Got questions? Good.",
    subtext: "Join 500+ builders exploring what's possible with AI.",
    cta: "Join Ai /abs",
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
    noPast: "No past events yet.",
    rsvpButton: "RSVP Now",
    recapButton: "View Recap",
    albumButton: "View Album",
    virtualLabel: "Virtual",
    upcoming: [],
    past: [],
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
      headlinePhrases: [
        "us.",
        "the community.",
        "real experiments.",
        "open doors.",
        "honest partnerships.",
      ],
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
        body: "Ai /abs is a community of builders in El Salvador. By using this site you agree to participate respectfully. We do not allow spam, harassment, or content that violates the privacy of others.",
      },
      {
        heading: "Events and activities",
        body: "Events and workshops organized by Ai /abs may have their own rules. Attending implies acceptance of those rules and the event's code of conduct.",
      },
      {
        heading: "Content and responsibility",
        body: "Content published by members is the responsibility of those who publish it. Ai /abs is not responsible for content generated by the community, although we reserve the right to remove content we consider inappropriate.",
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
    title: "Community Feed",
    heroBadge: "COMMUNITY",
    heroSubtitle: "Share what you're building, discover resources, and connect with builders.",
    filterAll: "All",
    filterPosts: "Posts",
    filterRepos: "Repos",
    filterSkills: "Skills",
    filterPrompts: "Prompts",
    filterBlog: "Blog",
    composerPlaceholder: "What's on your mind?",
    postButton: "Post",
    joinToShare: "Join the community to share",
    joinCta: "Sign in",
    loadMore: "Load more",
    empty: "No content yet. Be the first to post!",
    sortNewest: "Newest",
    sortOldest: "Oldest",
    sortNewestFirst: "Newest first",
    sortOldestFirst: "Oldest first",
    searchPlaceholder: "Search feed...",
  },
  showcaseSubmit: {
    heroBadge: "Showcase",
    heroTitleSubmit: "Submit a project",
    heroTitleEdit: "Edit project",
    heroSubtitle:
      "Tell us what you built—story, links, and tools. It will appear on the feed and your profile.",
    sectionBasics: "Basics",
    sectionStory: "Story",
    sectionCover: "Cover",
    sectionLinks: "Links",
    sectionDetails: "Details",
    sectionTools: "Tools",
    descriptionMdHint:
      "Use Write to edit in Markdown; Preview shows the rendered output.",
    addOtherTool: "Add other",
    addOtherToolTitle: "Add a tool",
    addOtherToolPlaceholder: "e.g. Notion AI",
    addOtherToolConfirm: "Add",
    addOtherToolCancel: "Cancel",
    addOtherToolEmpty: "Enter a tool name.",
    addOtherToolDuplicate: "That tool is already in the list.",
    addOtherToolMax: "You can add at most 25 tools.",
    addOtherToolTooLong: "Maximum 40 characters.",
    titleSubmit: "Submit a project",
    titleEdit: "Edit project",
    titleLabel: "Title",
    titlePlaceholder: "My awesome project",
    titleRequired: "Title is required",
    urlPreviewLabel: "Showcase URL",
    urlPreviewTakenSuffix:
      "That path is already in use—we'll add a short unique suffix when you submit.",
    taglineLabel: "Tagline",
    taglinePlaceholder: "One-liner description",
    taglineRequired: "Tagline is required",
    descriptionLabel: "Description",
    descriptionRequired: "Description is required",
    coverLabel: "Cover image",
    coverUploadCta: "Choose image",
    coverUploading: "Uploading…",
    coverDragDropHint: "Drag & drop or click to upload",
    coverFileSizeHint: "JPG, PNG, or WebP — max 3MB. 1200×630 recommended for social previews.",
    coverRequired: "Cover image is required",
    coverErrorMaxSize: "Max size 3MB",
    coverErrorFileType: "Use JPG, PNG or WebP",
    coverErrorUploadFailed: "Upload failed. Try again.",
    projectUrlLabel: "Project URL",
    projectUrlPlaceholder: "https://…",
    invalidUrl: "Enter a valid URL",
    repoUrlLabel: "Repository URL",
    repoUrlPlaceholder: "https://github.com/…",
    socialPostUrlLabel: "Social post URL",
    socialPostUrlDescription: "Link to your X or LinkedIn post about this project",
    socialPostUrlPlaceholder: "https://…",
    eventLabel: "Event",
    eventPlaceholder: "e.g. Café Cursor #5, Hackathon UFG, Independent",
    toolsUsedLabel: "Tools used",
    statusLabel: "Status",
    statusShipped: "Shipped",
    statusInProgress: "In progress",
    statusConcept: "Concept",
    submit: "Submit",
    saveChanges: "Save changes",
    saving: "Saving…",
    cancel: "Cancel",
  },
  showcasePage: {
    hero: {
      badge: "SHOWCASE",
      headlineLine1: "Projects the ",
      headlinePhrases: [
        "community is building.",
        "community is shipping.",
        "lab is showcasing.",
        "builders are shipping.",
        "community keeps sharing.",
      ],
      subheadline:
        "Demos, hackathons, and experiments from builders in El Salvador. Explore, get inspired, and share yours.",
      primaryCta: "Submit a project",
      secondaryCta: "Partner with us",
    },
  },
  showcaseList: {
    emptyTitle: "No projects in the showcase yet",
    emptyBody:
      "Be the first to share what you're building—it only takes a few minutes.",
    emptySubmitCta: "Submit a project",
    emptyPartnersCta: "See partnerships",
    featured: "Featured",
    allProjects: "All projects",
    filterStatusLabel: "Status",
    filterToolsLabel: "Tools",
    filterEventLabel: "Event",
    statusShipped: "Shipped",
    statusInProgress: "In progress",
    statusConcept: "Concept",
  },
  showcaseDetail: {
    deleteProject: "Delete project",
    deleteDialogTitle: "Delete this project?",
    deleteDialogDescription:
      "This permanently removes it from the showcase. Type the exact project name to confirm.",
    deleteTypeTitleLabel: "Project name",
    deleteConfirm: "Delete permanently",
    deleteCancel: "Cancel",
    deleting: "Deleting…",
  },
  resources: {
    wipLabel: "Work in progress",
    wipDescription: "Resources will be available soon.",
    tabPosts: "Posts",
    tabRepos: "Repos",
    tabSkills: "Skills",
    tabPrompts: "Prompts",
    tabBlog: "Blog",
    addResource: "Add",
    titleLabel: "Title",
    titlePlaceholder: "E.g. My prompt collection",
    bodyLabel: "Content",
    bodyPlaceholder: "Describe your resource in markdown…",
    urlLabel: "URL (optional)",
    urlLabelRepo: "Repository URL",
    urlLabelSkill: "GitHub URL",
    urlPlaceholder: "https://github.com/…",
    tagsLabel: "Tags",
    tagsDescription: "Comma-separated",
    tagsPlaceholder: "cursor, ai, typescript",
    languageLabel: "Language",
    languagePlaceholder: "TypeScript",
    visibilityLabel: "Visibility",
    visibilityPublic: "Public",
    visibilityMembers: "Members only",
    save: "Save",
    cancel: "Cancel",
    empty: "No resources here yet.",
    typeRepo: "Repo",
    typeSkill: "Skill",
    typePrompt: "Prompt",
    typeBlog: "Blog",
    rawContentLabel: "Prompt content",
    rawContentDescription: "The actual prompt text that will be copied/used.",
    skillHelperTitle: "Skills follow the skills.sh format",
    skillHelperText: "Host your skill on GitHub following the skills.sh format.",
    skillHelperLink: "Learn more →",
    writeLabel: "Write",
    previewLabel: "Preview",
    previewEmpty: "Nothing to preview",
    copy: "Copy",
    copied: "Copied!",
    openWithCursor: "Open with Cursor",
    openWithClaude: "Open with Claude",
    edit: "Edit",
    delete: "Delete",
    moreActions: "More actions",
    deleteConfirmTitle: "Delete this item?",
    deleteConfirmDescription: "This action cannot be undone.",
    editPost: "Edit post",
  },
  interactions: {
    like: "Like",
    comment: "Comment",
    bookmark: "Bookmark",
    reply: "Reply",
    addComment: "Add comment",
    commentPlaceholder: "Write a comment…",
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
      welcomeHostLeadPrefix: "Hey! I'm ",
      welcomeHostLeadSuffix: ".",
      subheadline: "Welcome to Ai /abs — a community of builders exploring what's possible with AI. In a few steps you'll have your profile ready to connect with other curious people.",
      cta: "Get started",
      edit: {
        headline: "Welcome back!",
        subheadline: "Your fellow builders want to know you better — update your profile whenever you like.",
        cta: "Update profile",
      },
    },
    about: {
      headline: "Let's get to know you",
      subheadline: "So the community can find you.",
      nameLabel: "Name",
      namePlaceholder: "Your name",
      slugLabel: "Your handle",
      slugDescription: "Your URL will be: /community/your-handle",
      slugPlaceholder: "jane-doe",
      handleAvailable: "This handle is available",
      handleTaken: "This handle is already taken",
      handleInvalid: "Only lowercase letters, numbers, and hyphens",
      avatarLabel: "Profile photo",
      avatarUploadCta: "Upload photo",
      avatarUploading: "Uploading…",
      avatarDragDropHint: "Drag & drop or click to upload",
      avatarFileSizeHint: "JPG, PNG, WebP — max 2MB",
      locationLabel: "Location",
      locationPlaceholder: "San Salvador, El Salvador",
      taglineLabel: "Tagline",
      taglinePlaceholder: "E.g. Building with curiosity.",
      taglineDescription: "A short phrase, slogan or motto that will appear on your public profile.",
      taglineRequired: "Tagline is required",
      nameRequired: "Name is required",
      slugRequired: "Handle is required",
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
      experiencePlaceholder: "Select…",
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
        { id: "agents-automation", label: "Agents & Automation" },
        { id: "rag-knowledge-bases", label: "RAG & Knowledge Bases" },
        { id: "computer-vision", label: "Computer Vision" },
        { id: "nlp-llms", label: "NLP & LLMs" },
        { id: "voice-audio", label: "Voice & Audio" },
        { id: "code-generation", label: "Code Generation" },
        { id: "data-analytics", label: "Data & Analytics" },
        { id: "mlops-infrastructure", label: "MLOps & Infrastructure" },
        { id: "product-ux-ai", label: "Product & UX with AI" },
      ],
      tools: [
        { id: "chatgpt", label: "ChatGPT" },
        { id: "claude", label: "Claude" },
        { id: "cursor", label: "Cursor" },
        { id: "github-copilot", label: "GitHub Copilot" },
        { id: "v0", label: "v0" },
        { id: "midjourney", label: "Midjourney" },
        { id: "stable-diffusion", label: "Stable Diffusion" },
        { id: "dalle", label: "DALL-E" },
        { id: "openai-api", label: "OpenAI API" },
        { id: "anthropic-api", label: "Anthropic API" },
        { id: "gemini", label: "Gemini" },
        { id: "perplexity", label: "Perplexity" },
        { id: "langchain", label: "LangChain" },
        { id: "hugging-face", label: "Hugging Face" },
        { id: "replit-ai", label: "Replit AI" },
        { id: "vercel-ai-sdk", label: "Vercel AI SDK" },
      ],
      lookingFor: [
        { id: "learning-buddies", label: "Learning buddies" },
        { id: "project-collaborators", label: "Project collaborators" },
        { id: "mentorship-mentee", label: "Mentorship (as mentee)" },
        { id: "mentorship-mentor", label: "Mentorship (as mentor)" },
        { id: "job-opportunities", label: "Job opportunities" },
        { id: "co-founders", label: "Co-founders" },
        { id: "just-exploring", label: "Just exploring" },
      ],
      availability: [
        { id: "coffee-chats", label: "Open to coffee chats" },
        { id: "collaborations", label: "Open to collaborations" },
        { id: "speaking", label: "Available for speaking" },
        { id: "mentoring", label: "Open to mentoring" },
      ],
    },
    interestsExplore: {
      headline: "What are you exploring?",
      subheadline: "Topics and tools that interest you.",
      interestsLabel: "AI topics that interest you",
      interestsRequired: "Select at least one",
      toolsLabel: "AI tools you've explored",
    },
    interestsConnect: {
      headline: "How do you connect?",
      subheadline: "What you're looking for and your availability.",
      lookingForLabel: "What you're looking for",
      availabilityLabel: "Availability",
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
    header: {
      newPost: "New post",
      submitProject: "Submit project",
      myProfile: "My profile",
      signOut: "Sign out",
    },
    nav: {
      overview: "Overview",
      community: "Community",
      events: "Events",
      partners: "Partners",
      blog: "Blog",
      feed: "Showcase",
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
      feed: "Showcase",
      terms: "Terms",
      watermarkWords: [
        "CURIOUS",
        "BUILDERS",
        "WHY?",
        "SHIP IT",
        "EXPLORE",
        "THE LAB",
        "CREATE",
        "LEARN",
      ],
    },
    hero: { badgeLabel: "Open to the curious" },
    communityMembers: {
      badge: "THE CURIOUS ONES",
      title: "People who ask why",
      desc: "Builders, designers, and leaders who learn by doing and share what they find.",
      emptyState:
        "No public profiles yet. Join and be among the first to show up here.",
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
    founder: { github: "GitHub", x: "X", photoPlaceholder: "Founder Photo" },
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
  profile: {
    activity: "Activity",
    achievements: "Achievements",
    achievementsEmpty: "No achievements yet",
    eventsAttended: "Events attended",
    projects: "Projects",
    showcaseEmpty: "You haven't submitted any projects yet.",
    showcaseEmptySubtext: "Share what you're building with the community.",
    member: "Member",
    contact: "Contact",
    editProfile: "Edit profile",
    about: "About",
    experience: "Experience",
    interests: "Interests",
    tools: "Tools",
    lookingFor: "Looking for",
    availability: "Availability",
    experienceLabels: {
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
      exploring: "Exploring",
      building: "Building",
      shipping: "Shipping",
    },
  },
};

export const content = {
  es: contentEs,
  en: contentEn,
};

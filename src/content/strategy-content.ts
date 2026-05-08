import type { Language } from '@/content/site-content'

type Cta = {
  label: string
  href: string
}

export type AudiencePath = {
  audience: string
  title: string
  description: string
  proof: string
  cta: Cta
}

export type StrategicPillar = {
  title: string
  description: string
  cta: Cta
}

export type ServiceOffer = {
  title: string
  description: string
  outcome: string
}

export type StrategyContent = {
  audiencePaths: {
    eyebrow: string
    title: string
    description: string
    items: Array<AudiencePath>
  }
  pillars: {
    eyebrow: string
    title: string
    description: string
    items: Array<StrategicPillar>
  }
  offerPreview: {
    eyebrow: string
    title: string
    description: string
    cta: Cta
    secondaryCta: Cta
    offers: Array<ServiceOffer>
  }
  workWithUs: {
    hero: {
      badge: string
      headlineLine1: string
      headlinePhrases: Array<string>
      subheadline: string
      note: string
      primaryCta: string
      secondaryCta: string
    }
    who: {
      eyebrow: string
      title: string
      description: string
      items: Array<{ title: string; description: string }>
    }
    offers: {
      eyebrow: string
      title: string
      description: string
      items: Array<ServiceOffer>
    }
    process: {
      eyebrow: string
      title: string
      steps: Array<{ title: string; description: string }>
    }
    outcomes: {
      eyebrow: string
      title: string
      items: Array<string>
    }
    faq: {
      eyebrow: string
      title: string
      items: Array<{ q: string; a: string }>
    }
    finalCta: {
      eyebrow: string
      title: string
      body: string
      primaryCta: string
      secondaryCta: string
    }
  }
  eventsPage: {
    hero: {
      badge: string
      headlineLine1: string
      headlinePhrases: Array<string>
      subheadline: string
      primaryCta: string
      secondaryCta: string
    }
    types: {
      eyebrow: string
      title: string
      description: string
      items: Array<{ title: string; description: string }>
    }
    archive: {
      eyebrow: string
      title: string
      description: string
      empty: string
    }
    cta: {
      eyebrow: string
      title: string
      body: string
      hostCta: string
      joinCta: string
    }
    detail: {
      back: string
      recap: string
      album: string
      rsvp: string
      partner: string
      tags: string
    }
  }
  partners: {
    paths: {
      eyebrow: string
      title: string
      description: string
      items: Array<AudiencePath>
    }
  }
  finalPaths: {
    eyebrow: string
    title: string
    description: string
    items: Array<AudiencePath>
  }
}

export const strategyContent: Record<Language, StrategyContent> = {
  es: {
    audiencePaths: {
      eyebrow: 'ELIGE TU CAMINO',
      title: 'No todos llegan buscando lo mismo.',
      description:
        'Ai /abs tiene una puerta para cada intención: aprender, colaborar, entrenar un equipo o llevar una experiencia práctica a una institución.',
      items: [
        {
          audience: 'Empresa tech',
          title: 'Entrena a tu equipo en flujos modernos de IA',
          description:
            'Sesiones prácticas con Cursor, herramientas AI-native y criterios para integrar IA en producto e ingeniería.',
          proof: 'Para equipos que ya construyen software.',
          cta: { label: 'Ver work with us', href: '/work-with-us' },
        },
        {
          audience: 'Partner',
          title: 'Acerca recursos al ecosistema',
          description:
            'Espacio, herramientas, speakers, patrocinio o mentoría para que más sesiones, workshops y prototipos abiertos sucedan.',
          proof: 'Para marcas, comunidades y aliados.',
          cta: { label: 'Colaborar', href: '/partners' },
        },
        {
          audience: 'Universidad',
          title: 'Convierte curiosidad estudiantil en práctica',
          description:
            'Workshops, labs, hackathons y sesiones campus para pasar de usar chats de IA a construir con criterio.',
          proof: 'Para facultades, carreras y programas.',
          cta: { label: 'Llevarlo al campus', href: '/partners' },
        },
        {
          audience: 'Builder',
          title: 'Únete a la comunidad',
          description:
            'Eventos abiertos, WhatsApp, showcase y un lugar para aprender haciendo sin sentir que tenés que ser senior.',
          proof: 'Gratis. Comunidad abierta.',
          cta: { label: 'Ver eventos', href: '/events' },
        },
      ],
    },
    pillars: {
      eyebrow: 'LO QUE SOMOS',
      title: 'Comunidad, colaboración y práctica.',
      description:
        'La comunidad nos mantiene cerca de lo que está pasando. La colaboración mueve recursos hacia el ecosistema. La práctica convierte interés en criterio, workflows y proyectos.',
      items: [
        {
          title: 'Community',
          description:
            'Meetups, workshops, demo days y hackathons para builders que aprenden haciendo y comparten lo que descubren.',
          cta: { label: 'Unirme', href: '/events' },
        },
        {
          title: 'Collaboration',
          description:
            'Alianzas con equipos que aportan espacio, herramientas, expertise o señal a sesiones, workshops y campus labs.',
          cta: { label: 'Ser partner', href: '/partners' },
        },
        {
          title: 'Enablement',
          description:
            'Training, consultoría, workshops y prototipos para equipos que quieren usar IA con más criterio.',
          cta: { label: 'Entrenar mi equipo', href: '/work-with-us' },
        },
      ],
    },
    offerPreview: {
      eyebrow: 'PARA EQUIPOS',
      title: 'Training y consultoría de IA que termina en práctica.',
      description:
        'Ayudamos a equipos técnicos y no técnicos a pasar de probar herramientas sueltas a usarlas en workflows reales.',
      cta: { label: 'Work with us', href: '/work-with-us' },
      secondaryCta: { label: 'Partner on an event', href: '/partners' },
      offers: [
        {
          title: 'Team Training',
          description:
            'Sesiones hands-on sobre Cursor, AI coding, herramientas de productividad y criterio de uso.',
          outcome: 'Un equipo con lenguaje común y mejores hábitos de IA.',
        },
        {
          title: 'Workflow Consulting',
          description:
            'Mapeamos dónde encaja IA, qué herramientas tienen sentido y cómo adoptarlas sin ruido.',
          outcome: 'Un plan simple para pasar de curiosidad a uso real.',
        },
        {
          title: 'Prototype Sprints',
          description:
            'Construimos una pequeña app, automatización o flujo interno para probar un caso de uso concreto.',
          outcome: 'Un demo funcional y aprendizajes accionables.',
        },
      ],
    },
    workWithUs: {
      hero: {
        badge: '',
        headlineLine1: 'Llevemos IA ',
        headlinePhrases: ['a tu equipo.', 'a tu producto.'],
        subheadline:
          'Training, consultoría, workshops y prototipos para equipos que quieren usar herramientas de IA con más criterio y menos humo.',
        note: 'Sesiones en español o inglés. Para equipos técnicos, producto, operaciones, universidades y organizaciones que quieren aprender haciendo.',
        primaryCta: 'Hablar de mi equipo',
        secondaryCta: 'Ver ofertas',
      },
      who: {
        eyebrow: 'PARA QUIÉN',
        title: 'Equipos que quieren avanzar sin inventar solos.',
        description:
          'Podemos trabajar con equipos que ya construyen software, organizaciones explorando IA por primera vez, o instituciones que quieren formar criterio práctico.',
        items: [
          {
            title: 'Software y producto',
            description:
              'Cursor, AI coding workflows, prototipos, revisión de prácticas y decisiones de producto.',
          },
          {
            title: 'Operaciones y negocio',
            description:
              'Uso seguro de herramientas, automatizaciones pequeñas, documentación, análisis y workflows internos.',
          },
          {
            title: 'Universidades e instituciones',
            description:
              'Workshops, campus labs, hackathons y experiencias diseñadas para aprender construyendo.',
          },
        ],
      },
      offers: {
        eyebrow: 'OFERTAS',
        title: 'Puntos de partida claros.',
        description:
          'No tienen que ser paquetes rígidos. Son formatos para empezar una conversación concreta.',
        items: [
          {
            title: 'Cursor and AI Coding Training',
            description:
              'Entrenamiento para equipos técnicos que quieren usar agentes, diffs y contexto de repo con mejor criterio.',
            outcome:
              'Te llevás: sesión grabada + reglas de Cursor configuradas para tu repo.',
          },
          {
            title: 'AI Tools Training',
            description:
              'Sesiones para equipos que necesitan entender qué herramientas usar y cómo incorporarlas al trabajo diario.',
            outcome:
              'Te llevás: shortlist de 4–6 herramientas con reglas de uso interno.',
          },
          {
            title: 'Custom Workshops',
            description:
              'Sesiones hands-on diseñadas para tu audiencia, nivel técnico y objetivo de aprendizaje.',
            outcome:
              'Te llevás: agenda hecha sobre tu stack, no sobre slides genéricos.',
          },
          {
            title: 'Workflow Consulting',
            description:
              'Diagnóstico ligero de procesos, oportunidades, riesgos y primeros casos de uso.',
            outcome:
              'Te llevás: mapa de oportunidades con 1–2 puntos de partida priorizados.',
          },
          {
            title: 'Prototype Sprint',
            description:
              'Construcción rápida de un flujo, demo o app pequeña para validar una idea con IA.',
            outcome:
              'Te llevás: app o flow funcional, en tu repo, con notas de alcance.',
          },
          {
            title: 'Hackathon Design',
            description:
              'Diseño y facilitación de hackathons internos, campus labs o activaciones comunitarias.',
            outcome:
              'Te llevás: agenda, retos, criterios de jurado y plan de captura.',
          },
        ],
      },
      process: {
        eyebrow: 'CÓMO TRABAJAMOS',
        title: 'De conversación a práctica.',
        steps: [
          {
            title: 'Diagnose',
            description:
              'Entendemos el equipo, las herramientas actuales y el nivel de familiaridad con IA.',
          },
          {
            title: 'Design',
            description:
              'Definimos el formato: training, workshop, sprint, diagnóstico o activación.',
          },
          {
            title: 'Run',
            description:
              'Facilitamos la sesión con ejercicios, ejemplos y trabajo real sobre casos concretos.',
          },
          {
            title: 'Leave a path',
            description:
              'Cerramos con aprendizajes, próximos pasos y una forma clara de seguir usando IA.',
          },
        ],
      },
      outcomes: {
        eyebrow: 'RESULTADOS',
        title: 'Qué debería cambiar después.',
        items: [
          'Más criterio compartido sobre cuándo usar IA y cuándo no.',
          'Workflows más claros para equipos técnicos y no técnicos.',
          'Un prototipo, demo o mapa de oportunidades si el formato lo requiere.',
          'Menos dependencia de prompts sueltos y más práctica dentro del trabajo real.',
        ],
      },
      faq: {
        eyebrow: 'FAQ',
        title: 'Preguntas que suelen aparecer.',
        items: [
          {
            q: '¿Necesitamos ser técnicos?',
            a: 'No. Podemos diseñar sesiones para equipos técnicos, no técnicos o mixtos. Cambia el nivel de profundidad, no la idea: aprender haciendo.',
          },
          {
            q: '¿Pueden entrenar equipos de ingeniería?',
            a: 'Sí. Podemos enfocarnos en Cursor, AI coding workflows, revisión de cambios, contexto de repos y prácticas de equipo.',
          },
          {
            q: '¿También implementan prototipos?',
            a: 'Sí, cuando el objetivo es validar una idea concreta. Lo mantenemos pequeño para que el aprendizaje sea claro.',
          },
          {
            q: '¿Esto puede ser para una universidad?',
            a: 'Sí. Podemos diseñar campus labs, workshops o hackathons para estudiantes y docentes.',
          },
        ],
      },
      finalCta: {
        eyebrow: 'SIGUIENTE PASO',
        title: 'Contanos qué querés mover con IA.',
        body: 'Puede ser entrenar un equipo, diseñar un workshop, validar un prototipo o llevar una experiencia práctica a tu institución.',
        primaryCta: 'Hablar con Ai /abs',
        secondaryCta: 'Ver eventos',
      },
    },
    eventsPage: {
      hero: {
        badge: '',
        headlineLine1: 'Donde la IA ',
        headlinePhrases: ['se vuelve práctica.', 'se construye.'],
        subheadline:
          'Workshops, hackathons, meetups y campus labs donde builders, equipos y aliados aprenden haciendo.',
        primaryCta: 'Ver próximos eventos',
        secondaryCta: 'Host an event',
      },
      types: {
        eyebrow: 'FORMATOS',
        title: 'No todos los eventos tienen que sentirse iguales.',
        description:
          'Diseñamos el formato según la pregunta: aprender una herramienta, construir un prototipo, juntar comunidad o activar un campus.',
        items: [
          {
            title: 'Workshops',
            description:
              'Sesiones hands-on para practicar herramientas y workflows específicos.',
          },
          {
            title: 'Hackathons',
            description:
              'Bloques intensos para formar equipos, construir y mostrar lo que salió.',
          },
          {
            title: 'Demo Days',
            description:
              'Espacios cortos para enseñar prototipos, aprendizajes y proyectos reales.',
          },
          {
            title: 'Campus Labs',
            description:
              'Eventos con universidades para que estudiantes pasen de copiar respuestas a construir con criterio.',
          },
        ],
      },
      archive: {
        eyebrow: 'ARCHIVO',
        title: 'Lo que ya pasó también cuenta.',
        description:
          'Recaps, álbumes y eventos pasados muestran la energía, los aliados y los aprendizajes que hacen creíble el trabajo.',
        empty: 'Todavía no hay eventos pasados publicados.',
      },
      cta: {
        eyebrow: 'ACTIVA ALGO',
        title: 'Podemos llevar este formato a tu equipo, campus o comunidad.',
        body: 'Si tenés un espacio, una herramienta, una audiencia o una pregunta concreta, podemos convertirlo en una experiencia práctica.',
        hostCta: 'Host an Ai /abs event',
        joinCta: 'Unirme a la comunidad',
      },
      detail: {
        back: 'Volver a eventos',
        recap: 'Ver recap',
        album: 'Ver álbum',
        rsvp: 'Confirmar asistencia',
        partner: 'Partner',
        tags: 'Temas',
      },
    },
    partners: {
      paths: {
        eyebrow: 'CÓMO COLABORAR',
        title: 'Podés apoyar el ecosistema o traer el lab a tu organización.',
        description:
          'Algunas colaboraciones ponen recursos detrás de la comunidad. Otras llevan el aprendizaje práctico a un equipo, campus o institución.',
        items: [
          {
            audience: 'Apoyar comunidad',
            title: 'Haz posible más sesiones abiertas',
            description:
              'Espacio, herramientas, speakers, mentoría, patrocinio o señal para eventos abiertos y campus labs.',
            proof: 'Ideal para marcas, comunidades y aliados de ecosistema.',
            cta: { label: 'Ver formas de ayudar', href: '#ways-to-help' },
          },
          {
            audience: 'Traer Ai /abs',
            title: 'Lleva training o workshops a tu equipo',
            description:
              'Sesiones prácticas, consultoría o prototipos para tu organización.',
            proof: 'Ideal para empresas, universidades y equipos internos.',
            cta: { label: 'Work with us', href: '/work-with-us' },
          },
        ],
      },
    },
    finalPaths: {
      eyebrow: 'SIGUIENTE PASO',
      title: 'Tres formas de acercarte.',
      description:
        'Elegí la ruta que más se parece a lo que querés mover ahora.',
      items: [
        {
          audience: 'Partner',
          title: 'Colaborar con el ecosistema',
          description: 'Apoyar eventos, herramientas, espacios o activaciones.',
          proof: 'Para aliados y sponsors.',
          cta: { label: 'Ser partner', href: '/partners' },
        },
        {
          audience: 'Equipo',
          title: 'Entrenar o prototipar',
          description: 'Llevar IA práctica a tu equipo o institución.',
          proof: 'Para empresas y universidades.',
          cta: { label: 'Work with us', href: '/work-with-us' },
        },
        {
          audience: 'Comunidad',
          title: 'Unirte al lab',
          description: 'Eventos, WhatsApp y aprendizaje abierto.',
          proof: 'Para builders curiosos.',
          cta: { label: 'Ver eventos', href: '/events' },
        },
      ],
    },
  },
  en: {
    audiencePaths: {
      eyebrow: 'CHOOSE YOUR PATH',
      title: 'Not everyone arrives for the same reason.',
      description:
        'Ai /abs has a door for each intent: learn, collaborate, train a team, or bring a practical AI experience into an institution.',
      items: [
        {
          audience: 'Tech company',
          title: 'Train your team in modern AI workflows',
          description:
            'Hands-on sessions with Cursor, AI-native tools, and judgment for bringing AI into product and engineering.',
          proof: 'For teams already building software.',
          cta: { label: 'See work with us', href: '/work-with-us' },
        },
        {
          audience: 'Partner',
          title: 'Bring resources into the ecosystem',
          description:
            'Space, tools, speakers, sponsorship, or mentorship so more open sessions, workshops, and prototypes can happen.',
          proof: 'For brands, communities, and allies.',
          cta: { label: 'Collaborate', href: '/partners' },
        },
        {
          audience: 'University',
          title: 'Turn student curiosity into practice',
          description:
            'Workshops, labs, hackathons, and campus sessions that move from AI chat to building with judgment.',
          proof: 'For faculties, programs, and campuses.',
          cta: { label: 'Bring it to campus', href: '/partners' },
        },
        {
          audience: 'Builder',
          title: 'Join the community',
          description:
            'Open events, WhatsApp, showcase, and a place to learn by doing without needing to be senior.',
          proof: 'Free. Open community.',
          cta: { label: 'See events', href: '/events' },
        },
      ],
    },
    pillars: {
      eyebrow: 'WHAT WE ARE',
      title: 'Community, collaboration, and practice.',
      description:
        'Community keeps us close to what is happening. Collaboration moves resources toward the ecosystem. Practice turns interest into judgment, workflows, and projects.',
      items: [
        {
          title: 'Community',
          description:
            'Meetups, workshops, demo days, and hackathons for builders who learn by doing and share what they find.',
          cta: { label: 'Join', href: '/events' },
        },
        {
          title: 'Collaboration',
          description:
            'Partnerships with teams that bring space, tools, expertise, or signal to sessions, workshops, and campus labs.',
          cta: { label: 'Partner with us', href: '/partners' },
        },
        {
          title: 'Enablement',
          description:
            'Training, consulting, workshops, and prototypes for teams that want to use AI with better judgment.',
          cta: { label: 'Train my team', href: '/work-with-us' },
        },
      ],
    },
    offerPreview: {
      eyebrow: 'FOR TEAMS',
      title: 'AI training and consulting that ends in practice.',
      description:
        'We help technical and non-technical teams move from scattered tool trials to real workflows.',
      cta: { label: 'Work with us', href: '/work-with-us' },
      secondaryCta: { label: 'Partner on an event', href: '/partners' },
      offers: [
        {
          title: 'Team Training',
          description:
            'Hands-on sessions on Cursor, AI coding, productivity tools, and practical usage judgment.',
          outcome: 'A team with shared language and better AI habits.',
        },
        {
          title: 'Workflow Consulting',
          description:
            'We map where AI fits, which tools make sense, and how to adopt them without noise.',
          outcome: 'A simple plan to move from curiosity to real use.',
        },
        {
          title: 'Prototype Sprints',
          description:
            'We build a small app, automation, or internal workflow to test one concrete use case.',
          outcome: 'A working demo and actionable learning.',
        },
      ],
    },
    workWithUs: {
      hero: {
        badge: '',
        headlineLine1: 'Bring AI ',
        headlinePhrases: ['into your team.', 'into your product.'],
        subheadline:
          'Training, consulting, workshops, and prototypes for teams that want to use AI tools with more judgment and less hype.',
        note: 'Sessions in Spanish or English. For technical teams, product, operations, universities, and organizations that want to learn by building.',
        primaryCta: 'Talk about my team',
        secondaryCta: 'See offers',
      },
      who: {
        eyebrow: 'WHO IT IS FOR',
        title: 'Teams that want to move without figuring it out alone.',
        description:
          'We can work with teams already building software, organizations exploring AI for the first time, or institutions that want practical judgment.',
        items: [
          {
            title: 'Software and product',
            description:
              'Cursor, AI coding workflows, prototypes, practice reviews, and product decisions.',
          },
          {
            title: 'Operations and business',
            description:
              'Safe tool use, small automations, documentation, analysis, and internal workflows.',
          },
          {
            title: 'Universities and institutions',
            description:
              'Workshops, campus labs, hackathons, and experiences designed around learning by building.',
          },
        ],
      },
      offers: {
        eyebrow: 'OFFERS',
        title: 'Clear starting points.',
        description:
          'They do not need to be rigid packages. They are formats for starting a concrete conversation.',
        items: [
          {
            title: 'Cursor and AI Coding Training',
            description:
              'Training for technical teams using agents, diffs, and repo context with better judgment.',
            outcome:
              'Outcome: a recorded session + Cursor rules configured for your repo.',
          },
          {
            title: 'AI Tools Training',
            description:
              'Sessions for teams that need to understand which tools to use and how to bring them into daily work.',
            outcome:
              'Outcome: a 4–6 tool shortlist and internal usage rules.',
          },
          {
            title: 'Custom Workshops',
            description:
              'Hands-on sessions designed for your audience, technical level, and learning goal.',
            outcome:
              'Outcome: an agenda built around your stack, not generic slides.',
          },
          {
            title: 'Workflow Consulting',
            description:
              'A lightweight diagnosis of processes, opportunities, risks, and first use cases.',
            outcome:
              'Outcome: an opportunity map and 1–2 prioritized starting points.',
          },
          {
            title: 'Prototype Sprint',
            description:
              'Fast buildout of a flow, demo, or small app to validate one AI idea.',
            outcome:
              'Outcome: a working app or flow in your repo with scope notes.',
          },
          {
            title: 'Hackathon Design',
            description:
              'Design and facilitation for internal hackathons, campus labs, or community activations.',
            outcome:
              'Outcome: agenda, challenges, judging criteria, and capture plan.',
          },
        ],
      },
      process: {
        eyebrow: 'HOW WE WORK',
        title: 'From conversation to practice.',
        steps: [
          {
            title: 'Diagnose',
            description:
              'We understand the team, current tools, and level of familiarity with AI.',
          },
          {
            title: 'Design',
            description:
              'We define the format: training, workshop, sprint, diagnosis, or activation.',
          },
          {
            title: 'Run',
            description:
              'We facilitate the session with exercises, examples, and real work on concrete cases.',
          },
          {
            title: 'Leave a path',
            description:
              'We close with learnings, next steps, and a clear way to keep using AI.',
          },
        ],
      },
      outcomes: {
        eyebrow: 'OUTCOMES',
        title: 'What should change after.',
        items: [
          'More shared judgment about when to use AI and when not to.',
          'Clearer workflows for technical and non-technical teams.',
          'A prototype, demo, or opportunity map when the format calls for it.',
          'Less dependence on scattered prompts and more practice inside real work.',
        ],
      },
      faq: {
        eyebrow: 'FAQ',
        title: 'Questions that usually come up.',
        items: [
          {
            q: 'Do we need to be technical?',
            a: 'No. We can design sessions for technical, non-technical, or mixed teams. The depth changes, not the idea: learn by building.',
          },
          {
            q: 'Can you train engineering teams?',
            a: 'Yes. We can focus on Cursor, AI coding workflows, reviewing changes, repo context, and team practices.',
          },
          {
            q: 'Do you also implement prototypes?',
            a: 'Yes, when the goal is to validate a concrete idea. We keep it small so the learning stays clear.',
          },
          {
            q: 'Can this work for a university?',
            a: 'Yes. We can design campus labs, workshops, or hackathons for students and faculty.',
          },
        ],
      },
      finalCta: {
        eyebrow: 'NEXT STEP',
        title: 'Tell us what you want to move with AI.',
        body: 'It can be training a team, designing a workshop, validating a prototype, or bringing a practical experience into your institution.',
        primaryCta: 'Talk to Ai /abs',
        secondaryCta: 'See events',
      },
    },
    eventsPage: {
      hero: {
        badge: '',
        headlineLine1: 'Where AI ',
        headlinePhrases: ['becomes practice.', 'gets built.'],
        subheadline:
          'Workshops, hackathons, meetups, and campus labs where builders, teams, and partners learn by doing.',
        primaryCta: 'See upcoming events',
        secondaryCta: 'Host an event',
      },
      types: {
        eyebrow: 'FORMATS',
        title: 'Not every event should feel the same.',
        description:
          'We design the format around the question: learn a tool, build a prototype, gather community, or activate a campus.',
        items: [
          {
            title: 'Workshops',
            description:
              'Hands-on sessions for practicing specific tools and workflows.',
          },
          {
            title: 'Hackathons',
            description:
              'Focused blocks for forming teams, building, and showing what came out.',
          },
          {
            title: 'Demo Days',
            description:
              'Short spaces to show prototypes, learnings, and real projects.',
          },
          {
            title: 'Campus Labs',
            description:
              'University events that help students move from copying answers to building with judgment.',
          },
        ],
      },
      archive: {
        eyebrow: 'ARCHIVE',
        title: 'What already happened still matters.',
        description:
          'Recaps, albums, and past events show the energy, partners, and learning that make the work credible.',
        empty: 'No past events published yet.',
      },
      cta: {
        eyebrow: 'ACTIVATE SOMETHING',
        title: 'We can bring this format to your team, campus, or community.',
        body: 'If you have a space, a tool, an audience, or a concrete question, we can turn it into a practical experience.',
        hostCta: 'Host an Ai /abs event',
        joinCta: 'Join the community',
      },
      detail: {
        back: 'Back to events',
        recap: 'View recap',
        album: 'View album',
        rsvp: 'RSVP',
        partner: 'Partner',
        tags: 'Topics',
      },
    },
    partners: {
      paths: {
        eyebrow: 'HOW TO COLLABORATE',
        title:
          'You can support the ecosystem or bring the lab into your organization.',
        description:
          'Some collaborations put resources behind the community. Others bring practical learning into a team, campus, or institution.',
        items: [
          {
            audience: 'Support community',
            title: 'Make more open sessions possible',
            description:
              'Space, tools, speakers, mentorship, sponsorship, or signal for open events and campus labs.',
            proof: 'Best for brands, communities, and ecosystem allies.',
            cta: { label: 'See ways to help', href: '#ways-to-help' },
          },
          {
            audience: 'Bring Ai /abs',
            title: 'Bring training or workshops to your team',
            description:
              'Practical sessions, consulting, or prototypes for your organization.',
            proof: 'Best for companies, universities, and internal teams.',
            cta: { label: 'Work with us', href: '/work-with-us' },
          },
        ],
      },
    },
    finalPaths: {
      eyebrow: 'NEXT STEP',
      title: 'Three ways to get closer.',
      description:
        'Choose the route that looks most like what you want to move right now.',
      items: [
        {
          audience: 'Partner',
          title: 'Collaborate with the ecosystem',
          description: 'Support events, tools, spaces, or activations.',
          proof: 'For allies and sponsors.',
          cta: { label: 'Become a partner', href: '/partners' },
        },
        {
          audience: 'Team',
          title: 'Train or prototype',
          description: 'Bring practical AI into your team or institution.',
          proof: 'For companies and universities.',
          cta: { label: 'Work with us', href: '/work-with-us' },
        },
        {
          audience: 'Community',
          title: 'Join the lab',
          description: 'Events, WhatsApp, and open learning.',
          proof: 'For curious builders.',
          cta: { label: 'See events', href: '/events' },
        },
      ],
    },
  },
}

// Configuración centralizada de la empresa
export const COMPANY_CONFIG = {
  // Información básica de la empresa
  name: 'InzaiQ',
  tagline: 'Donde la innovación toma forma.',
  
  // Descripción principal para el hero
  heroDescription: `En InzaiQ convertimos tecnología en soluciones que piensan, se adaptan y avanzan contigo.

Desarrollamos herramientas impulsadas por inteligencia artificial que automatizan con precisión, escalan con inteligencia y se integran con visión.

No seguimos tendencias: las resolvemos. Creamos sistemas que entienden el contexto y se anticipan a lo que viene. Así tu empresa evoluciona, sin fricciones.

Tecnología con propósito. Resultados con dirección.`,

  // Información de contacto
  contact: {
    email: 'info@inzaiq.com',
    phone: '+595 976 147913',
    address: 'San Juan Bautista, Paraguay',
  },

  // Enlaces de redes sociales
  socialLinks: [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/inzaiq',
      icon: 'LinkedIn',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/inzaiq',
      icon: 'Twitter',
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/inzaiq',
      icon: 'Instagram',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/inzaiq',
      icon: 'GitHub',
    },
  ],

  // Navegación del sitio
  navigation: [
    { title: 'Inicio', href: '#home' },
    { title: 'Nosotros', href: '#about' },
    { title: 'Productos', href: '#products' },
    { title: 'Servicios', href: '#services' },
    { title: 'Contacto', href: '#contact' },
  ],

  // Información sobre la empresa
  about: {
    title: 'Quiénes Somos',
    description: `En InzaiQ, nos dedicamos a transformar ideas en soluciones tecnológicas que impulsan el futuro. 
    Somos especialistas en inteligencia artificial y automatización, creando herramientas que no solo resuelven problemas actuales, 
    sino que anticipan las necesidades del mañana.`,
    
    features: [
      {
        title: 'Innovación Constante',
        description: 'Desarrollamos tecnologías de vanguardia que marcan la diferencia en el mercado.',
        icon: 'Innovation',
      },
      {
        title: 'Soluciones Inteligentes',
        description: 'Nuestras herramientas de IA se adaptan y evolucionan con las necesidades de tu negocio.',
        icon: 'Psychology',
      },
      {
        title: 'Integración Perfecta',
        description: 'Diseñamos sistemas que se integran sin fricciones en tu infraestructura existente.',
        icon: 'Integration',
      },
    ],
  },

  // Servicios que ofrece la empresa
  services: [
    {
      title: 'Desarrollo de IA Personalizada',
      description: 'Creamos soluciones de inteligencia artificial adaptadas específicamente a las necesidades de tu empresa.',
      icon: 'SmartToy',
    },
    {
      title: 'Automatización de Procesos',
      description: 'Optimizamos y automatizamos procesos empresariales para aumentar la eficiencia y reducir costos.',
      icon: 'AutoMode',
    },
    {
      title: 'Integración de Sistemas',
      description: 'Conectamos y sincronizamos diferentes plataformas para crear un ecosistema tecnológico cohesivo.',
      icon: 'Hub',
    },
    {
      title: 'Consultoría Tecnológica',
      description: 'Asesoramos en la implementación de tecnologías emergentes para mantener tu empresa a la vanguardia.',
      icon: 'Lightbulb',
    },
    {
      title: 'Análisis de Datos',
      description: 'Transformamos datos en insights accionables mediante análisis avanzados y machine learning.',
      icon: 'Analytics',
    },
    {
      title: 'Soporte y Mantenimiento',
      description: 'Brindamos soporte continuo y actualizaciones para garantizar el óptimo funcionamiento de nuestras soluciones.',
      icon: 'Support',
    },
  ],
};

// Configuración de productos (escalable)
export const PRODUCTS_CONFIG = [
  {
    id: 'ai-chatbot',
    name: 'Bot de Mensajería Inteligente',
    category: 'Automatización',
    description: 'Automatiza tu atención al cliente con nuestro bot de mensajería potenciado por inteligencia artificial.',
    shortDescription: 'Bot de IA para atención al cliente automatizada',
    features: [
      {
        title: 'Respuestas Inteligentes',
        description: 'Nuestro bot utiliza IA para proporcionar respuestas precisas y contextuales.',
        icon: 'Chat',
      },
      {
        title: 'Aprendizaje Continuo',
        description: 'El sistema mejora constantemente a través del aprendizaje automático.',
        icon: 'Autorenew',
      },
      {
        title: 'Integración Sencilla',
        description: 'Fácil integración con WhatsApp, Telegram, y otras plataformas de mensajería.',
        icon: 'IntegrationInstructions',
      },
      {
        title: 'Disponibilidad 24/7',
        description: 'Atención al cliente automatizada las 24 horas, los 7 días de la semana.',
        icon: 'AccessTime',
      },
      {
        title: 'Análisis Detallado',
        description: 'Métricas y análisis completos de todas las interacciones.',
        icon: 'Analytics',
      },
    ],
    benefits: [
      'Reduce costos operativos hasta un 60%',
      'Mejora la satisfacción del cliente',
      'Respuesta instantánea 24/7',
      'Escalabilidad automática',
      'Integración con múltiples plataformas',
    ],
    technologies: ['OpenAI GPT', 'Natural Language Processing', 'Machine Learning', 'API Integration'],
    pricing: {
      starter: {
        name: 'Starter',
        price: '$299',
        period: '/mes',
        features: ['Hasta 1,000 conversaciones/mes', 'Integración básica', 'Soporte por email'],
      },
      professional: {
        name: 'Professional',
        price: '$599',
        period: '/mes',
        features: ['Hasta 5,000 conversaciones/mes', 'Integraciones avanzadas', 'Soporte prioritario', 'Analytics avanzados'],
      },
      enterprise: {
        name: 'Enterprise',
        price: 'Personalizado',
        period: '',
        features: ['Conversaciones ilimitadas', 'Personalización completa', 'Soporte dedicado', 'SLA garantizado'],
      },
    },
    images: {
      hero: '/products/chatbot-hero.png',
      gallery: [
        '/products/chatbot-1.png',
        '/products/chatbot-2.png',
        '/products/chatbot-3.png',
      ],
    },
    status: 'available', // available, coming-soon, beta
    featured: true,
  },
  // Aquí se pueden agregar más productos fácilmente
  {
    id: 'data-analytics',
    name: 'Plataforma de Análisis de Datos',
    category: 'Analytics',
    description: 'Transforma tus datos en insights accionables con nuestra plataforma de análisis impulsada por IA.',
    shortDescription: 'Analytics avanzados con IA para toma de decisiones',
    features: [
      {
        title: 'Visualización Avanzada',
        description: 'Dashboards interactivos y visualizaciones en tiempo real.',
        icon: 'BarChart',
      },
      {
        title: 'Predicciones IA',
        description: 'Modelos predictivos para anticipar tendencias y comportamientos.',
        icon: 'TrendingUp',
      },
      {
        title: 'Integración de Datos',
        description: 'Conecta múltiples fuentes de datos en una sola plataforma.',
        icon: 'Storage',
      },
    ],
    benefits: [
      'Decisiones basadas en datos',
      'Predicciones precisas',
      'ROI medible',
      'Automatización de reportes',
    ],
    technologies: ['Python', 'TensorFlow', 'Apache Spark', 'Power BI'],
    status: 'coming-soon',
    featured: false,
  },
];

// Configuración de metadatos SEO
export const SEO_CONFIG = {
  title: 'InzaiQ - Donde la innovación toma forma',
  description: 'InzaiQ convierte tecnología en soluciones que piensan, se adaptan y avanzan contigo. Desarrollamos herramientas de IA que automatizan con precisión y escalan con inteligencia.',
  keywords: 'inteligencia artificial, automatización, IA, machine learning, InzaiQ, innovación tecnológica, soluciones empresariales',
  author: 'InzaiQ',
  url: 'https://inzaiq.com',
  image: '/og-image.png',
}; 
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
    name: 'Bot de Automatización para WhatsApp',
    category: 'Automatización',
    description: 'Automatiza completamente tu atención al cliente en WhatsApp con nuestro bot inteligente potenciado por IA. Diseñado específicamente para WhatsApp Business, nuestra solución integra respuestas inteligentes, gestión de productos, procesamiento de pedidos y atención 24/7.',
    shortDescription: 'Automatización completa de WhatsApp Business con IA',
    features: [
      {
        title: 'Automatización WhatsApp Nativa',
        description: 'Integración completa con WhatsApp Business API para automatización total de conversaciones.',
        icon: 'Chat',
      },
      {
        title: 'Gestión Inteligente de Productos',
        description: 'Catálogo automatizado, consultas de precios, disponibilidad y procesamiento de pedidos.',
        icon: 'Storage',
      },
      {
        title: 'Respuestas Contextuales IA',
        description: 'IA avanzada que entiende el contexto y proporciona respuestas precisas y naturales.',
        icon: 'Psychology',
      },
      {
        title: 'Atención 24/7 Automatizada',
        description: 'Tu negocio nunca duerme. Atiende clientes las 24 horas con respuestas instantáneas.',
        icon: 'AccessTime',
      },
      {
        title: 'Analytics y Métricas',
        description: 'Dashboard completo con métricas de conversaciones, ventas y satisfacción del cliente.',
        icon: 'Analytics',
      },
      {
        title: 'Configuración Sin Código',
        description: 'Setup completo sin necesidad de programación. Listo para usar en minutos.',
        icon: 'AutoMode',
      },
    ],
    useCases: [
      {
        title: 'Tiendas y E-commerce',
        description: 'Automatiza consultas de productos, procesa pedidos, confirma disponibilidad y gestiona pagos directamente en WhatsApp.',
        benefits: ['Ventas 24/7', 'Reducción de carrito abandonado', 'Atención inmediata'],
        icon: 'Storage',
      },
      {
        title: 'Restaurantes y Delivery',
        description: 'Recibe pedidos, muestra menús actualizados, confirma direcciones y coordina entregas automáticamente.',
        benefits: ['Pedidos automatizados', 'Menú siempre actualizado', 'Gestión de delivery'],
        icon: 'Chat',
      },
      {
        title: 'Servicios Profesionales',
        description: 'Agenda citas, proporciona información de servicios, confirma disponibilidad y envía recordatorios.',
        benefits: ['Agenda automatizada', 'Recordatorios automáticos', 'Información instant'],
        icon: 'AccessTime',
      },
      {
        title: 'Soporte al Cliente',
        description: 'Resuelve consultas frecuentes, escala casos complejos y mantiene historial de conversaciones.',
        benefits: ['Resolución inmediata', 'Escalación inteligente', 'Historial completo'],
        icon: 'Support',
      },
      {
        title: 'Empresas B2B',
        description: 'Gestiona leads, califica prospectos, programa reuniones y envía propuestas automáticamente.',
        benefits: ['Calificación de leads', 'Follow-up automático', 'Gestión de pipeline'],
        icon: 'Hub',
      },
      {
        title: 'Educación y Capacitación',
        description: 'Proporciona información de cursos, gestiona inscripciones y envía material educativo.',
        benefits: ['Inscripciones automáticas', 'Material personalizado', 'Recordatorios de clases'],
        icon: 'Lightbulb',
      },
    ],
    benefits: [
      'Reduce costos operativos hasta un 75%',
      'Aumenta ventas con atención 24/7',
      'Mejora satisfacción del cliente',
      'Procesa pedidos automáticamente',
      'Escalabilidad ilimitada',
      'ROI medible y rápido',
    ],
    technologies: ['WhatsApp Business API', 'OpenAI GPT-4', 'Natural Language Processing', 'Machine Learning', 'Real-time Analytics'],
    pricing: {
      starter: {
        name: 'Starter',
        price: '$299',
        period: '/mes',
        features: ['Hasta 1,000 conversaciones/mes', 'Integración WhatsApp Business', 'Respuestas básicas IA', 'Soporte por email'],
      },
      professional: {
        name: 'Professional',
        price: '$599',
        period: '/mes',
        features: ['Hasta 5,000 conversaciones/mes', 'Gestión de productos', 'Analytics avanzados', 'Soporte prioritario', 'Personalización completa'],
      },
      enterprise: {
        name: 'Enterprise',
        price: 'Personalizado',
        period: '',
        features: ['Conversaciones ilimitadas', 'Múltiples números WhatsApp', 'Integración CRM/ERP', 'Soporte dedicado', 'SLA garantizado'],
      },
    },
    images: {
      hero: '/products/whatsapp-bot-hero.png',
      gallery: [
        '/products/whatsapp-bot-1.png',
        '/products/whatsapp-bot-2.png',
        '/products/whatsapp-bot-3.png',
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
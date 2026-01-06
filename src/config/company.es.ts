// Configuración centralizada de la empresa (ES)
export const COMPANY_CONFIG = {
  name: 'InzaiQ LLC',
  tagline: 'InzaiQ – Innovación en Automatización y SaaS para empresas digitales',

  heroDescription: `En InzaiQ ayudamos a empresas y emprendedores a escalar sus negocios con soluciones SaaS basadas en inteligencia artificial. Ofrecemos herramientas de automatización, generación de contenido y otros servicios digitales diseñados para ahorrar tiempo y maximizar resultados.

Automatización, optimización, escalabilidad y soporte confiable: ese es nuestro enfoque para impulsar tu crecimiento.

No seguimos tendencias: las resolvemos. Creamos sistemas que entienden el contexto y se anticipan a lo que viene. Así tu empresa evoluciona, sin fricciones.

Tecnología con propósito. Resultados con dirección.`,

  contact: {
    email: 'support@inzaiq.com',
    phone: '+595 976 147913',
    address: 'Registered Agents Inc, 30 N Gould St Ste R, Sheridan, WY 82801',
  },

  socialLinks: [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/inzaiq/', icon: 'LinkedIn' },
    { name: 'Instagram', url: 'https://www.instagram.com/inzaiq?igsh=MWpnejU3dXFtaGh4eg==', icon: 'Instagram' },
  ],

  navigation: [
    { title: 'Inicio', href: '#home' },
    { title: 'Nosotros', href: '#about' },
    { title: 'Productos', href: '#products' },
    { title: 'Servicios', href: '#services' },
    { title: 'Contacto', href: '#contact' },
  ],

  about: {
    title: 'Quiénes Somos',
    description: `En InzaiQ, nos dedicamos a transformar ideas en soluciones tecnológicas que impulsan el futuro. 
    Somos especialistas en inteligencia artificial y automatización, creando herramientas que no solo resuelven problemas actuales, 
    sino que anticipan las necesidades del mañana.`,
    features: [
      { title: 'Innovación Constante', description: 'Desarrollamos tecnologías de vanguardia que marcan la diferencia en el mercado.', icon: 'Innovation' },
      { title: 'Soluciones Inteligentes', description: 'Nuestras herramientas de IA se adaptan y evolucionan con las necesidades de tu negocio.', icon: 'Psychology' },
      { title: 'Integración Perfecta', description: 'Diseñamos sistemas que se integran sin fricciones en tu infraestructura existente.', icon: 'Integration' },
    ],
  },

  services: [
    { title: 'Desarrollo de IA Personalizada', description: 'Creamos soluciones de inteligencia artificial adaptadas específicamente a las necesidades de tu empresa.', icon: 'SmartToy' },
    { title: 'Automatización de Procesos', description: 'Optimizamos y automatizamos procesos empresariales para aumentar la eficiencia y reducir costos.', icon: 'AutoMode' },
    { title: 'Integración de Sistemas', description: 'Conectamos y sincronizamos diferentes plataformas para crear un ecosistema tecnológico cohesivo.', icon: 'Hub' },
    { title: 'Consultoría Tecnológica', description: 'Asesoramos en la implementación de tecnologías emergentes para mantener tu empresa a la vanguardia.', icon: 'Lightbulb' },
    { title: 'Análisis de Datos', description: 'Transformamos datos en insights accionables mediante análisis avanzados y machine learning.', icon: 'Analytics' },
    { title: 'Soporte y Mantenimiento', description: 'Brindamos soporte continuo y actualizaciones para garantizar el óptimo funcionamiento de nuestras soluciones.', icon: 'Support' },
  ],
};

export const PRODUCTS_CONFIG = [
  {
    id: 'product-cards-generator',
    name: 'ProdifyQ - Generador de listings para e-commerce',
    category: 'Contenido y Automatización',
    description: 'Crea listings de productos de alto rendimiento para cualquier plataforma de comercio electrónico. Generador automático impulsado por IA y optimizado para SEO, entrenado para el algoritmo A9 de Amazon.',
    shortDescription: 'Listings de alto rendimiento generados con IA',
    url: 'https://prodifyq.com',
    features: [
      { title: 'Descripciones SEO', description: 'Texto optimizado para buscadores con tono configurable.', icon: 'Description' },
      { title: 'Bullets automáticos', description: 'Puntos clave generados según categoría y atributos.', icon: 'Checklist' },
      { title: 'Exportación CSV', description: 'Listo para Shopify, WooCommerce, VTEX y más.', icon: 'Upload' },
    ],
    benefits: [
      'Reduce tiempos de carga de catálogo',
      'Mejora CTR y conversión',
      'Estandariza la calidad del contenido',
    ],
    status: 'available',
    featured: true,
  },
  {
    id: 'data-analytics',
    name: 'Plataforma de Análisis de Datos',
    category: 'Analytics',
    description: 'Transforma tus datos en insights accionables con nuestra plataforma de análisis impulsada por IA.',
    shortDescription: 'Analytics avanzados con IA para toma de decisiones',
    features: [
      { title: 'Visualización Avanzada', description: 'Dashboards interactivos y visualizaciones en tiempo real.', icon: 'BarChart' },
      { title: 'Predicciones IA', description: 'Modelos predictivos para anticipar tendencias y comportamientos.', icon: 'TrendingUp' },
      { title: 'Integración de Datos', description: 'Conecta múltiples fuentes de datos en una sola plataforma.', icon: 'Storage' },
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

export const SEO_CONFIG = {
  title: 'InzaiQ - Donde la innovación toma forma',
  description: 'InzaiQ convierte tecnología en soluciones que piensan, se adaptan y avanzan contigo. Desarrollamos herramientas de IA que automatizan con precisión y escalan con inteligencia.',
  keywords: 'inteligencia artificial, automatización, IA, machine learning, InzaiQ, innovación tecnológica, soluciones empresariales',
  author: 'InzaiQ',
  url: 'https://inzaiq.com',
  image: '/og-image.png',
};





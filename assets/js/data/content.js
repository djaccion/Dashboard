const HISTORIAS_DATA = [
  {
    id: "historia-1",
    titulo: "Scrum: El marco ágil que transformó el desarrollo de software",
    descripcion: "Scrum revolucionó la forma en que los equipos entregan valor al dividir el trabajo en sprints cortos y medibles. Su adopción masiva en la industria TI lo convirtió en el estándar de facto para proyectos complejos.",
    tag: "Agile",
    fecha: "05 Ene 2024",
    autor: "Laura Méndez",
    imagen: "https://placehold.co/600x400",
    linkTexto: "Leer historia"
  },
  {
    id: "historia-2",
    titulo: "Kanban: Visualizar el flujo para eliminar el desperdicio",
    descripcion: "Originado en las fábricas de Toyota, Kanban llegó al mundo del software como una herramienta poderosa para gestionar el trabajo en progreso. Los tableros visuales permitieron a los equipos identificar cuellos de botella en tiempo real.",
    tag: "Metodología",
    fecha: "18 Feb 2024",
    autor: "Carlos Ruiz",
    imagen: "https://placehold.co/600x400",
    linkTexto: "Leer historia"
  },
  {
    id: "historia-3",
    titulo: "Extreme Programming: Calidad de código como cultura de equipo",
    descripcion: "XP introdujo prácticas radicales como el desarrollo guiado por pruebas y la programación en pareja, elevando la calidad del software a un nivel sin precedentes. Sus principios siguen siendo referencia obligada en equipos de alto rendimiento.",
    tag: "Agile",
    fecha: "02 Mar 2024",
    autor: "Sofía Herrera",
    imagen: "https://placehold.co/600x400",
    linkTexto: "Leer historia"
  },
  {
    id: "historia-4",
    titulo: "DevOps: Cuando desarrollo y operaciones dejaron de ser enemigos",
    descripcion: "DevOps nació de la necesidad de romper los silos entre equipos de desarrollo y operaciones para acelerar la entrega continua de software. La cultura de colaboración y la automatización se convirtieron en sus pilares fundamentales.",
    tag: "DevOps",
    fecha: "14 Abr 2024",
    autor: "Andrés Torres",
    imagen: "https://placehold.co/600x400",
    linkTexto: "Leer historia"
  },
  {
    id: "historia-5",
    titulo: "Lean IT: Aplicando la eficiencia manufacturera a la tecnología",
    descripcion: "Lean IT trasladó los principios de eliminación de desperdicios del sector manufacturero al mundo de la tecnología de la información. Las organizaciones que adoptaron Lean IT reportaron reducciones significativas en tiempos de entrega y costos operativos.",
    tag: "Metodología",
    fecha: "28 May 2024",
    autor: "Patricia Vega",
    imagen: "https://placehold.co/600x400",
    linkTexto: "Leer historia"
  },
  {
    id: "historia-6",
    titulo: "SAFe: Escalando Agile en organizaciones empresariales",
    descripcion: "El Scaled Agile Framework surgió como respuesta a la necesidad de aplicar principios ágiles en empresas con cientos de equipos y proyectos interdependientes. SAFe proporcionó la estructura necesaria para coordinar la agilidad a escala sin perder velocidad.",
    tag: "Agile",
    fecha: "12 Jun 2024",
    autor: "Miguel Ángel Flores",
    imagen: "https://placehold.co/600x400",
    linkTexto: "Leer historia"
  }
];

const NOTICIAS_DATA = [
  {
    id: "noticia-1",
    titulo: "El 85% de las empresas Fortune 500 ya adoptaron metodologías ágiles en 2024",
    descripcion: "Un estudio reciente de Gartner revela que la adopción de marcos ágiles en grandes corporaciones alcanzó su punto más alto en la historia. Los sectores financiero y de salud lideran la transformación con implementaciones de SAFe y Scrum a escala.",
    tag: "Tendencia",
    fecha: "03 Jul 2024",
    autor: "Redacción TI",
    imagen: "https://placehold.co/600x400",
    linkTexto: "Leer noticia"
  },
  {
    id: "noticia-2",
    titulo: "GitHub Copilot integra asistencia para planificación de sprints en Scrum",
    descripcion: "GitHub anunció una nueva funcionalidad experimental que permite a los equipos Scrum usar inteligencia artificial para estimar story points y detectar dependencias entre tareas. La herramienta se integra directamente con GitHub Projects y Jira.",
    tag: "Herramienta",
    fecha: "19 Jul 2024",
    autor: "Elena Castillo",
    imagen: "https://placehold.co/600x400",
    linkTexto: "Leer noticia"
  },
  {
    id: "noticia-3",
    titulo: "Cumbre Mundial DevOps 2024: Los pipelines de CI/CD como ventaja competitiva",
    descripcion: "La Cumbre Mundial DevOps celebrada en Berlín reunió a más de 5.000 profesionales para debatir el futuro de la entrega continua. Los ponentes coincidieron en que la automatización del pipeline es ahora un diferenciador estratégico, no solo técnico.",
    tag: "Evento",
    fecha: "08 Ago 2024",
    autor: "Roberto Jiménez",
    imagen: "https://placehold.co/600x400",
    linkTexto: "Leer noticia"
  },
  {
    id: "noticia-4",
    titulo: "Informe: Kanban supera a Scrum en equipos de soporte y mantenimiento TI",
    descripcion: "Un análisis de State of Agile 2024 muestra que Kanban ha desplazado a Scrum como metodología preferida en equipos dedicados a operaciones y mantenimiento de sistemas. La flexibilidad del flujo continuo resulta más adecuada para trabajo no planificable.",
    tag: "Industria",
    fecha: "22 Ago 2024",
    autor: "Isabel Moreno",
    imagen: "https://placehold.co/600x400",
    linkTexto: "Leer noticia"
  },
  {
    id: "noticia-5",
    titulo: "La certificación PMP incorpora módulo obligatorio de metodologías ágiles",
    descripcion: "El Project Management Institute actualizó el examen de certificación PMP para incluir un bloque de 50 preguntas sobre marcos ágiles e híbridos. El cambio refleja la demanda del mercado de gestores de proyectos con competencias en Agile y Waterfall.",
    tag: "Tendencia",
    fecha: "10 Sep 2024",
    autor: "Fernando Díaz",
    imagen: "https://placehold.co/600x400",
    linkTexto: "Leer noticia"
  },
  {
    id: "noticia-6",
    titulo: "Lean IT reduce costos operativos en un 30% en el sector bancario europeo",
    descripcion: "Un consorcio de bancos europeos publicó los resultados de su programa de transformación Lean IT iniciado en 2022, reportando ahorros promedio del 30% en costos de operación de TI. La eliminación de procesos redundantes y la automatización fueron los factores clave.",
    tag: "Industria",
    fecha: "25 Sep 2024",
    autor: "Claudia Navarro",
    imagen: "https://placehold.co/600x400",
    linkTexto: "Leer noticia"
  }
];

const FAQ_DATA = [
  {
    id: "faq-1",
    pregunta: "¿Qué es Scrum y para qué tipo de proyectos es más adecuado?",
    respuesta: "Scrum es un marco ágil que organiza el trabajo en iteraciones cortas llamadas sprints, generalmente de 1 a 4 semanas. Es más adecuado para proyectos con requisitos cambiantes o poco definidos al inicio, donde la entrega incremental de valor y la retroalimentación continua del cliente son prioritarias."
  },
  {
    id: "faq-2",
    pregunta: "¿Cuál es la diferencia entre Agile y Waterfall?",
    respuesta: "Waterfall es un enfoque secuencial donde cada fase del proyecto debe completarse antes de iniciar la siguiente, lo que lo hace rígido ante cambios. Agile, en cambio, es un conjunto de principios que promueven la entrega iterativa e incremental, la colaboración continua con el cliente y la adaptación al cambio como ventaja competitiva."
  },
  {
    id: "faq-3",
    pregunta: "¿Qué diferencia a Kanban de Scrum?",
    respuesta: "Scrum trabaja con iteraciones de tiempo fijo (sprints) y roles definidos como Scrum Master y Product Owner, mientras que Kanban es un sistema de flujo continuo sin iteraciones ni roles prescritos. Kanban limita el trabajo en progreso mediante columnas en un tablero visual, siendo ideal para equipos con trabajo de entrada continua e impredecible."
  },
  {
    id: "faq-4",
    pregunta: "¿Qué significa DevOps y cuáles son sus prácticas principales?",
    respuesta: "DevOps es una cultura y conjunto de prácticas que busca unificar el desarrollo de software y las operaciones de TI para acortar el ciclo de vida del desarrollo. Sus prácticas principales incluyen integración continua (CI), entrega continua (CD), infraestructura como código (IaC), monitoreo continuo y una cultura de colaboración y responsabilidad compartida."
  },
  {
    id: "faq-5",
    pregunta: "¿Qué es SAFe y cuándo se recomienda su implementación?",
    respuesta: "SAFe (Scaled Agile Framework) es un conjunto de patrones organizacionales y de flujo de trabajo para implementar prácticas ágiles y lean a escala empresarial. Se recomienda cuando una organización tiene múltiples equipos ágiles que necesitan coordinarse para entregar soluciones complejas, típicamente en empresas con más de 50 personas involucradas en desarrollo de software."
  },
  {
    id: "faq-6",
    pregunta: "¿Cómo se aplica Lean IT en una organización de tecnología?",
    respuesta: "Lean IT aplica los principios del pensamiento Lean al departamento de TI, enfocándose en identificar y eliminar actividades que no generan valor para el cliente, como procesos manuales redundantes, tiempos de espera excesivos o retrabajo por falta de calidad. Su implementación comienza con el mapeo del flujo de valor (Value Stream Mapping) para visualizar dónde se pierde tiempo y recursos en los procesos tecnológicos."
  }
];

const SITE_CONTENT = {
  historias: HISTORIAS_DATA,
  noticias:  NOTICIAS_DATA,
  faq:       FAQ_DATA
};
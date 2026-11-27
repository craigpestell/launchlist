import type { Dictionary } from "./en";

/** Interface text in US Spanish (usted). Same keys as en.ts. */
const plural = (n: number, one: string, many = `${one}s`) =>
  `${n} ${n === 1 ? one : many}`;

export const es: Dictionary = {
  languageName: "Español",
  site: {
    title: "LaunchList: guías paso a paso para negocios y ayuda informática",
    description: (coverage: string) =>
      `Listas de verificación paso a paso para iniciar un negocio ${coverage}, y guías breves para tareas informáticas y de soporte comunes.`,
    and: "y",
  },
  header: {
    signIn: "Iniciar sesión",
    language: "Idioma",
    themeLight: "Cambiar al tema claro",
    themeDark: "Cambiar al tema oscuro",
  },
  home: {
    h1: "Guías paso a paso, una tarea a la vez",
    intro: (coverage: string) =>
      `Listas de verificación para iniciar y administrar un negocio ${coverage}, y guías breves para las tareas informáticas que un sitio web o un equipo de soporte le puede pedir. Cada paso tiene una guía con capturas de pantalla, y puede marcar las tareas a medida que avanza.`,
    sectionsLabel: "Secciones de las guías",
    start: "Iniciar un negocio",
    startBlurb: (n: number, units: string) => `Listas para ${n} ${units}`,
    run: "Administrar su negocio",
    runBlurb: "Productos de su tienda en línea",
    runIntro: "Configure las herramientas que su negocio necesita, esté donde esté.",
    help: "Ayuda rápida",
    helpBlurb: "Tareas informáticas y de soporte comunes",
    helpIntro:
      "Guías breves para cuando un sitio web o un equipo de soporte le pide hacer algo en su computadora o su teléfono.",
    startIn: (inCountry: string) => `Iniciar un negocio ${inCountry}`,
    startIntro: (unit: string) =>
      `Registre su negocio, inscríbase en las cuentas de impuestos y obtenga las licencias que necesita. Las reglas cambian según los ${unit}, así que elija dónde tendrá su negocio.`,
    soon: "Próximamente",
    soonIntro: "Otras guías de negocios que estamos preparando a partir de fuentes oficiales del gobierno.",
    upcoming: [
      {
        title: "Contratar a su primer empleado",
        summary:
          "Cuentas de nómina, seguro de compensación para trabajadores, normas laborales y registros de empleo.",
      },
      {
        title: "Vender en otros estados",
        summary: "Cuándo cobrar el impuesto sobre las ventas a clientes fuera de su estado.",
      },
      {
        title: "Administrar un negocio desde casa",
        summary: "Licencias municipales para negocios en casa, zonificación y seguros.",
      },
      {
        title: "Vender alimentos, alcohol o cannabis",
        summary: "Permisos de seguridad alimentaria y las licencias adicionales de los productos regulados.",
      },
    ],
    soonMore: (n: number, unit: string) => `Próximamente: ${n} ${unit} más`,
  },
  map: {
    label: (inCountry: string, unit: string) =>
      `Mapa de ${inCountry.replace(/^en /, "")} que muestra los ${unit} con guía`,
    comingSoon: (name: string) => `${name}: próximamente`,
    available: "Guía disponible (seleccione para abrirla)",
    soon: "Próximamente",
  },
  region: {
    back: "Elegir otra región",
    h1: (inRegion: string) => `Cómo iniciar un negocio ${inRegion}`,
    intro: (inRegion: string, steps: number) =>
      `Todo lo que necesita para registrar y abrir una pequeña tienda o una tienda en línea ${inRegion}, en orden: ${steps} pasos, desde elegir un nombre hasta hacer su primer pedido de inventario, cada uno con enlaces a los sitios oficiales. Avance a su propio ritmo. Su progreso se guarda en este navegador, o en su cuenta si inicia sesión.`,
    allSteps: (name: string) => `Todos los pasos (${name})`,
    guideLabel: (inRegion: string) => `Iniciar un negocio ${inRegion}`,
  },
  topic: {
    back: "Todas las guías",
    intro:
      "Avance a su propio ritmo. Su progreso se guarda en este navegador, o en su cuenta si inicia sesión.",
  },
  step: {
    of: (n: number, total: number) => `Paso ${n} de ${total}`,
    ref: "paso",
    time: "Tiempo",
    cost: "Costo",
    officialSite: "Sitio oficial",
    checklist: "Su lista",
    saveDetails: (what: string) => `Guardar sus datos (${what}, en inglés)`,
    backToOverview: "Volver al resumen",
  },
  progress: {
    done: (completed: number, total: number) =>
      `${completed} de ${total} tareas ${total === 1 ? "terminada" : "terminadas"}`,
    overall: "Progreso general",
    percent: (n: number) => `${n}%`,
    completed: "Terminado",
    step: (n: number) => `Paso ${n}`,
    tasks: (done: number, total: number) => `${done}/${total} tareas`,
    reset: "Restablecer el progreso",
    resetConfirm: "¿Borrar todo el progreso guardado en este dispositivo?",
  },
  signup: {
    savedNow: "Su progreso se guarda solo en este navegador.",
    saved: "El progreso se guarda solo en este navegador.",
    signIn: "Inicie sesión para conservarlo en todos sus dispositivos",
    optional: ". Es opcional.",
  },
  shots: {
    open: "Guía paso a paso",
    title: (step: string) => `${step}: guía paso a paso`,
    note: "Las capturas de pantalla muestran un negocio ficticio y las páginas en inglés. Los sitios oficiales cambian, así que el suyo puede verse un poco diferente.",
    close: "Cerrar la guía",
    captured: (date: string) => `Capturas de pantalla tomadas el ${date}.`,
    report: "¿Ve algo diferente? Informe un problema",
  },
  footer: {
    label: "Pie de página",
    guides: (n: number) => plural(n, "guía"),
    allGuides: (n: number) => `Las ${plural(n, "guía")}`,
    site: "LaunchList",
    home: "Inicio",
    account: "Su cuenta (en inglés)",
    privacy: "Privacidad (en inglés)",
    disclaimer:
      "Información general, no asesoría legal ni contable. Las reglas y las tarifas cambian, así que confirme los detalles en cada sitio oficial.",
  },
  translation: {
    notice:
      "Esta página es una traducción del inglés. Los enlaces llevan a la versión en español de los sitios oficiales cuando existe. Si hay alguna diferencia, el sitio oficial es el que vale.",
    stale:
      "La versión en inglés de esta página se actualizó después de esta traducción. Revísela para ver los últimos cambios.",
    english: "Leer en inglés",
  },
  install: {
    title: "Agregue LaunchList a su teléfono",
    prompt: "Abra su lista desde la pantalla de inicio, como una aplicación.",
    iosShare: "Toque el botón Compartir",
    iosShareEnd: "en la barra de herramientas del navegador.",
    iosAdd: "Desplácese hacia abajo y toque",
    iosAddLabel: "Agregar a inicio",
    iosConfirm: "Toque",
    iosConfirmLabel: "Agregar",
    androidMenu: "Abra el menú del navegador",
    androidInstall: "Toque",
    androidInstallLabel: "Instalar aplicación",
    androidOr: "o",
    androidHomeLabel: "Agregar a la pantalla principal",
    dismiss: "Cerrar las instrucciones de instalación",
    notNow: "Ahora no",
    install: "Instalar",
  },
  seo: {
    regionTitle: (inRegion: string) =>
      `Cómo iniciar un negocio ${inRegion}: lista de verificación paso a paso`,
    regionDescription: (inRegion: string, steps: number, names: string) =>
      `Lista gratuita de ${steps} pasos para iniciar un negocio ${inRegion}: ${names} y más, con capturas de pantalla de cada sitio oficial.`,
    regionKeywords: (name: string) => [
      `iniciar un negocio ${name}`,
      `registrar un negocio ${name}`,
      `registro de negocios ${name}`,
      `lista de verificación pequeña empresa ${name}`,
    ],
    stepTitle: (title: string, inRegion: string) => `${title} ${inRegion}`,
    regionCrumb: (inRegion: string) => `Iniciar un negocio ${inRegion}`,
  },
};

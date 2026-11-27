import type { Dictionary } from "./en";

/** Interface text in Canadian French. Same keys as en.ts. */
const nb = " ";
const plural = (n: number, one: string, many = `${one}s`) =>
  `${n} ${n === 1 ? one : many}`;

export const fr: Dictionary = {
  languageName: "Français",
  site: {
    title: `LaunchList${nb}: guides pas à pas pour les entreprises et l'aide informatique`,
    description: (coverage: string) =>
      `Des listes de vérification pas à pas pour démarrer une entreprise ${coverage}, et de courts guides pour les tâches informatiques et de soutien courantes.`,
    and: "et",
  },
  header: {
    signIn: "Se connecter",
    language: "Langue",
    themeLight: "Passer au thème clair",
    themeDark: "Passer au thème sombre",
  },
  home: {
    h1: "Des guides pas à pas, une tâche à la fois",
    intro: (coverage: string) =>
      `Des listes de vérification pour démarrer et gérer une entreprise ${coverage}, et de courts guides pour les tâches informatiques qu'un site Web ou un service de soutien peut vous demander. Chaque étape a un guide illustré de captures d'écran, et vous pouvez cocher les tâches au fur et à mesure.`,
    sectionsLabel: "Sections des guides",
    start: "Démarrer une entreprise",
    startBlurb: (n: number, units: string) => `Listes pour ${n} ${units}`,
    run: "Gérer votre entreprise",
    runBlurb: "Numéro de téléphone, paiements et produits",
    runIntro: "Mettez en place les outils dont votre entreprise a besoin, où qu'elle soit.",
    help: "Aide rapide",
    helpBlurb: "Tâches informatiques et de soutien courantes",
    helpIntro:
      "De courts guides pour les moments où un site Web ou un service de soutien vous demande de faire quelque chose sur votre ordinateur ou votre téléphone.",
    startIn: (inCountry: string) => `Démarrer une entreprise ${inCountry}`,
    startIntro: (unit: string) =>
      `Enregistrez votre entreprise, inscrivez-vous aux comptes fiscaux et obtenez les permis nécessaires. Les règles diffèrent selon les ${unit}, alors choisissez l'endroit où votre entreprise sera établie.`,
    soon: "À venir",
    soonIntro:
      "D'autres guides d'affaires que nous préparons à partir de sources gouvernementales officielles.",
    upcoming: [
      {
        title: "Embaucher votre premier employé",
        summary:
          "Compte de retenues sur la paie auprès de l'ARC, indemnisation des accidents du travail, normes du travail et relevés d'emploi.",
      },
      {
        title: "Vendre dans d'autres provinces",
        summary:
          "Quand percevoir la TPS/TVH, la TVP ou la TVQ pour des clients hors de votre province.",
      },
      {
        title: "Exploiter une entreprise à domicile",
        summary: "Permis municipaux d'entreprise à domicile, zonage et assurance.",
      },
      {
        title: "Vendre des aliments, de l'alcool ou du cannabis",
        summary:
          "Permis de salubrité alimentaire et licences supplémentaires pour les produits réglementés.",
      },
    ],
    soonMore: (n: number, unit: string) => `À venir${nb}: ${n} autres ${unit}`,
  },
  map: {
    label: (inCountry: string, unit: string) =>
      `Carte ${inCountry.replace(/^au /, "du ").replace(/^en /, "de ")} indiquant les ${unit} qui ont un guide`,
    comingSoon: (name: string) => `${name}${nb}: à venir`,
    available: "Guide offert (sélectionnez pour l'ouvrir)",
    soon: "À venir",
  },
  region: {
    back: "Choisir une autre région",
    h1: (inRegion: string) => `Comment démarrer une entreprise ${inRegion}`,
    intro: (inRegion: string, steps: number) =>
      `Tout ce qu'il faut pour enregistrer et lancer un petit commerce de détail ou une boutique en ligne ${inRegion}, dans l'ordre${nb}: ${steps} étapes, du choix d'un nom à votre première commande de stock, chacune avec des liens vers les sites officiels. Avancez à votre rythme. Votre progression est enregistrée dans ce navigateur, ou dans votre compte si vous vous connectez.`,
    allSteps: (name: string) => `Toutes les étapes (${name})`,
    guideLabel: (inRegion: string) => `Démarrer une entreprise ${inRegion}`,
  },
  topic: {
    back: "Tous les guides",
    intro:
      "Avancez à votre rythme. Votre progression est enregistrée dans ce navigateur, ou dans votre compte si vous vous connectez.",
  },
  step: {
    of: (n: number, total: number) => `Étape ${n} sur ${total}`,
    ref: "étape",
    time: "Durée",
    cost: "Coût",
    officialSite: "Site officiel",
    checklist: "Votre liste",
    saveDetails: (what: string) => `Enregistrer vos renseignements (${what}, en anglais)`,
    backToOverview: "Retour à l'aperçu",
  },
  progress: {
    done: (completed: number, total: number) =>
      `${completed} tâche${completed > 1 ? "s" : ""} sur ${total} terminée${completed > 1 ? "s" : ""}`,
    overall: "Progression globale",
    completed: "Terminée",
    step: (n: number) => `Étape ${n}`,
    tasks: (done: number, total: number) => `${done}/${total} tâches`,
    reset: "Réinitialiser la progression",
    resetConfirm: "Effacer toute la progression enregistrée sur cet appareil?",
  },
  signup: {
    savedNow: "Votre progression est enregistrée dans ce navigateur seulement.",
    saved: "La progression est enregistrée dans ce navigateur seulement.",
    signIn: "Connectez-vous pour la retrouver sur tous vos appareils",
    optional: ". C'est facultatif.",
  },
  shots: {
    open: "Guide pas à pas",
    title: (step: string) => `${step}${nb}: guide pas à pas`,
    note: "Les captures d'écran montrent une entreprise fictive et les pages en anglais. Les sites officiels changent, alors le vôtre peut être un peu différent.",
    close: "Fermer le guide",
    captured: (date: string) => `Captures d'écran prises le ${date}.`,
    report: "Vous voyez une différence? Signalez un problème",
  },
  footer: {
    label: "Pied de page",
    guides: (n: number) => plural(n, "guide"),
    allGuides: (n: number) => `Les ${plural(n, "guide")}`,
    site: "LaunchList",
    home: "Accueil",
    account: "Votre compte (en anglais)",
    privacy: "Confidentialité (en anglais)",
    disclaimer:
      "Renseignements généraux, et non des conseils juridiques ou comptables. Les règles et les frais changent, alors vérifiez les détails sur chaque site officiel.",
  },
  translation: {
    notice:
      "Cette page est traduite de l'anglais. Les liens mènent à la version française des sites officiels lorsqu'elle existe. En cas de différence, le site officiel fait foi.",
    stale:
      "La version anglaise de cette page a été mise à jour depuis cette traduction. Vérifiez-la pour les derniers changements.",
    english: "Lire en anglais",
  },
  install: {
    title: "Ajouter LaunchList à votre téléphone",
    prompt: "Ouvrez votre liste depuis l'écran d'accueil, comme une application.",
    iosShare: "Touchez le bouton Partager",
    iosShareEnd: "dans la barre d'outils du navigateur.",
    iosAdd: "Faites défiler et touchez",
    iosAddLabel: "Sur l'écran d'accueil",
    iosConfirm: "Touchez",
    iosConfirmLabel: "Ajouter",
    androidMenu: "Ouvrez le menu du navigateur",
    androidInstall: "Touchez",
    androidInstallLabel: "Installer l'application",
    androidOr: "ou",
    androidHomeLabel: "Ajouter à l'écran d'accueil",
    dismiss: "Fermer les instructions d'installation",
    notNow: "Pas maintenant",
    install: "Installer",
  },
  seo: {
    regionTitle: (inRegion: string) =>
      `Comment démarrer une entreprise ${inRegion}${nb}: liste de vérification pas à pas`,
    regionDescription: (inRegion: string, steps: number, names: string) =>
      `Liste gratuite en ${steps} étapes pour démarrer une entreprise ${inRegion}${nb}: ${names} et plus, avec des captures d'écran de chaque site officiel.`,
    regionKeywords: (name: string) => [
      `démarrer une entreprise ${name}`,
      `enregistrer une entreprise ${name}`,
      `enregistrement d'entreprise ${name}`,
      `liste de vérification petite entreprise ${name}`,
    ],
    stepTitle: (title: string, inRegion: string) => `${title} ${inRegion}`,
    regionCrumb: (inRegion: string) => `Démarrer une entreprise ${inRegion}`,
  },
};

/**
 * Interface text in English. Every language has a file like this with the
 * same keys (TypeScript checks it); guide content is translated separately in
 * content/translations/<locale>/. Functions take the words that change, such
 * as a region's name ("Ontario") or its name after "in" ("in Ontario").
 */
const plural = (n: number, one: string, many = `${one}s`) =>
  `${n} ${n === 1 ? one : many}`;

export const en = {
  languageName: "English",
  site: {
    title: "LaunchList: Step-by-step business and help guides",
    description: (coverage: string) =>
      `Step-by-step checklists for starting a business ${coverage}, plus quick how-tos for everyday tech and support tasks.`,
    and: "and",
  },
  header: {
    signIn: "Sign in",
    language: "Language",
    themeLight: "Switch to light theme",
    themeDark: "Switch to dark theme",
  },
  home: {
    h1: "Step-by-step guides, one task at a time",
    intro: (coverage: string) =>
      `Checklists for starting and running a business ${coverage}, plus quick how-tos for the tech tasks a website or support team might ask of you. Each step has a guide with screenshots, and you can tick tasks off as you go.`,
    sectionsLabel: "Guide sections",
    start: "Start a business",
    startBlurb: (n: number, units: string) => `Checklists for ${n} ${units}`,
    run: "Run your business",
    runBlurb: "Phone number, payments and products",
    runIntro: "Set up the tools your business needs, wherever it is based.",
    help: "Quick help",
    helpBlurb: "Everyday tech and support tasks",
    helpIntro:
      "Short how-tos for when a website or support team asks you to do something on your computer or phone.",
    startIn: (inCountry: string) => `Start a business ${inCountry}`,
    startIntro: (unit: string) =>
      `Register your business, sign up for tax accounts and get the licences you need. Rules differ across ${unit}, so choose where your business will be based.`,
    soon: "Coming soon",
    soonIntro:
      "We research each business guide from official government sources and add it when it is ready.",
    upcoming: [
      {
        title: "Hiring your first employee",
        summary:
          "Payroll account with CRA, workers' compensation, employment standards and records of employment.",
      },
      {
        title: "Selling to other provinces",
        summary:
          "When to collect GST/HST, PST or QST for customers outside your home province.",
      },
      {
        title: "Running a home-based business",
        summary: "Municipal home business licences, zoning and insurance.",
      },
      {
        title: "Selling food, liquor or cannabis",
        summary: "Food safety permits and the extra licences regulated products need.",
      },
    ],
    soonIn: (country: string, unit: string) => `${country}: ${unit}`,
  },
  map: {
    label: (inCountry: string, unit: string) =>
      `Map of ${inCountry.replace(/^in /, "")} showing which ${unit} have a guide`,
    comingSoon: (name: string) => `${name}: coming soon`,
    available: "Guide available (select to open)",
    soon: "Coming soon",
  },
  region: {
    back: "Choose a different region",
    h1: (inRegion: string) => `How to start a business ${inRegion}`,
    intro: (inRegion: string, steps: number) =>
      `Everything you need to register and launch a small retail business or online store ${inRegion}, in order: ${steps} steps from choosing a name to placing your first stock order, each with links to the official sites. Work through them at your own pace. Your progress is saved in this browser, or to your account if you sign in.`,
    allSteps: (name: string) => `All ${name} steps`,
    guideLabel: (inRegion: string) => `Start a business ${inRegion}`,
  },
  topic: {
    back: "All guides",
    intro:
      "Work through the steps at your own pace. Your progress is saved in this browser, or to your account if you sign in.",
  },
  step: {
    of: (n: number, total: number) => `Step ${n} of ${total}`,
    ref: "step",
    time: "Time",
    cost: "Cost",
    officialSite: "Official site",
    checklist: "Your checklist",
    saveDetails: (what: string) => `Save your ${what}`,
    backToOverview: "Back to overview",
  },
  progress: {
    done: (completed: number, total: number) => `${completed} of ${total} tasks done`,
    overall: "Overall progress",
    completed: "Completed",
    step: (n: number) => `Step ${n}`,
    tasks: (done: number, total: number) => `${done}/${total} tasks`,
    reset: "Reset progress",
    resetConfirm: "Clear all saved progress on this device?",
  },
  signup: {
    savedNow: "Your progress is saved in this browser only.",
    saved: "Progress is saved in this browser only.",
    signIn: "Sign in to keep it across devices",
    optional: ". It's optional.",
  },
  shots: {
    open: "Step-by-step guide",
    title: (step: string) => `${step}: step-by-step guide`,
    note: "Screenshots use a made-up example business. Official sites change, so yours may look slightly different.",
    close: "Close guide",
    captured: (date: string) => `Screenshots captured ${date}.`,
    report: "See something different? Report a problem",
  },
  footer: {
    label: "Footer",
    guides: (n: number) => plural(n, "guide"),
    allGuides: (n: number) => `All ${plural(n, "guide")}`,
    site: "LaunchList",
    home: "Home",
    account: "Your account",
    privacy: "Privacy",
    disclaimer:
      "General guidance, not legal or accounting advice. Rules and fees change, so confirm details on each official site.",
  },
  translation: {
    notice: "",
    stale: "",
    english: "",
  },
  install: {
    title: "Add LaunchList to your phone",
    prompt: "Open your checklist from your home screen like an app.",
    iosShare: "Tap the Share button",
    iosShareEnd: "in the browser toolbar.",
    iosAdd: "Scroll down and tap",
    iosAddLabel: "Add to Home Screen",
    iosConfirm: "Tap",
    iosConfirmLabel: "Add",
    androidMenu: "Open the browser menu",
    androidInstall: "Tap",
    androidInstallLabel: "Install app",
    androidOr: "or",
    androidHomeLabel: "Add to Home screen",
    dismiss: "Dismiss install instructions",
    notNow: "Not now",
    install: "Install",
  },
  seo: {
    regionTitle: (inRegion: string) =>
      `How to start a business ${inRegion}: step-by-step checklist`,
    regionDescription: (inRegion: string, steps: number, names: string) =>
      `Free ${steps}-step checklist to start a business ${inRegion}: ${names} and more, with screenshots of each official site.`,
    regionKeywords: (name: string) => [
      `start a business in ${name}`,
      `register a business in ${name}`,
      `${name} business registration`,
      `${name} small business checklist`,
    ],
    /** Region step page title: "Register for HST in Ontario". */
    stepTitle: (title: string, inRegion: string) => `${title} ${inRegion}`,
    regionCrumb: (inRegion: string) => `Start a business ${inRegion}`,
  },
};

export type Dictionary = typeof en;

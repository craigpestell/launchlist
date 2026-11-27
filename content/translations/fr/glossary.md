# French (Canada) glossary

Terms the French guides must use, so every guide says the same thing the same way. Use the official French name a government body uses for itself and its programs; if a body has no official French name (many provincial registries outside Quebec, New Brunswick and Ontario), keep the English name and add a French gloss the first time: "BC Registry (registre des entreprises de la Colombie-Britannique)".

Wording and typography rules for every language live in the `writing-style` skill (`.claude/skills/writing-style/SKILL.md`) once it lands; until then the short version is below. Add a term here whenever you settle on one.

## Style, in short

- Canadian French (Office québécois de la langue française and the federal Bureau de la traduction), addressed as **vous**.
- Titles and checklist items start with an infinitive verb, sentence case: "Choisir une structure et un nom d'entreprise", "Ouvrir un compte bancaire d'entreprise".
- Non-breaking space before ":" and "%", inside « », between a number and "$" (which follows it: "30 000 $", "41 $ par année"), and as the thousands separator. No space before ; ? ! (Canadian usage). `npm run translations -- stamp` fixes the spacing for you.
- Decimals use a comma: "9,975 %". Times use 24 hours: "9 h 30", "17 h".
- Ranges: "1 à 2 heures", "20 à 30 minutes", "0 à 30 $ par mois".
- No em dashes (same rule as English). Keep the bold on the same fact as the English.
- Keep `{step:<slug>}` and `{region}` tokens exactly; they become "étape 4" and the region's name. Use `{in-region}` where French needs the region with its preposition ("au Québec", "en Ontario", "à l'Île-du-Prince-Édouard"), so never write "en {region}".
- Brand and product names stay as they are (Shopify, Square, Stripe, PayPal, WooCommerce, Ko-fi, TextNow, Fongo Works, Gravatar, WhatIsMyIP.com). Button and menu labels on a site that has no French interface stay in English, in quotes, followed by a French gloss in parentheses the first time: "Add to cart" (Ajouter au panier). If the site has a French interface, use its French label only when you are sure of it; otherwise keep the English label.

## Terms

| English | French (Canada) | Notes |
|---|---|---|
| Canada Revenue Agency (CRA) | Agence du revenu du Canada (ARC) | |
| Revenu Québec | Revenu Québec | |
| CRA account / My Business Account | compte de l'ARC / Mon dossier d'entreprise | |
| Business Registration Online (BRO) | Inscription en direct des entreprises (IDE) | |
| Business Number (BN) | numéro d'entreprise (NE) | |
| program account | compte de programme | |
| GST | TPS (taxe sur les produits et services) | |
| HST | TVH (taxe de vente harmonisée) | |
| GST/HST | TPS/TVH | |
| QST | TVQ (taxe de vente du Québec) | |
| PST (BC, Saskatchewan) | TVP (taxe de vente provinciale) | |
| RST (Manitoba) | TVD (taxe sur les ventes au détail) | Manitoba's French name; confirm against the Manitoba French page if one is linked |
| input tax credit (ITC) | crédit de taxe sur les intrants (CTI) | |
| small supplier | petit fournisseur | |
| register for (a tax) | s'inscrire à (la TPS) | |
| registrant | inscrit | |
| filing period / frequency | période de déclaration / fréquence de production | |
| file a return | produire une déclaration | |
| sole proprietorship | entreprise individuelle | |
| sole proprietor | propriétaire unique / travailleur autonome | |
| partnership | société de personnes | |
| corporation / incorporate | société par actions / constituer une société | |
| business name / trade name | nom commercial | |
| register a business name | enregistrer un nom commercial | Quebec: s'immatriculer auprès du Registraire des entreprises |
| Registraire des entreprises (Quebec) | Registraire des entreprises | |
| Quebec enterprise number (NEQ) | numéro d'entreprise du Québec (NEQ) | |
| clicSÉQUR | clicSÉQUR | |
| declaration of registration | déclaration d'immatriculation | |
| annual updating declaration | déclaration de mise à jour annuelle | |
| Ontario Business Registry | Registre des entreprises de l'Ontario | |
| Service New Brunswick | Services Nouveau-Brunswick | |
| Corporate Registry (NB) | Registre corporatif | |
| municipal business licence | permis d'affaires municipal | "licence" in English guides |
| home-based business | entreprise à domicile | |
| zoning | zonage | |
| general liability insurance | assurance responsabilité civile générale | |
| product liability insurance | assurance responsabilité du fait des produits | |
| business bank account | compte bancaire d'entreprise | |
| bookkeeping | tenue de livres | |
| receipts | reçus | |
| income tax return (T1) | déclaration de revenus (T1) | |
| instalments | acomptes provisionnels | |
| payment processor | processeur de paiement | |
| chargeback | rétrofacturation | |
| privacy policy | politique de confidentialité | |
| terms of service | conditions d'utilisation | |
| refund policy | politique de remboursement | |
| PIPEDA | LPRPDE (Loi sur la protection des renseignements personnels et les documents électroniques) | |
| Quebec Law 25 | Loi 25 | |
| Canada Consumer Product Safety Act | Loi canadienne sur la sécurité des produits de consommation | |
| Health Canada | Santé Canada | |
| bilingual labelling | étiquetage bilingue | |
| Consumer Packaging and Labelling Act | Loi sur l'emballage et l'étiquetage des produits de consommation | |
| supplier / wholesale account | fournisseur / compte de grossiste | |
| resale | revente | |
| checklist | liste de vérification | the UI says "Votre liste" |
| step | étape | |
| email | courriel | |
| website | site Web | |
| online store | boutique en ligne | |
| browser | navigateur | |
| cache and cookies | cache et témoins (cookies) | "témoins" first, "cookies" in parentheses once |
| pop-up | fenêtre contextuelle | |
| ad blocker | bloqueur de publicités | |
| two-factor authentication | authentification à deux facteurs | |
| authenticator app | application d'authentification | |
| IP address | adresse IP | |
| screenshot | capture d'écran | |
| DNS record | enregistrement DNS | |
| domain name | nom de domaine | |
| password reset | réinitialisation du mot de passe | |
| spam / junk folder | dossier des courriels indésirables | |
| Free (cost) | Gratuit | |
| Varies (cost) | Variable | |
| seen October 2026; confirm current fee | vu en octobre 2026; vérifiez le tarif en vigueur | |

---
source: fbee0aa165bc
title: Faire pointer votre domaine vers votre site Web
summary: Votre domaine et votre site Web sont souvent chez des entreprises différentes, et les enregistrements DNS les relient.
time: 15 minutes, plus jusqu'à 48 heures pour que le changement prenne effet
cost: Gratuit
checklist:
  - Vous connecter chez votre hébergeur et trouver sa page de connexion de domaine ou de domaine personnalisé
  - Noter les enregistrements DNS demandés, ou utiliser son option de connexion automatique s'il en offre une
  - Vous connecter là où vous avez acheté votre domaine et ouvrir ses paramètres DNS
  - Ajouter ou modifier seulement les enregistrements indiqués par l'hébergeur, sans toucher à ceux du courriel
  - Attendre que le changement se propage, puis ouvrir votre domaine pour vérifier que le site s'affiche
  - Noter les anciennes valeurs au cas où vous devriez revenir en arrière
---

## Commencer chez votre hébergeur

Votre hébergeur est l'entreprise qui fait fonctionner votre site, comme Shopify, Squarespace, Wix ou une entreprise d'hébergement Web. Connectez-vous et cherchez **Domaines**, **Connecter un domaine** ou **Domaine personnalisé** (en anglais, **Domains**, **Connect a domain** ou **Custom domain**). Beaucoup d'hébergeurs peuvent connecter le domaine pour vous une fois que vous vous êtes connecté, depuis leur site, à l'entreprise qui gère votre domaine. Si le vôtre le permet, utilisez cette option et passez à la dernière section.

Sinon, l'hébergeur affiche les enregistrements à ajouter. Ils ressemblent habituellement à ceci (les valeurs sont des exemples) :

- Un **enregistrement A** pour `@` (le domaine seul) qui pointe vers une adresse comme `203.0.113.10`
- Un **enregistrement CNAME** pour `www` qui pointe vers un nom d'hôte comme `shops.example.net`

## Ouvrir les paramètres DNS de votre domaine

Connectez-vous à l'entreprise où vous avez acheté ou renouvelez votre domaine (votre registraire), comme GoDaddy, Namecheap, Cloudflare ou un registraire canadien. Ouvrez le domaine, puis **DNS**, **Enregistrements DNS** ou **Gérer les DNS** (en anglais, **DNS records** ou **Manage DNS**). Si vous ne savez pas qui est votre registraire, cherchez dans vos courriels l'avis de renouvellement du domaine. Les sites des registraires fonctionnent aussi dans le navigateur d'un téléphone, mais un ordinateur facilite la copie des valeurs.

## Ajouter les enregistrements

Remplacez la valeur de l'enregistrement A existant pour `@` par l'adresse fournie par votre hébergeur, ou ajoutez-en un s'il n'y en a pas. Faites de même pour le CNAME `www`. Copiez les valeurs exactement, sans espace en trop. Certains registraires affichent `@` sous la forme de votre nom de domaine ou d'un champ d'hôte vide. **Ne supprimez pas les enregistrements MX ou TXT** : ce sont eux qui font fonctionner votre courriel et d'autres services. Avant de modifier quoi que ce soit, notez les anciennes valeurs ou faites-en une capture d'écran.

Certains hébergeurs vous demandent plutôt de changer les **serveurs de noms** du domaine au lieu d'ajouter des enregistrements. Cela transfère tous vos DNS chez l'hébergeur, y compris les paramètres de courriel; vérifiez donc d'abord que vos enregistrements de courriel ont été recopiés.

## Attendre et vérifier

Les changements fonctionnent habituellement en moins d'une heure, mais peuvent prendre jusqu'à 48 heures. Ouvrez votre domaine dans une fenêtre de navigation privée pour vérifier. Le cadenas de sécurité (HTTPS) peut prendre un peu plus de temps, car l'hébergeur le met en place après avoir vu les nouveaux enregistrements. Si le site ne s'affiche toujours pas après une journée, comparez chaque enregistrement avec ce que votre hébergeur a demandé, puis communiquez avec le soutien de votre hébergeur en joignant une capture d'écran de vos paramètres DNS.

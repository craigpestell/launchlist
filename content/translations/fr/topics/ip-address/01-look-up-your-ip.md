---
source: 2b64b8b85659
title: "Trouver et communiquer votre adresse IP"
summary: "Trouvez les adresses publiques qu'un site ou un service voit pour votre ordinateur, puis envoyez-les à qui les demande."
time: 5 minutes
cost: "Gratuit"
linkLabel: "WhatIsMyIP.com"
linkUrl: https://www.whatismyip.com/
checklist:
  - "Désactiver votre RPV (VPN), sauf si on vous a demandé l'adresse du RPV"
  - "Cliquer sur le bouton WhatIsMyIP.com ci-dessus, ou aller à www.whatismyip.com, sur l'ordinateur à connecter"
  - "Cliquer sur « Copy » (copier) à côté de l'adresse IPv4, et de l'adresse IPv6 si la page en affiche une"
  - "Envoyer les adresses au fournisseur exactement comme vous les avez copiées"
  - "Préciser l'ordinateur et la connexion d'où elles viennent, comme le serveur du bureau ou le Wi-Fi à la maison"
  - "Vérifier de nouveau les adresses si un réglage qui les utilisait cesse de fonctionner"
---
## Ouvrir WhatIsMyIP.com

Cliquez sur le bouton **WhatIsMyIP.com** ci-dessus, ou tapez www.whatismyip.com dans votre navigateur. Faites-le sur **l'ordinateur qui se connectera au service**. La page affiche tout de suite votre adresse IP publique, sans inscription.

Votre adresse IP publique est celle que voient les sites Web et les services. Elle appartient à la connexion Internet : tous les appareils branchés sur le même Wi-Fi affichent donc habituellement la même. Si un script d'importation ou une application tourne sur un ordinateur du bureau ou sur un serveur infonuagique, c'est son adresse qu'il faut envoyer, pas celle de votre portable à la maison.

## IPv4 ou IPv6

Une adresse IPv4 est formée de quatre nombres séparés par des points, comme 203.0.113.25. Une adresse IPv6 est plus longue et contient des lettres, des chiffres et des deux-points, comme 2001:db8::25. **Si vous voyez les deux, envoyez les deux.** Bien des services se connectent en IPv6 dès que votre connexion le permet, alors n'autoriser que l'adresse IPv4 peut bloquer votre accès. Si la page n'affiche qu'une ligne, envoyez celle-là. Utilisez le bouton « Copy » (copier) : cliquer sur l'adresse elle-même ouvre plutôt une page de recherche.

## Pas de navigateur sur l'ordinateur

Les serveurs n'ont souvent pas de navigateur. Exécutez `curl https://ifconfig.me` pour afficher l'adresse IPv4, et `curl -6 https://ifconfig.me` pour l'adresse IPv6. Si la deuxième commande échoue, l'ordinateur n'a pas d'IPv6. Dans Windows PowerShell, tapez `curl.exe` au lieu de `curl`.

## Quand l'adresse change

La plupart des forfaits résidentiels et pour petites entreprises ont une **adresse dynamique**, qui peut changer quand le modem redémarre. Sur les données cellulaires, et chez certains fournisseurs, de nombreux clients partagent une même adresse IPv4 qui change souvent (NAT de niveau opérateur, ou « carrier-grade NAT »), alors une liste d'autorisation fondée sur cette adresse peut cesser de fonctionner sans avertissement. Pour un ordinateur qui doit rester autorisé, utilisez une connexion d'affaires filaire avec une adresse statique, ou demandez au service ce qu'il accepte d'autre.

## À qui la communiquer

Communiquez les adresses à l'hébergeur Web, au fournisseur, au fournisseur de services de paiement ou à l'équipe de soutien qui les a demandées, pas dans une publication publique. Une adresse IP révèle votre région approximative et votre fournisseur Internet, mais pas votre nom ni votre adresse civique. La ville et le code postal qu'affiche WhatIsMyIP.com sont des estimations, souvent une ville voisine.

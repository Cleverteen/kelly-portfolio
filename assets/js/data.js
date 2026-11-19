/* ==========================================================================
   CONTENU DU PORTFOLIO — Mobengo G'bama Kelly
   --------------------------------------------------------------------------
   Ce fichier est le SEUL endroit à modifier pour ajouter des réalisations,
   des photos ou des vidéos. Le site se met à jour automatiquement.
   Règle : uniquement des informations confirmées par Kelly ou ses documents.
   ========================================================================== */

window.PORTFOLIO = {
  /* --- Formulaire de contact -------------------------------------------
     Envoi réel via FormSubmit (https://formsubmit.co), sans serveur.
     Au premier envoi, FormSubmit envoie un e-mail d'activation à l'adresse
     ci-dessous : il faut cliquer sur le lien une seule fois.               */
  contactEmail: "mobengokelly69@gmail.com",

  /* --- Réalisations (source : CV, rubrique « Projets et réalisations ») --
     category : "web" | "projet" | "design"
     cover    : visuel graphique utilisé tant qu'aucune image n'est fournie
     screen   : capture d'écran mobile (verticale) affichée dans un cadre de téléphone
     images   : visuels agrandissables, ex. "assets/img/projets/menu-1.jpg"
     video    : optionnel, ex. "assets/video/menu-demo.mp4"
     link     : optionnel, URL publique du projet                           */
  projects: [
    {
      id: "menu-digital",
      title: "Menu digital de restaurant",
      category: "web",
      categoryLabel: "Développement web",
      cover: "menu",
      summary:
        "Création d’un menu numérique en HTML et CSS : organisation et présentation des produits sur une interface web.",
      details: [
        "Organisation des produits du restaurant en rubriques lisibles.",
        "Présentation des produits sur une interface web consultable en ligne."
      ],
      tools: ["HTML", "CSS"],
      screen: "assets/img/projets/dfc-food-menu.jpg",
      screenAlt: "Interface mobile du menu digital DFC Food",
      images: ["assets/img/projets/dfc-food-menu.jpg"],
      video: "",
      link: ""
    },
    {
      id: "agriconnect",
      title: "AgriConnect RDC",
      category: "projet",
      categoryLabel: "Projet numérique",
      cover: "agri",
      summary:
        "Conception d’un projet numérique de mise en relation entre producteurs agricoles et acheteurs.",
      details: [
        "Un projet pensé pour la République démocratique du Congo.",
        "Objectif : rapprocher les producteurs agricoles et les acheteurs grâce au numérique."
      ],
      tools: ["Conception de projet", "Numérique"],
      screen: "assets/img/projets/agriconnect-accueil.jpg",
      screenAlt: "Page d’accueil d’AgriConnect : marché agricole numérique de la RDC",
      images: [
        "assets/img/projets/agriconnect-accueil.jpg",
        "assets/img/videos/agriconnect-affiche.jpg",
        "assets/img/videos/agriconnect-fin.jpg"
      ],
      video: "assets/video/VID-20261013-WA0140.mp4",
      videoPoster: "assets/img/videos/agriconnect-affiche.jpg",
      link: "https://agri-connect-marketplace-agriconnec.vercel.app"
    },
    {
      id: "site-portfolio",
      title: "Site web et portfolio numérique",
      category: "web",
      categoryLabel: "Développement web",
      cover: "web",
      summary:
        "Réalisation de pages web, de formulaires et d’un portfolio en ligne.",
      details: [
        "Conception et intégration de pages web.",
        "Création de formulaires.",
        "Mise en ligne d’un portfolio numérique."
      ],
      tools: ["HTML", "CSS", "Création de sites"],
      images: [],
      video: "",
      link: ""
    },
    {
      id: "supports-canva",
      title: "Supports visuels Canva",
      category: "design",
      categoryLabel: "Design visuel",
      cover: "canva",
      summary:
        "Création de contenus et de supports visuels — certifiée Canva.",
      details: [
        "Création de contenus et de supports visuels.",
        "Certification Canva obtenue."
      ],
      tools: ["Canva"],
      images: [],
      video: "",
      link: ""
    }
  ],

  /* --- Vidéos --------------------------------------------------------------
     Déposer les fichiers .mp4 dans assets/video/ et les déclarer ici.
     poster : image de couverture (optionnelle mais recommandée)
     Exemple :
     { src: "assets/video/evenement.mp4", poster: "assets/img/photos/evenement.jpg",
       title: "Événement des jeunes", category: "Événement", duration: "1:24" }
     vertical : true pour une vidéo filmée au format portrait (9:16)
     Les aperçus se lancent sans le son quand la vidéo est visible à l'écran
     (désactivé si l'utilisateur réduit les animations ou économise ses données). */
  videos: [
    {
      src: "assets/video/VID-20261013-WA0140.mp4",
      poster: "assets/img/videos/agriconnect-affiche.jpg",
      title: "AgriConnect — vidéo de présentation",
      category: "Projet numérique",
      duration: "1:08",
      vertical: true
    },
    {
      src: "assets/video/VID-20260926-WA0003.mp4",
      poster: "assets/img/videos/demo-web-affiche.jpg",
      title: "Démonstration d’une application web à l’écran",
      category: "Développement web",
      duration: "0:17",
      vertical: true
    }
  ],

  /* --- Mon parcours en images ---------------------------------------------
     Mise en page en colonnes (style magazine), dans l'ordre ci-dessous.
     format   : "tall" | "square" | "wide"
     position : optionnel, cadrage de l'image, ex. "center 30%"
     Originaux : assets/img/photos/ — versions optimisées : assets/img/galerie/ */
  photos: [
    {
      src: "assets/img/kelly-gallery.jpg",
      alt: "Kelly Mobengo G’bama en blazer noir devant un écran d’auditorium",
      caption: "Tenue professionnelle — auditorium",
      format: "tall"
    },
    {
      src: "assets/img/galerie/miroir-tailleur.jpg",
      alt: "Kelly en tailleur bleu marine à col blanc, photographiée dans un miroir",
      caption: "Tailleur bleu marine, col blanc",
      format: "square"
    },
    {
      src: "assets/img/galerie/portrait-noir-blanc.jpg",
      alt: "Portrait de Kelly en noir et blanc, la main près du col",
      caption: "Portrait en noir & blanc",
      format: "tall",
      position: "center 60%"
    },
    {
      src: "assets/img/kelly-detail.jpg",
      alt: "Détail des revers strassés du blazer de Kelly",
      caption: "Le souci du détail",
      format: "square"
    },
    {
      src: "assets/img/galerie/sourire.jpg",
      alt: "Kelly riant, les yeux fermés",
      caption: "Un sourire, toujours",
      format: "tall",
      position: "center 45%"
    },
    {
      src: "assets/img/galerie/blazer-noir.jpg",
      alt: "Portrait de Kelly en blazer noir sans manches",
      caption: "Blazer noir, regard direct",
      format: "square"
    },
    {
      src: "assets/img/galerie/miroir-noir-blanc.jpg",
      alt: "Kelly en tailleur avec un badge, photographiée dans un miroir, en noir et blanc",
      caption: "Élégance en noir & blanc",
      format: "tall"
    },
    {
      src: "assets/img/galerie/portrait-tresses.jpg",
      alt: "Portrait de Kelly avec des tresses blondes",
      caption: "Portrait aux tresses",
      format: "square"
    }
  ]
};

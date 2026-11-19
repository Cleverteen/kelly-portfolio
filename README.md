# Portfolio — Mobengo G'bama Kelly

Site statique (HTML, CSS, JavaScript natif), sans dépendance ni étape de build.
Ouvrez `index.html` dans un navigateur pour le consulter.

## Structure

```
index.html              Page unique : toutes les sections
404.html                Page d'erreur
robots.txt, site.webmanifest
assets/
  css/style.css         Design (tokens, thèmes, animations, responsive)
  js/data.js            ★ CONTENU : réalisations, vidéos, photos
  js/main.js            Interactions (galerie, lecteur vidéo, formulaire…)
  img/                  Portraits, favicon, image Open Graph
  img/projets/          Captures des réalisations
  img/photos/           Photos originales (non modifiées, non chargées par le site)
  img/galerie/          Versions recadrées et optimisées utilisées par le site
  img/videos/           Affiches (images de couverture) des vidéos
  video/                Fichiers .mp4
  docs/                 CV en PDF
_sources/               Photo originale (non utilisée par le site)
```

## Ajouter du contenu

Tout se fait dans `assets/js/data.js`.

- **Photo** : déposez une version allégée (≈ 900 px de large) dans `assets/img/galerie/`,
  puis ajoutez `{ src, alt, caption, format: "tall" | "wide" | "square" }` dans `photos`.
  La mosaïque se répartit automatiquement en 3 colonnes (2 sur mobile) alignées en bas.
- **Vidéo** : déposez le `.mp4` dans `assets/video/` (idéalement < 20 Mo, H.264),
  puis ajoutez `{ src, poster, title, category, duration, vertical }` dans `videos`
  (`vertical: true` pour une vidéo filmée au format téléphone).
  Les aperçus sont muets, chargés seulement quand ils deviennent visibles, et
  désactivés si le visiteur réduit les animations ou active l'économie de données.
- **Réalisation** : ajoutez un objet dans `projects` (`screen` pour une capture
  mobile verticale, `images` pour la galerie, `link` pour l'URL publique).

## Formulaire de contact

L'envoi est réel, via FormSubmit (aucun serveur requis), vers l'adresse définie
dans `contactEmail`.
**Au premier envoi depuis le site en ligne**, FormSubmit envoie un e-mail
d'activation à cette adresse : il faut cliquer une fois sur le lien. Avant cela,
ou en cas d'échec, le site propose l'envoi par e-mail ou WhatsApp.

## Mise en ligne

Glissez-déposez le dossier sur https://app.netlify.com/drop (ou Vercel / GitHub Pages).
Ensuite, remplacez dans `index.html` les chemins `assets/img/og-image.jpg` des
balises `og:image` / `twitter:image` par l'URL complète
(ex. `https://votre-domaine/assets/img/og-image.jpg`), ajoutez une balise
`<link rel="canonical">`, et déclarez le site dans Google Search Console.

## Accessibilité & performances

- Respect de `prefers-reduced-motion` (animations désactivées).
- Navigation au clavier, modales avec piège de focus et touche Échap.
- Images optimisées et chargées à la demande (`loading="lazy"`).

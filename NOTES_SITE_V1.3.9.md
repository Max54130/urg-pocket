# Modifications du site urgpocket.app — v1.3.9

**Date : 14 septembre 2026**

## Fichiers modifiés

1. `index.html` (page principale du site vitrine)
2. `privacy.html` (politique de confidentialité)
3. `cgu.html` (conditions générales d'utilisation)
4. `icons/` (`icon-192.png`, `icon-512.png`)

---

## Modifications appliquées

### 1. Page principale (`index.html`)
- **Badge hero** : Mise à jour vers `Version 1.3.9 · Septembre 2026`.
- **Footer** : Version synchronisée sur `v1.3.9`.
- **Section Journal des modifications (Changelog fallback)** :
  - Ajout de l'entrée majeure **v1.3.9** (Refonte graphique Charte v2, polices Archivo embarquées 100% hors-ligne, surfaces rétro-éclairées, nouvelle icône officielle, accessibilité reduced-motion).
  - Maintien des entrées **v1.3.8** (Compatibilité Android 16 / API 36, bouton « Copier le bilan ») et **v1.3.3**.
- **Icônes du site** : Remplacement des favicons et logos par la nouvelle icône officielle (croix médicale et tracé ECG sur disque bleu roi).

### 2. Pages Légales (`privacy.html` & `cgu.html`)
- **Alignement intégral sur la Charte v2** :
  - Intégration des polices `ArchivoUP` (400 / 600) et `ArchivoUPX` (600) embarquées en base64.
  - Suppression complète des requêtes réseau externes (Google Fonts `Inter`).
  - Nouveaux tokens sombres de référence : `--bg: #0A131E`, `--surface: #13202E`, `--surface2: #18293A`, `--text: #E8EFF7`, `--line: rgba(150,185,220,.08)`.
  - Couche d'atmosphère technique : halos radiaux, grille 46px et grain SVG.
  - Remplacement du glassmorphism par des surfaces solides rétro-éclairées (`--edge`, `--panel-grad`).
  - Prise en charge de `@media (prefers-reduced-motion: reduce)`.
  - En-tête avec logo officiel et bouton de retour stylisé.

---

## À mettre en ligne

Déployer l'ensemble du dossier `SITE urgpocket` sur le serveur d'hébergement :
- `index.html`
- `privacy.html`
- `cgu.html`
- `icons/`
- `legal.css` (si utilisé en externe)
- `robots.txt` et `sitemap.xml`

---

## Validations
- Balises HTML strictement équilibrées.
- Zéro requête sortante pour les polices.
- Cohérence parfaite des versions et de l'identité visuelle sur toutes les pages.

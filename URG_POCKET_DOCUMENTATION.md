# Urg Pocket — Documentation technique exhaustive
**Version actuelle : 1.2.12 — versionCode 29**  
**Dernière mise à jour : mars 2026**

---

## Table des matières

1. [Architecture générale](#1-architecture-générale)
2. [Structure du fichier HTML](#2-structure-du-fichier-html)
3. [Système de thème et couleurs](#3-système-de-thème-et-couleurs)
4. [Navigation](#4-navigation)
5. [Scores cliniques](#5-scores-cliniques)
6. [Protocoles](#6-protocoles)
7. [Modules de calcul](#7-modules-de-calcul)
8. [Toxicologie](#8-toxicologie)
9. [Autres modules](#9-autres-modules)
10. [Composants UI réutilisables](#10-composants-ui-réutilisables)
11. [Persistance (localStorage)](#11-persistance-localstorage)
12. [Android — MainActivity.kt](#12-android--mainactivitykt)
13. [Versions et déploiement](#13-versions-et-déploiement)
14. [Sources médicales](#14-sources-médicales)

---

## 1. Architecture générale

### Type
Application **single-file HTML** (`index.html`) — HTML + CSS + JS dans un seul fichier. Aucune dépendance externe requise à l'exécution (hors police Inter via Google Fonts au premier chargement).

### Cibles
- **Android** : WebView via Android Studio (`WebViewAssetLoader`, `targetSdk 35`)
- **Web / PWA** : GitHub Pages (`https://max54130.github.io/urg-pocket/`)

### Taille
- HTML total : ~200 Ko
- CSS : ~29 Ko / ~323 lignes
- JS : ~171 Ko / ~2644 lignes

### Contexte clinique
Destiné aux équipes **SAMU / SMUR**. Les protocoles ne contiennent jamais d'étape "appeler le 15" — l'équipe est le SAMU.

---

## 2. Structure du fichier HTML

```
<html>
  <head>
    <style> ... </style>           ← CSS complet (inline)
    <script> ... </script>         ← Anti-flash thème (inline, head)
    <script> ... </script>         ← Service Worker + restauration accent
  </head>
  <body>
    <div class="app">
      <!-- SPLASH SCREEN -->
      <!-- CHOIX PROFIL premier lancement -->
      <header class="topbar"> ... </header>
      <main>
        <section id="screen-home"> ... </section>
        <section id="screen-*"> ... </section>
        ... (32 screens au total)
      </main>
      <nav class="bottom-nav"> ... </nav>
    </div>
    <script> ... </script>         ← JS principal (en bas du body)
  </body>
</html>
```

### Les 32 screens
| Screen ID | Description |
|-----------|-------------|
| `home` | Accueil — raccourcis |
| `debit` | Débit de perfusion |
| `normes` | Menu normes biologiques |
| `norme-detail` | Détail d'une norme |
| `scores` | Menu scores |
| `score-glasgow` | Score de Glasgow |
| `score-braden` | Échelle de Braden |
| `score-news2` | Score NEWS2 |
| `score-qsofa` | Score qSOFA |
| `score-apgar` | Score APGAR |
| `score-cushman` | Score de Cushman |
| `score-wells-ep` | Score de Wells EP |
| `score-nihss` | Score NIHSS |
| `score-heart` | Score HEART |
| `score-vittel` | Critères de Vittel |
| `score-shockindex` | Shock Index |
| `score-malinas` | Score de Malinas |
| `dfg` | DFG / CKD-EPI 2021 |
| `imc` | IMC / Surface corporelle |
| `killip` | Score de Killip |
| `doses` | Doses pondérales |
| `convertisseur` | Convertisseur biologique |
| `constped` | Constantes vitales |
| `protocoles` | Menu protocoles |
| `proto-acr` | ACR adulte |
| `proto-acr_ped` | ACR pédiatrique |
| `proto-anaphylaxie` | Choc anaphylactique |
| `proto-avc` | AVC |
| `proto-douleur_tho` | Douleur thoracique / SCA |
| `settings` | Paramètres |
| `sources` | Sources médicales |
| `tubes` | Ordre de prélèvement |
| `antidotes` | Menu toxicologie |
| `toxico-antidotes` | Antidotes (52) |
| `toxico-doses` | Doses toxiques (112) |

---

## 3. Système de thème et couleurs

### Variables CSS (`:root`)
```css
--bg, --surface, --surface2, --surface3   /* fonds */
--text, --text2                            /* textes */
--line                                     /* bordures */
--primary, --primary2                      /* couleur d'accent */
--secondary                                /* teal */
--danger                                   /* rouge erreur */
--shadow                                   /* ombres */
--header: 60px                             /* hauteur topbar */
--bottom: 72px                             /* hauteur bottom nav */
```

### Thèmes
- **Clair** (défaut) : fond `#f0f4f8`, surface `#ffffff`
- **Sombre** : fond `#0f0f12`, surface `#17181c` (palette CNPA)
- **Auto** : suit le système

### Couleurs d'accent (6)
`red` (#DC2626) | `orange` (#EA580C) | `gold` (#D79A10) | `teal` (#0D9488) | `blue` (#1A73E8) | `purple` (#7C3AED)

Ordonnées selon le spectre lumineux (rouge → orange → or → turquoise → bleu → violet).

La couleur d'accent change `--primary` et `--primary2` via `document.documentElement.style.setProperty`.

### Anti-flash
Deux scripts dans le `<head>` restaurent thème et accent avant le premier rendu pour éviter le flash blanc/noir.

---

## 4. Navigation

### Principe
Navigation SPA (Single Page Application) — un seul écran visible à la fois via `.screen.active { display: block }`.

### `setActive(target)`
Fonction centrale. Active le screen cible, met à jour les boutons nav, scrolle en haut.

### Hiérarchie (bouton retour Android)
```
home
├── scores
│   ├── score-glasgow / braden / news2 / qsofa / apgar / cushman
│   ├── score-wells-ep / nihss / heart / vittel / shockindex / malinas
│   └── dfg / imc / killip
├── normes → norme-detail
├── protocoles → proto-acr / proto-acr_ped / proto-anaphylaxie / proto-avc / proto-douleur_tho
├── antidotes → toxico-antidotes / toxico-doses
└── debit / tubes / doses / convertisseur / constped / sources / settings
```

### `handleBackPress()`
Appelé depuis `MainActivity.kt` via `evaluateJavascript`. Remonte dans `screenParents` ou déclenche `Android.showExitDialog()` si on est sur home.

### Bottom nav
Configurable — jusqu'à 8 onglets, réordonnables par drag & drop. Persisté en localStorage.  
**Défaut** : Accueil, Scores, Protocoles, Toxicologie, Doses.

### Logo topbar
Cliquable → `setActive('home')`.

---

## 5. Scores cliniques

### Système commun
- `severityClassFromRange(scoreName, value)` → `'green'` | `'yellow'` | `'red'`
- `labelFromRange(scoreName, value)` → libellé texte
- `updateColorResult(el, cls)` → applique la classe CSS
- `renderRingResult(el, opts)` → affiche l'anneau coloré

### Anneau de score (`.score-result.ring-result`)
Fond sombre teinté selon le niveau, cercle avec bordure colorée, chiffre blanc, pill de niveau de risque.

```js
renderRingResult(el, {
  score:   '15',
  badge:   'Normal',
  interp:  'Description courte',
  conduct: 'Conduite à tenir'
});
```

### Scores disponibles (12 + 3 calculs)

| Score | Domaine | Max | Anneau |
|-------|---------|-----|--------|
| Glasgow | Neuro / Conscience | 15 | ✅ |
| NIHSS | Neuro / AVC | 42 | ✅ |
| NEWS2 | Dégradation clinique | 20+ | ✅ |
| HEART | SCA | 10 | ✅ |
| Shock Index | Hémodynamique | — | ✅ |
| Wells EP | Embolie pulmonaire | 12,5 | ✅ |
| Vittel | Trauma grave | critères | ✅ |
| qSOFA | Sepsis | 3 | ✅ |
| APGAR | Néonatal | 10 | ✅ |
| Malinas | Accouchement imminent | 10 | ✅ |
| Cushman | Sevrage alcoolique | 21 | ✅ |
| Braden | Risque d'escarre | 23 | ✅ |
| **DFG / CKD-EPI** | Fonction rénale | — | ✅ |
| **IMC / Surface** | Anthropométrie | — | ✅ |
| **Killip** | IC post-SCA | K I–IV | ✅ |

### Score Killip
Basé sur des **questions cliniques simples** (pas de sélection directe de la classe) :
1. Bruits anormaux à l'auscultation ?
2. Ces bruits couvrent > 50% des poumons ?
3. TAS < 90 mmHg ?
4. Marbrures / peau froide / confusion ?

Logique : choc → K IV | OAP → K III | râles seuls → K II | rien → K I.

### DFG — formule CKD-EPI 2021
Entrées : créatinine (µmol/L), âge, sexe.  
Conversion interne : µmol/L → mg/dL (× 0,01131).  
Résultat en mL/min/1,73m² avec stade G1–G5.

### IMC / Surface corporelle
IMC = poids / taille² | Surface (Mosteller) = √(poids × taille / 3600).

### Tous les scores sont vierges au chargement
Aucun score n'affiche de résultat avant que l'utilisateur interagisse.

---

## 6. Protocoles

5 check-lists de prise en charge :

| Protocole | Source |
|-----------|--------|
| ACR adulte | ERC 2025 |
| ACR pédiatrique | AFGSU / ERC 2025 |
| Choc anaphylactique | SFMU |
| AVC | HAS |
| Douleur thoracique / SCA | ESC 2023 |

---

## 7. Modules de calcul

### Débit de perfusion
Calcule le débit en mL/h ou gouttes/min selon volume, durée, facteur de goutte.

### Doses pondérales
Calcule la dose selon le poids du patient et la posologie en mg/kg.

### Convertisseur biologique
6 molécules, un seul sens affiché avec bouton **⇄** pour inverser :

| Molécule | Unités |
|----------|--------|
| Glycémie | g/L ↔ mmol/L (× 5,551) |
| Créatinine | µmol/L ↔ mg/dL (× 0,01131) |
| Cholestérol | g/L ↔ mmol/L (× 2,586) |
| Triglycérides | g/L ↔ mmol/L (× 1,129) |
| Bilirubine | µmol/L ↔ mg/dL (× 0,05847) |
| Température | °C ↔ °F |

---

## 8. Toxicologie

### Antidotes (52)
Organisés en catégories collapsibles. Source : SFMU / Toxin — Pr Vincent Danel, Grenoble.

### Doses toxiques (112)
Tableau DCI / dose adulte / dose enfant / pic plasmatique. Même source.

---

## 9. Autres modules

### Normes biologiques
Valeurs normales adulte + pédiatrique. Détail par norme via `screen-norme-detail`.

### Constantes vitales
Adulte + pédiatrique (par tranche d'âge) : FC, FR, PAS, SpO₂.

### Ordre de prélèvement des tubes
Séquence recommandée avec code couleur.

### Sources
Références complètes : ERC 2025, SFMU, SFAR, HAS, ESC 2023, AFGSU.

---

## 10. Composants UI réutilisables

### `.home-compact` / `.home-compact-grid`
Boutons de navigation compacts, grille 2 colonnes.

### `.score-item` / `.score-option`
Items de score avec radio/checkbox. Classe `.checked` sur l'option sélectionnée.

### `.score-result`
Carte résultat. Avec `.ring-result` → affichage anneau.

### `.content-card`
Carte principale de chaque screen (fond, bordure, border-radius 16px).

### `.page-head`
En-tête de page avec titre h2, description p, et bouton retour.

### `.btn-back`
Bouton retour coloré (background `var(--primary)`), affiché dans `.page-head`.

### `.alert` / `.note`
Encadrés informatifs. `.alert` = fond teinté danger, `.note` = texte secondaire.

### `.inline-form` / `.field`
Layout formulaire en grille.

### Splash screen
Affiché 1200ms au démarrage, disparition en fondu 450ms. Positionné en **premier** dans le script principal.

### Profil utilisateur
Overlay au premier lancement

### Avatar et identité
Photo de profil + prénom/pseudo configurables dans **Paramètres → Identité**. La photo est redimensionnée à 120×120px (crop carré centré, JPEG 70%) avant stockage en localStorage. L'avatar circulaire s'affiche dans la topbar avec le prénom — cliquer dessus ouvre les Paramètres. (médecin / paramédical). Toggle dans Paramètres. Persisté en localStorage.

---

## 11. Persistance (localStorage)

| Clé | Valeur | Description |
|-----|--------|-------------|
| `urg-theme` | `'light'` / `'dark'` / `'auto'` | Thème |
| `urg-accent` | `'blue'` / `'green'` / … | Couleur d'accent |
| `urg-navtabs` | JSON array | Onglets bottom nav actifs et ordre |
| `urg-profile` | `'medical'` / `'paramedical'` / `'none'` | Profil utilisateur |
| `urg-colorblind` | `'on'` / `'off'` | Mode daltonien |
| `urg-avatar` | base64 JPEG 120×120px | Photo de profil |
| `urg-avatar-name` | texte (max 20 chars) | Prénom / pseudo |

> `urg-fontsize` a été **supprimé** (fonctionnalité retirée — Android gère la taille du texte au niveau système).

---

## 12. Android — MainActivity.kt

### WebViewAssetLoader
Sert l'HTML via `https://urgpocket.app/` (pas `file://`) pour la sécurité et la compatibilité.

### AndroidBridge
Interface JS ↔ Kotlin exposée via `window.Android` :

| Méthode | Description |
|---------|-------------|
| `Android.showExitDialog()` | Affiche une `AlertDialog` native "Quitter ?" |
| `Android.confirmExit()` | Quitte l'app sans confirmation |

### Bouton retour
`OnBackPressedCallback` → `evaluateJavascript("handleBackPress();")` → JS gère la navigation et appelle `Android.showExitDialog()` sur home.

### Edge-to-edge
`WindowCompat.setDecorFitsSystemWindows(window, false)` + gestion CSS via `env(safe-area-inset-top)`.

### Configuration
```kotlin
settings.javaScriptEnabled = true
settings.domStorageEnabled = true   // localStorage
settings.allowFileAccess = false
settings.builtInZoomControls = false
```

---

### v1.2.11 (mars 2026)
- ✅ Acceptation CGU obligatoire au lancement et à chaque MàJ
- ✅ Encart confidentialité sur l'accueil
- ✅ Bouton retour CGU/Privacy sticky + safe-area
- ✅ Vouvoiement Contact — versionCode 28

## 13. Versions et déploiement

### Historique des versions

| versionCode | versionName | Notes |
|-------------|-------------|-------|
| 29 | 1.2.12 | **Build actuel** — protocoles explicités, tube gris alcoolémie
| 24 | 1.2.7 | Publié Play Store |
| 23 | 1.2.6 | Publié Play Store — DFG/IMC/Killip, scores vierges, or, sources, daltonisme |
| 22 | 1.2.5 | Publié Play Store — dialog quitter, descriptions scores |
| 21 | 1.2.4 | Publié Play Store — anneaux tous scores, profil, navigation |

> La prochaine release Play Store doit utiliser versionCode **≥ 30**.

> ⚠️ Le versionCode doit toujours être **supérieur à 21** pour une nouvelle soumission Play Store.

### Déploiement GitHub Pages
1. Pousser tous les fichiers sur `main`
2. Settings → Pages → Source : `main` / `/ (root)`
3. URL : `https://max54130.github.io/urg-pocket/`

Le Service Worker (`sw.js`) n'est enregistré que sur `max54130.github.io` pour éviter les erreurs en local.

### Fichiers du dépôt GitHub
```
urg-pocket/
├── index.html              ← redirect vers urg_pocket.html
├── urg_pocket.html  ← application (single-file)
├── manifest.json           ← PWA
├── sw.js                   ← Service Worker offline
├── cgu.html                ← CGU (12 articles)
├── privacy.html            ← Politique de confidentialité (RGPD)
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── README.md
```

---

## 14. Sources médicales

### Scores cliniques

| Score | Source | URL |
|-------|--------|-----|
| Glasgow | MSD Manuals | msdmanuals.com |
| NIHSS | NIH/NINDS + HAS | ninds.nih.gov |
| NEWS2 | Royal College of Physicians | rcp.ac.uk |
| HEART | ESC Guidelines SCA | escardio.org |
| Shock Index | SFMU | sfmu.org |
| Wells EP | HAS + ESC | has-sante.fr / escardio.org |
| Vittel | SFMU | sfmu.org |
| qSOFA | JAMA Sepsis-3 (2016) + SRLF | jamanetwork.com |
| APGAR | ACOG Committee Opinion (2015) | acog.org |
| Malinas | SFMU | sfmu.org |
| Cushman | SFA + SFMU | sfalcoologie.asso.fr |
| Braden | NIH/PMC | pmc.ncbi.nlm.nih.gov |
| Killip | ESC SCA + JAMA (1967) | escardio.org |
| DFG / CKD-EPI 2021 | KDIGO/NKF + HAS | kidney.org / has-sante.fr |
| IMC / Surface (Mosteller) | OMS + N Engl J Med (1987) | who.int |

### Autres modules

| Module | Source |
|--------|--------|
| Protocoles ACR adulte/pédiatrique | ERC 2025 |
| Protocole AVC | HAS 2009 + RPP SFMU/SFNV 2024 |
| Protocole Anaphylaxie | RFE SFMU 2016 + SFA |
| Protocole SCA | ESC 2023 + SFC/SFMU |
| Antidotes + doses toxiques | SFMU/Toxin — Pr Vincent Danel, Grenoble (rév. déc. 2019) |
| Doses pondérales | Vidal + SFAR + SFMU |
| Constantes pédiatriques | PALS/AHA + Nelson Textbook of Pediatrics |
| Ordre des tubes | CLSI GP41 |
| Convertisseur biologique | Recommandations SI / UnitsLab |

### Code supprimé (orphelins)
- **CHA₂DS₂-VASc** : JS présent mais aucun screen HTML → supprimé
- **Cockcroft-Gault** : remplacé par CKD-EPI 2021 dans l'app → supprimé

---

## Avertissement

Urg Pocket est un **aide-mémoire** pour professionnels de santé. Il ne constitue pas un dispositif médical. Les informations sont indicatives et ne remplacent pas le jugement clinique, les protocoles de service ni les sources officielles. Les posologies doivent être vérifiées avant toute administration.

**Contact** : urgpocket@gmail.com

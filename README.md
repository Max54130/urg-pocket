# Urg Pocket

**Aide-mémoire médical pour les équipes SAMU / SMUR et urgences hospitalières**

Application HTML single-file conçue pour les urgentistes, SMUR et équipes préhospitalières. Fonctionne hors ligne, sans compte, sans collecte de données.

---

## Accès rapide

- **Application** : [max54130.github.io/urg-pocket](https://max54130.github.io/urg-pocket/)
- **Politique de confidentialité** : [privacy.html](https://max54130.github.io/urg-pocket/privacy.html)
- **CGU** : [cgu.html](https://max54130.github.io/urg-pocket/cgu.html)

---

## Version actuelle

| Paramètre | Valeur |
|-----------|--------|
| versionName | **1.3.0** |
| versionCode | **79** |
| Date | Avril 2026 |
| Prochaine release minimum | versionCode **≥ 80** / versionName **"1.3.1"** |
| Dernier publié Play Store | versionCode 77 / versionName 1.2.60 |

---

## Contenu

### Médicaments
- **228 fiches** médicaments complètes avec posologies détaillées (SAMU/SMUR + urgences hospitalières)
- **204 entrées** Princeps→DCI avec recherche sans accents
- **26 médicaments** en doses pondérales rapides (calcul automatique selon poids)
- Équivalences corticoïdes, HBPM, Princeps→DCI
- Révisions sourcées — RCP ANSM, ESC 2023, GIHP 2024, ERC 2021, SFMU/Toxin

### Scores cliniques (24 scores)
| Score | Domaine |
|-------|---------|
| Glasgow | Neuro / Conscience |
| Glasgow pédiatrique | Neuro / Conscience (enfant < 5 ans) |
| NIHSS | Neuro / AVC |
| NEWS2 | Cardio / Hémodynamique |
| HEART | Cardio / SCA |
| Killip | Cardio / Insuffisance cardiaque |
| Shock Index | Cardio / Hémodynamique |
| Wells EP | Thrombose |
| Genève révisé | Thrombose / EP |
| PERC | Thrombose / EP (exclusion) |
| YEARS | Thrombose / EP (algorithme D-dimères) |
| sPESI | Thrombose / EP (pronostic) |
| Blatchford | Hémorragie digestive haute |
| Vittel | Trauma grave |
| qSOFA | Sepsis |
| APGAR | Pédiatrie / Néonatologie |
| Malinas | Obstétrique |
| Cushman | Sevrage alcoolique |
| Braden | Escarre |
| Algoplus | Douleur aiguë (PA non communicant) |
| Doloplus-2 | Douleur chronique (PA non communicant) |
| DEP / Peak Flow | Respiratoire |
| DFG / CKD-EPI 2021 | Néphrologie |
| IMC / Surface corporelle | Posologie |

### Protocoles (13)
| Protocole | Catégorie | Source |
|-----------|-----------|--------|
| ACR adulte | Urgences vitales | ERC 2025 |
| ACR pédiatrique | Urgences vitales | ERC 2025 |
| Douleur thoracique / SCA | Cardiovasculaire | ESC 2023 + SFC/SFMU |
| AVC | Neurologique | HAS + SFMU/SFNV 2024 |
| Anaphylaxie | Chocs | RFE SFMU 2016 |
| Choc septique | Chocs | SSC 2021 + SRLF/SFMU/SFAR |
| Choc hémorragique | Chocs | SFAR/SFMU Damage Control 2023 |
| Choc hypovolémique | Chocs | SFMU/SFAR 2020 |
| Trauma grave — ABCDE | Traumatologie | Critères Vittel SFMU 2011 |
| Protocole transfusionnel | Hémato/Transfusion | HAS Transfusion PSL 2023 + ANSM |
| Entorse cheville | Orthopédie | Ottawa JAMA 1993 + Bastin UCLouvain |
| Voie intra-osseuse | Annexes / Gestes | ERC 2021 + SFAR RFE 2021 |
| Territoires des infarctus | Annexes / Gestes | ESC 2023 STEMI + Thygesen 2018 |

### Références
- Normes biologiques adulte et pédiatriques
- Constantes vitales adulte et pédiatriques
- Tubes de prélèvement — ordre et examens
- Toxicologie — antidotes et doses toxiques
- Convertisseur d'unités biologiques
- Calculs : DFG/CKD-EPI 2021, IMC/Surface, Killip
- PCA / IVSE — calculateur seringue électrique (toggle mg/UI)
- Calculs de dose — doses pondérales, débit perfusion, équivalence voies

---

## Thème graphique

| Variable | Clair | Sombre |
|----------|-------|--------|
| Fond | `#EDF1F7` | `#0E1A25` |
| Surface | `#FFFFFF` | `#132030` |
| Primaire | `#1A73C8` | `#5BA8E8` |
| Danger | `#C0392B` | `#E8605A` |
| Succès | `#1A9B6C` | `#2EC090` |

**Accents personnalisables** : Rouge, Orange, Or `#D79A10`, Vert, Bleu (défaut), Violet

---

## Sources principales

| Source | Utilisation |
|--------|------------|
| RCP ANSM / BDPM | Fiches médicaments — posologies et CI |
| ERC Guidelines 2021 | ACR adulte/pédiatrique, Amiodarone |
| ESC Guidelines ACS 2023 | Antiagrégants, SCA |
| GIHP — RFE mai 2024 | HBPM (Lovenox, Fraxiparine, Fragmine, Innohep) |
| SFAR | Équivalences corticoïdes, équivalence des voies |
| RecoMédicales 2024 | Équivalences corticoïdes |
| SRLF 2024 | Liste Princeps→DCI |
| COMEDIMS APHP 2014 | Équivalences HBPM |
| Wary B., Serbouti S. — Revue Douleurs 2001 | Score Doloplus-2 |
| Rat P. et al. — SFAP / doloplus.fr 2011 | Score Algoplus |
| CLSI GP41 | Ordre des tubes |
| JAMA — Sepsis-3 2016 | qSOFA |
| HAS | DFG/CKD-EPI, AVC, EP |

---

## Architecture technique

- **Single-file HTML** — CSS et JS inline, ~552 KB
- **Hors ligne** — Service Worker PWA
- **Android** — WebView (targetSdk 35, minSdk 24)
- **Thèmes** — Clair / Sombre / Auto
- **Accessibilité** — Mode daltonisme
- **Sections** : 47 sections HTML équilibrées
- **Scripts** : 3 blocs `<script>` équilibrés

---

## Changelog

### v1.3.0 (avril 2026) — saut de version majeur

Cette version regroupe les évolutions UX/navigation majeures (initialement v1.2.60) et le fix WebView (initialement v1.2.61). Le saut de version mineure (1.2.x → 1.3.0) reflète l'ampleur de la refonte de l'interface et de la navigation.

**🎨 Refonte UX alignée sur le site vitrine urgpocket.app**
- **Mode sombre** : nouvelle palette marine identique au site (`#0E1A25` background, `#132030` surface, `#5BA8E8` primary)
- **Mode clair** : palette ajustée avec primary `#1A73C8` (couleur de marque)
- **Ombres hiérarchisées** : 3 niveaux (`--shadow-sm`, `--shadow-md`, `--shadow-lg`) au lieu d'une ombre unique, donnent une vraie profondeur visuelle
- **Border-radius standardisés** : 3 tokens (`--radius-sm` 10px, `--radius-md` 14px, `--radius-lg` 20px)
- **Boutons primaires** : dégradé vertical subtil (`primary` → `primary2`), ombre bleutée portée, hover avec `translateY(-1px)` + ombre amplifiée
- **Cartes** : passage à `border-radius` 20px, transition fluide sur hover, élévation cohérente
- **Topbar** : ombre subtile en bas pour démarcation visuelle
- **Bottom-nav** : ombre inversée vers le haut, démarcation propre
- **Halos lumineux** : splash screen, score-results (vert/jaune/rouge), nav active — via `color-mix` qui suit l'accent dynamique
- **Texture de fond** : grille subtile 40x40px

**📝 Typographie renforcée**
- Body : activation `font-feature-settings: 'tnum' 1, 'cv11' 1` (chiffres tabulaires + glyphes optimisés écran), `line-height: 1.55`, antialiasing
- Titres h2 : 26px, font-weight 800, letter-spacing -0.02em (style site)
- Section-title h3 : font-weight 800, letter-spacing -0.015em
- Home-section-title (badge) : letter-spacing 0.1em (cohérent avec h4 du site)

**⭐ Page d'accueil personnalisable** (suppression du système profil médecin/paramédical)
- **Favoris** : zone fixe en haut, jusqu'à 8 outils épinglés via une étoile présente sur chaque écran d'item
- **Récemment consultés** : 6 derniers items ouverts, automatique, masquable via Paramètres
- **5 catégories par type** réorganisables en drag & drop (mode édition explicite via bouton ✏️ Réorganiser, à côté de la barre de recherche)
- **Tap-long** sur un favori : confirmation de retrait
- **Persistance** : `localStorage` (`urg-favorites`, `urg-recents`, `urg-home-order`, `urg-show-recents`)
- **Catalogue de 50 items favorisables** : 22 scores + 11 protocoles + 3 calculs (DFG, IMC, PCA) + 10 pages-catégories + 4 équivalences

**🆕 Nouvelles variables CSS**
- `--text3` (texte tertiaire)
- `--primary-soft` (surface teintée primary)
- `--primary-brand` (couleur de marque fixe)

**🔧 Correction des liens externes dans la WebView Android**
- Les liens `mailto:` (page Paramètres → Contact, bandeau de mise à jour, CGU, Politique de confidentialité) provoquaient une erreur `ERR_UNKNOWN_URL_SCHEME` car la WebView essayait de les charger comme des pages web
- **Solution côté natif Android** (MainActivity.kt) : ajout de `shouldOverrideUrlLoading` dans le `WebViewClient` pour intercepter et déléguer aux apps système :
  - `mailto:` → ouverture de l'app Mail (Intent.ACTION_SENDTO)
  - `tel:` → ouverture de l'app Téléphone (Intent.ACTION_DIAL)
  - `sms:` / `smsto:` → ouverture de l'app SMS
  - Liens HTTP(S) externes (hors urgpocket.app) → ouverture dans le navigateur système
- Aucune modification HTML/JS — le fix est 100% côté Android natif

**✅ Versionning**
- versionCode 79
- Saut de version mineure (1.2.x → 1.3.0) pour refléter l'ampleur des changements UX/navigation

### v1.2.60 (avril 2026)
- 🎨 **Refonte UX alignée sur le site vitrine urgpocket.app**
  - **Mode sombre** : nouvelle palette marine identique au site (`#0E1A25` background, `#132030` surface, `#5BA8E8` primary)
  - **Mode clair** : palette ajustée avec primary `#1A73C8` (couleur de marque)
  - **Ombres hiérarchisées** : 3 niveaux (`--shadow-sm`, `--shadow-md`, `--shadow-lg`) au lieu d'une ombre unique, donnent une vraie profondeur visuelle
  - **Border-radius standardisés** : 3 tokens (`--radius-sm` 10px, `--radius-md` 14px, `--radius-lg` 20px)
  - **Boutons primaires** : dégradé vertical subtil (`primary` → `primary2`), ombre bleutée portée, hover avec `translateY(-1px)` + ombre amplifiée
  - **Cartes** : passage à `border-radius` 20px, transition fluide sur hover, élévation cohérente
  - **Topbar** : ombre subtile en bas pour démarcation visuelle
  - **Bottom-nav** : ombre inversée vers le haut, démarcation propre
  - **Boutons compacts (accueil)** : hover avec élévation marquée + accent border
  - **Bouton retour** : dégradé + ombre cohérente
- 📝 **Typographie renforcée** :
  - Body : activation `font-feature-settings: 'tnum' 1, 'cv11' 1` (chiffres tabulaires + glyphes optimisés écran), `line-height: 1.55`, antialiasing
  - Titres h2 : 26px, font-weight 800, letter-spacing -0.02em (style site)
  - Section-title h3 : font-weight 800, letter-spacing -0.015em
  - Home-section-title (badge) : letter-spacing 0.1em (cohérent avec h4 du site)
- 🆕 **Nouvelles variables CSS** : `--text3` (texte tertiaire), `--primary-soft` (surface teintée primary), `--primary-brand` (couleur de marque fixe)
- ✅ Aucun changement de contenu — pure refonte visuelle
- ✅ versionCode 77

### v1.2.59 (avril 2026)
- 🔧 **Correction adresse e-mail de contact** dans la page Paramètres → À propos → Contact :
  - Avant : `urgpocket@gmail.com`
  - Après : `contact@urgpocket.app` (adresse officielle, conforme aux CGU article 10)
- ✅ Aucun autre changement de contenu — alignement avec les Conditions Générales d'Utilisation
- ✅ versionCode 76

### v1.2.58 (avril 2026)
- 🔧 **Correction du filtrage par profil** : la page Scores affichait 6 boutons cachés en profil "médical" (Algoplus, Doloplus-2, Braden, Malinas, APGAR, Cushman) et 3 en profil "paramédical" (NIHSS, HEART, Wells EP), ce qui rendait les sections "Douleur" et "Spécialisés" visuellement vides alors que leurs titres restaient affichés.
- ✅ **Tous les scores, protocoles et calculs sont désormais accessibles** peu importe le profil — 24 scores, 13 protocoles, aucun masquage.
- 🏗️ **Infrastructure prête pour filtrage futur de l'accueil** : la fonction `applyProfile` a été refactorisée pour cibler `#screen-home` via `hideHome: []` au lieu de `#screen-scores` via `hideScores`. Pour activer le filtrage plus tard, il suffit de remplir `hideHome` avec les `data-target` à cacher sur l'accueil dans `profileConfig`.
- 🔁 Réinitialisation automatique : les utilisateurs qui avaient un profil avec des boutons cachés verront tous les scores réapparaître au prochain lancement.
- ✅ versionCode 75

### v1.2.57 (avril 2026)
- ⏪ **Rollback complet des illustrations SVG** : retrait des 6 schémas médicaux ajoutés en v1.2.55 et v1.2.56 (Territoires IDM, Voie intra-osseuse, Ligaments cheville, Zones Ottawa, Injection IM anaphylaxie, Rythmes ECG ACR). Les dessins anatomiques SVG faits à la main n'étaient pas d'une qualité suffisante.
- 🧹 Retrait de l'infrastructure CSS associée (classes `.med-figure`, `.fig-*`)
- ✅ Retour à l'état fonctionnel identique à la v1.2.54 (64 sections, 989 div, 0 schéma médical, seul le logo topbar reste en SVG)
- ✅ versionCode 74

### v1.2.56 (avril 2026)
- 🎨 **Phase 2 des illustrations SVG** — 4 nouveaux schémas médicaux originaux :
  - **Ligaments latéraux de la cheville** (page Entorse) : vue latérale externe avec tibia, fibula, malléole latérale, talus, calcanéum, et les 3 faisceaux LTFA (rouge, ~70 %), LCF (orange, ~20 %), LTFP (bleu, rare), flèche du mécanisme inversion + flexion plantaire
  - **Zones de palpation Ottawa** (page Arbre diagnostique entorse) : pied vu du dessus avec les 4 points critiques numérotés (malléoles latérale/médiale, base 5e métatarsien, naviculaire) + mention "impossibilité de faire 4 pas"
  - **Site d'injection IM d'adrénaline** (page Anaphylaxie) : cuisse divisée en 3 tiers, site cible (1/3 moyen face antéro-latérale — vaste latéral) surligné, aiguille avec dosage, mise en garde artère fémorale côté médial
  - **Rythmes ECG de l'ACR** (page ACR adulte) : 4 tracés distinctifs sur 2 panneaux, CHOCABLES (FV chaotique, TV sans pouls régulière) en rouge + NON CHOCABLES (asystolie ligne plate, AESP QRS réguliers sans pouls) en bleu, avec conduite associée
- ✅ Total illustrations : 6 schémas SVG dans 6 fiches médicales (+ 2 de la v1.2.55)
- ✅ Tous les SVG s'adaptent au thème sombre/clair et au mode daltonien (utilisent les variables CSS sémantiques)
- ✅ versionCode 73

### v1.2.55 (avril 2026)
- 🎨 **Premières illustrations SVG** — schémas médicaux intégrés directement dans les fiches sans fichiers externes (single-file HTML préservé) :
  - **Territoires des infarctus** : schéma cœur en deux vues (antérieure + postérieure) avec zones colorées pour les 5 territoires (antérieur, inférieur, latéral, postérieur, ventricule droit) et dérivations ECG annotées
  - **Voie intra-osseuse** : schéma des 3 sites principaux de pose (tibia proximal adulte, tibia proximal enfant, humérus proximal) avec points de ponction marqués, tubérosité tibiale antérieure repérée, cotes (2 cm, 1 cm) et flèches d'orientation
- 🎨 **Infrastructure CSS figures** : classes `.med-figure`, `.med-figure-caption`, `.med-figure-legend` réutilisables. SVG adaptatifs au thème sombre/clair et au mode daltonien (utilisent `--sem-danger`, `--sem-warn`, `--sem-ok`, `--primary`, `--text1`, `--text2`)
- 🎨 Tous les schémas **originaux** — dessinés à la main en SVG, pas de reprise depuis sources externes pour éviter tout conflit de droits
- ✅ versionCode 72

### v1.2.54 (avril 2026)
- 🔧 **Audit complet du code** — 4 bugs structurels corrigés :
  - `work.html`, `privacy.html`, `cgu.html` étaient tronqués (manquaient `</body></html>`). privacy.html coupé en pleine phrase ("peut être adressée à la "). cgu.html coupé en plein `<h`. Fichiers complétés et fermés proprement.
  - `manifest.json` : couleurs du splash PWA corrigées (`background_color` et `theme_color`) pour matcher la palette réelle de l'app (`#0E1A25` / `#1A73C8` au lieu de `#0f0f12`)
  - `privacy.html` et `cgu.html` : dates "mars 2026" → "avril 2026"
- 📝 **README actualisé** : tableau scores (15 → 24), protocoles (5 → 13), médicaments pondéraux (≈ 21 → 26). Ajout des nouveaux protocoles (entorse cheville, voie IO, territoires IDM, chocs), nouveaux scores (Genève, PERC, YEARS, sPESI, Blatchford, Glasgow pédiatrique, Killip, DFG, IMC), calculs (PCA/IVSE).
- ✅ Audits validés sans problème : routes de navigation, clés localStorage (8 clés propres), liens externes (38 domaines tous médicaux crédibles), console.log (1 seul légitime pour SW)
- ✅ versionCode 71

### v1.2.53 (avril 2026)
- ✅ **7 nouveaux scores cliniques** :
  - **Genève révisé (simplifié)** — probabilité clinique d'EP, alternative à Wells (Klok 2008)
  - **PERC** — Pulmonary Embolism Rule-out Criteria, exclusion EP patient faible risque (Kline 2004)
  - **YEARS** — algorithme moderne d'EP avec seuil D-dimères adapté (van der Hulle 2017)
  - **sPESI** — Simplified Pulmonary Embolism Severity Index, pronostic EP (Jiménez 2010)
  - **Blatchford (GBS)** — hémorragie digestive haute, risque d'intervention (Blatchford 2000)
  - **Glasgow pédiatrique** — adaptation pour enfants < 5 ans (Holmes 2005)
- ✅ **5 nouveaux médicaments** en doses pondérales adultes :
  - **Brevibloc (Esmolol)** — β-bloquant ultra-court IV
  - **Fentanyl** — morphinique urgence
  - **Fluimucil (N-acétylcystéine)** — antidote paracétamol
  - **Potassium (KCl)** — protocole IVSE
  - **Trandate (Labétalol)** — HTA grossesse / AVC
- ✅ **2 nouvelles annexes** (section 📖 Annexes / Gestes dans Protocoles) :
  - **Voie intra-osseuse** — sites de pose (adulte/enfant), technique EZ-IO, débits, contre-indications, complications (ERC 2021, SFAR 2021)
  - **Territoires des infarctus** — tableau complet dérivations ECG / artères coronaires + critères STEMI ESC 2023 + points clés (Sgarbossa, équivalent STEMI)
- ✅ Nouvelle section "🩸 Hémorragie digestive" dans le menu Scores
- ✅ Toutes les sources référencées dans la page Sources centrale avec liens PubMed
- ✅ 13 nouvelles entrées dans la recherche globale
- ✅ versionCode 70

### v1.2.52 (avril 2026)
- 🔧 **Hotfix navigation** : bouton retour manquant sur la page **PCA / IVSE** ajouté (retour vers Calculs de dose)
- 🔧 **Doses adulte** : correction du bouton retour qui pointait vers Médicaments au lieu de Calculs de dose
- 🔧 **Doses pédiatriques** : correction du bouton retour qui pointait vers Médicaments au lieu de Calculs de dose
- ✅ Audit complet des boutons retour sur les 40+ sous-pages — toutes les autres (scores, protocoles, entorse, normes, toxico, équivalences) étaient correctement ciblées
- ✅ versionCode 69

### v1.2.51 (avril 2026)
- ✅ **Page PCA / IVSE** : retrait du champ "Médicament (optionnel)" + ajout d'un toggle **mg / UI** en haut de la page qui change toutes les occurrences d'unité dynamiquement (labels, résultats, alertes)
- ✅ **Détection automatique de nouvelle version** (PWA + Android) :
  - Bannière fixée en haut de l'écran : "Nouvelle version disponible" + boutons "Plus tard" / "Mettre à jour"
  - **PWA** : écoute les événements `updatefound` du Service Worker. Le SW envoie `SKIP_WAITING` puis recharge automatiquement
  - **Android (WebView)** : fetch périodique de `version.json` sur GitHub Pages (check initial après 3 s + à chaque retour au premier plan). Comparaison avec `APP_VERSION_CODE` local. Redirige vers le Play Store si version distante plus récente
  - Mémorisation du refus par version (évite la réapparition infinie)
- ✅ **Service Worker réécrit** :
  - `CACHE_NAME` versionné (`urg-pocket-v1.2.51`) — bumpé à chaque release pour forcer le rafraîchissement
  - Stratégie **network-first pour la navigation** : la dernière version est toujours servie quand le réseau est disponible, fallback cache si hors-ligne
  - `version.json` toujours fetché en réseau (pas de cache)
  - Gestion du message `SKIP_WAITING` pour activation immédiate
- ✅ Nouveau fichier **`version.json`** à la racine GitHub Pages (versionCode, versionName, date de release, URL Play Store, changelog)
- ✅ Nouvelle constante `APP_VERSION_CODE = 68` côté JS pour la comparaison numérique
- ✅ versionCode 68

### v1.2.50 (avril 2026)
- ✅ **Mode daltonien étendu** : variables CSS sémantiques (`--sem-ok`, `--sem-warn`, `--sem-danger`) pour que les nouveaux composants (arbre décisionnel, classification 3 grades, traitement) s'adaptent automatiquement au mode daltonien (palette Wong 2011)
- ✅ **Refonte du menu Protocoles** en 7 catégories logiques :
  - 🫀 Urgences vitales — Réa CP (ACR adulte, ACR pédiatrique)
  - ❤️ Urgences cardiovasculaires (Douleur thoracique / SCA)
  - 🧠 Urgences neurologiques (AVC)
  - 🩸 Chocs (Anaphylactique, Septique, Hémorragique, Hypovolémique)
  - 🚑 Traumatologie (Trauma grave — ABCDE)
  - 🩹 Hématologie / Transfusion (Protocole transfusionnel)
  - 🦴 Orthopédie (Entorse cheville)
- ✅ Renommage "Trauma grave — arbre décisionnel" → "Trauma grave — ABCDE" (plus honnête, c'était une check-list)
- ✅ **Refonte page Doses → "Calculs de dose"** : bouton PCA / IVSE remonté dans la première section (plus accessible), 2 sections claires (Doses pondérales & seringue / Débit de perfusion)
- ✅ **Page d'accueil** : suppression du bouton fantôme "Débit perf" (redirigeait vers Doses), retrait du doublon "Doses pondérales", remplacé par un bouton unique "Calculs de dose"
- ✅ **Bottom-nav** : bouton "Débit" retiré (redondant), "Doses" renommé "Calculs"
- ✅ **Sourcing renforcé** : sources Entorse cheville ajoutées à la page Sources centrale (liens Stiell JAMA 1993, Bastin UCLouvain 2016, KCE 197BS), notes "Sources" en bas de chaque sous-page entorse
- ✅ versionCode 67

### v1.2.49 (avril 2026)
- ✅ Nouveau protocole : **Entorse cheville** (section 🦴 Orthopédie dans Protocoles)
- ✅ Structure multi-pages : index + arbre diagnostique + classification 3 grades + traitement
- ✅ Composant réutilisable `decision-tree` (arbre décisionnel hybride : nœuds cliquables avec branches Oui/Non/Doute)
- ✅ Arbre diagnostique imagerie — Ottawa, RX standard, TDM, IRM, échographie (5 nœuds cliquables)
- ✅ Classification en 3 grades (tableau signes cliniques)
- ✅ Traitement par grade + GREC + réévaluation J3-J5
- ✅ 4 entrées ajoutées à la recherche globale
- ✅ Sources : Ottawa (Stiell JAMA 1993), Bastin UCLouvain 2016, Kerkhoffs Cochrane 2013, KCE 197BS 2013, de Lécluse 2003
- ✅ versionCode 66

### v1.2.45 (avril 2026)
- ✅ Score Algoplus — douleur aiguë PA non communicant (5 items binaires, seuil ≥ 2/5, anneau coloré)
- ✅ Score Doloplus-2 — douleur chronique PA non communicant (10 items 0–3, seuil ≥ 5/30, anneau coloré)
- ✅ Section 😣 Douleur dans l'écran Scores
- ✅ Fix rendu anneaux colorés Algoplus/Doloplus (class="score-result", valeur initiale "—")
- ✅ versionCode 62

### v1.2.44 (avril 2026)
- ✅ Nouveau thème graphique — fond clair #EDF1F7, fond sombre bleu-nuit #0E1A25, primaire #1A73C8
- ✅ Suppression de toute référence au CNPA dans l'app et la documentation
- ✅ Palette d'accents mise à jour — Rouge, Orange, Or #D79A10, Vert, Bleu (défaut), Violet
- ✅ versionCode 61

### v1.2.43 (avril 2026)
- ✅ Révision complète des ~100 fiches non-urgence — corrections sourcées RCP ANSM / ESC 2023 / GIHP 2024
- ✅ Corrections : Gentamicine (3–8 mg/kg), Clopidogrel/Plavix (ESC 2023), Kardegic/Aspirin (150–300 mg), Efient (CI AVC/AIT), Ciflox (IVL 60 min), Lovenox (STEMI), Fraxiparine (95 UI/kg), Diazepam (IM éviter), Augmentin
- ✅ versionCode 60

### v1.2.42 (avril 2026)
- ✅ Révision fiches urgences vitales — Naloxone (titration 0,04 mg, renarcotisation), Prodilantin (20 mg EP/kg), Rivotril (0,015 mg/kg), Solumedrol (posologies par indication), Adénosine (distinction Striadyne/ATP)
- ✅ versionCode 59

### v1.2.41 (avril 2026)
- ✅ Fiche APROVEL (Irbésartan) — fiche complète + entrée Princeps→DCI
- ✅ versionCode 58

### v1.2.40 (avril 2026)
- ✅ Fiches médicaments complètes — 228 fiches (couverture totale de la liste Princeps→DCI)
- ✅ versionCode 57

### v1.2.39 (avril 2026)
- ✅ Fiches médicaments — 167 fiches : Amiodarone, Bridion, Buscopan, Doliprane, Flagyl, Haldol, Intralipide, Kardegic, Largactil, Lovenox, Mannitol, Metiblo, Nesdonal, Nipride, Nozinan, Ondansétron, Pantoprazole, Plavix, Pradaxa, Praxbind, Rocéphine, Solupred, Tavanic, Tazocilline, Ticagrélor, Tienam, Vogalène, Voltarène, Xarelto, Xylocard, Eliquis, Préviscan + fiches minimales
- ✅ versionCode 56

### v1.2.38 (avril 2026)
- ✅ Sous-onglets 💊 Fiches / 🔄 Équivalences dans l'écran Médicaments
- ✅ versionCode 55

### v1.2.37 (avril 2026)
- ✅ Liste Princeps→DCI étendue à 203 entrées (urgences hospitalières)
- ✅ versionCode 54


# Urg Pocket

**Aide-mémoire médical pour les équipes SAMU / SMUR**

Application HTML single-file conçue pour les urgentistes, SMUR et équipes préhospitalières. Fonctionne hors ligne, sans compte, sans collecte de données.

---

## Accès rapide

- **Application** : [max54130.github.io/urg-pocket](https://max54130.github.io/urg-pocket/)
- **Politique de confidentialité** : [privacy.html](https://max54130.github.io/urg-pocket/privacy.html)
- **CGU** : [cgu.html](https://max54130.github.io/urg-pocket/cgu.html)
- **Contact** : urgpocket@gmail.com

---

## Contenu v1.2.34

### Scores cliniques (15)

| Score | Domaine | Affichage |
|-------|---------|-----------| 
| Glasgow | Neuro / Conscience | Anneau coloré |
| NIHSS | Neuro / AVC | Anneau coloré |
| NEWS2 | Dégradation clinique | Anneau coloré |
| HEART | Cardio / SCA | Anneau coloré |
| Shock Index | Cardio / Hémodynamique | Anneau coloré |
| Wells EP | Thrombose / EP | Anneau coloré |
| Vittel | Trauma grave | Anneau coloré |
| qSOFA | Infectio / Sepsis | Anneau coloré |
| APGAR | Néonatal | Anneau coloré |
| Malinas | Obstétrique | Anneau coloré |
| Cushman | Sevrage alcoolique | Anneau coloré |
| Braden | Risque escarre | Anneau coloré |
| **DFG / CKD-EPI 2021** | Fonction rénale | Anneau coloré |
| **IMC / Surface (Mosteller)** | Anthropométrie | Anneau coloré |
| **Killip** | IC post-SCA | Anneau coloré |

Tous les scores démarrent vierges — aucune valeur pré-remplie au chargement.

### Protocoles d'urgence
- ACR adulte (ERC 2025)
- ACR pédiatrique (AFGSU/ERC 2025)
- Choc anaphylactique (RFE SFMU 2016)
- AVC — Alerte et orientation (HAS + SFMU/SFNV 2024)
- Douleur thoracique / SCA (ESC 2023)

### Autres modules
- Débit de perfusion
- Normes biologiques (adulte + pédiatrique)
- Toxicologie : 52 antidotes + 112 doses toxiques
- Doses pondérales
- Convertisseur biologique (6 molécules, bouton ⇄)
- Constantes vitales par population
- Ordre de prélèvement des tubes
- Sources médicales complètes (15 scores avec liens officiels)

---

## Changelog

### v1.2.34 (avril 2026)
- ✅ Recherche insensible aux accents (antidotes, fiches médicaments, doses toxiques)
- ✅ DEP/Peak Flow — cercle et couleur AAG corrigés (violet < 33%)
- ✅ Anticoagulants — Préviscan®, Sintrom®, AVK ajoutés dans catégorie dédiée
- ✅ versionCode 50


### v1.2.22 (avril 2026)
- ✅ Fiches médicaments — onglets fonctionnels (Indication / Prescription / Préparation / Surveillance)
- ✅ Onglet Sources mis à jour — fiches médicaments, équivalence des voies, ANSM/Vidal/SFAR
- ✅ versionCode 39


### v1.2.20 (avril 2026)
- ✅ Correction définitive boucle infinie sur l'accueil (corruption JS doseRefs)
- ✅ Reconstruction complète depuis base stable v1.2.13
- ✅ Module Fiches médicaments — 73 molécules SAMU/SMUR (4 onglets)
- ✅ Doses adulte — sélecteur molécule + calcul automatique selon poids
- ✅ Doses pédiatriques — interface unifiée, 17 molécules, alertes dose max
- ✅ Équivalence des voies IV/IM/SC/PO — 6 molécules
- ✅ Menu Doses restructuré en 3 entrées
- ✅ versionCode 37


### v1.2.14 (avril 2026)
- ✅ Doses reorganisé en menu de navigation (Adulte / Pédiatrique / Équivalence)
- ✅ Nouveau : Équivalence des voies IV/IM/SC/PO (6 molécules)
- ✅ Nouveau : Doses pédiatriques avec calcul auto selon poids (18 molécules)
- ✅ versionCode 31

### v1.2.13 (mars 2026)
- ✅ Glasgow — mode patient non communiquant (verbal exclu, score /10)
- ✅ versionCode 30


### v1.2.12 (mars 2026)
- ✅ Alcoolémie ajoutée dans le tube gris
- ✅ Protocoles : termes médicaux abrégés explicités (FV, TV, BAVU, IO, PCI, UNV, HNF, HBPM…)
- ✅ Ballonnet → angioplastie (PCI) dans le protocole SCA
- ✅ versionCode 29


### v1.2.11 (mars 2026)
- ✅ Acceptation des CGU obligatoire au lancement et à chaque mise à jour
- ✅ Encart confidentialité permanent sur l'accueil
- ✅ Bouton retour CGU/Privacy corrigé (sticky + safe-area)
- ✅ Vouvoiement dans la section Contact
- ✅ versionCode 28


### v1.2.9 (mars 2026)
- ✅ Photo de profil et prénom/pseudo (Paramètres → Identité)
- ✅ Avatar circulaire dans la topbar avec clic vers Paramètres
- ✅ Stockage 100% local (localStorage, aucune donnée transmise)
- ✅ versionCode 26

### v1.2.8 (mars 2026)
- ✅ Mode daltonien complet (Paramètres → Accessibilité) — palette Wong 2011
- ✅ Bandeaux explicites ✓ NORMAL / ⚠ ATTENTION / ✕ CRITIQUE sur tous les résultats
- ✅ versionCode 25

### v1.2.6 (mars 2026)
- ✅ Mode daltonien complet (Paramètres → Accessibilité) — palette Wong 2011, bandeaux ✓/⚠/✕
- ✅ 3 nouveaux calculs : DFG/CKD-EPI 2021, IMC/Surface corporelle (Mosteller), Killip
- ✅ Tous les scores vierges au chargement — option "— Sélectionner —" + guards null
- ✅ Couleur d'accent Or (#D79A10) — palette ordonnée selon spectre lumineux
- ✅ Sources médicales complètes pour les 15 scores (liens vers références officielles)
- ✅ Reset profil depuis les Paramètres (↺ Réafficher le choix de profil)
- ✅ Nom de fichier GitHub fixe : `urg_pocket.html` (indépendant de la version)
- ✅ Nettoyage code JS orphelin (CHA₂DS₂-VASc, Cockcroft-Gault sans screen)
- ✅ versionCode 26

### v1.2.5 (mars 2026)
- ✅ Dialog native Android pour confirmation quitter l'app (AlertDialog)
- ✅ Bouton retour Android fonctionnel sur toutes les pages
- ✅ Descriptions courtes sur les 12 pages de score
- ✅ Correction version affichée dans "À propos"
- ✅ versionCode 26

### v1.2.0 (mars 2026)
- ✅ Anneaux de score (Glasgow, NEWS2, qSOFA) — fond sombre, cercle coloré, pill risque
- ✅ Splash screen animé au démarrage
- ✅ Système de profils médecin / paramédical
- ✅ Navigation retour Android hiérarchique
- ✅ Logo topbar cliquable → accueil
- ✅ PWA : manifest + Service Worker offline (GitHub Pages uniquement)
- ✅ Fix bug espace blanc (div déséquilibrés dans screen-scores)
- ✅ Fix status bar Android 15 edge-to-edge

### v1.1.0 (mars 2026)
- 6 nouveaux scores : Wells EP, NIHSS, HEART, Vittel, Shock Index, Malinas
- Menu scores réorganisé par catégories
- Section Paramètres enrichie

---

## Structure du dépôt

```
urg-pocket/
├── index.html           ← entrée GitHub Pages (redirect vers urg_pocket.html)
├── urg_pocket.html      ← application principale (single-file, nom fixe)
├── manifest.json        ← PWA manifest
├── sw.js                ← Service Worker offline (GitHub Pages uniquement)
├── cgu.html             ← CGU (12 articles)
├── privacy.html         ← Politique de confidentialité (RGPD/CNIL)
├── icons/
│   ├── icon-192.png     ← icône PWA
│   └── icon-512.png     ← icône Play Store
└── README.md
```

> ⚠️ Le fichier principal s'appelle toujours `urg_pocket.html` — ne jamais le renommer avec un numéro de version.

---

## Déploiement GitHub Pages

1. Pousser tous les fichiers sur la branche `main`
2. Settings → Pages → Source : `main` / `/ (root)`
3. URL : `https://max54130.github.io/urg-pocket/`

## Android Studio

- `WebViewAssetLoader` — sert le HTML via `https://urgpocket.app/`
- `AndroidBridge` — `showExitDialog()` + `confirmExit()` exposés via `window.Android`
- Bouton retour → `evaluateJavascript("handleBackPress()")` → JS gère la navigation
- `targetSdk 35`, `compileSdk 35`, `minSdk 26` (Android 8.0+)
- Edge-to-edge : `env(safe-area-inset-top)` en CSS

---

## Hiérarchie de navigation (bouton retour Android)

```
home
├── scores
│   ├── score-glasgow / news2 / qsofa / braden / apgar / cushman
│   ├── score-wells-ep / nihss / heart / vittel / shockindex / malinas
│   └── dfg / imc / killip
├── normes → norme-detail
├── protocoles → proto-acr / proto-acr_ped / proto-anaphylaxie / proto-avc / proto-douleur_tho
├── antidotes → toxico-antidotes / toxico-doses
└── debit / tubes / doses / convertisseur / constped / sources / settings
```

---

## Versions

| versionCode | versionName | Statut |
|-------------|-------------|--------|
| 51 | 1.2.34 | **Build actuel** |
| 24 | 1.2.7 | Publié Play Store |
| 23 | 1.2.6 | Publié Play Store |
| 22 | 1.2.5 | Publié Play Store |
| 21 | 1.2.4 | Publié Play Store |

> La prochaine release Play Store doit utiliser versionCode **≥ 52**.

---

## Sources médicales

| Source | Utilisation |
|--------|-------------|
| **ERC 2025** | ACR adulte et pédiatrique |
| **SFMU / Toxin** | Protocoles, antidotes, doses toxiques (Pr Danel, Grenoble, 2019) |
| **SFAR** | Anesthésie-réanimation, doses pondérales |
| **HAS** | AVC, DFG, recommandations nationales |
| **ESC 2023** | SCA, HEART, Wells EP, Killip |
| **RCP** | NEWS2 |
| **JAMA / Sepsis-3** | qSOFA (2016) |
| **ACOG** | Score APGAR |
| **KDIGO / NKF** | DFG CKD-EPI 2021 |
| **OMS** | IMC |
| **SFA / SFMU** | Cushman (sevrage alcoolique) |
| **CLSI GP41** | Ordre de prélèvement des tubes |

---

## Avertissement

Urg Pocket est un **aide-mémoire** destiné aux professionnels de santé. Il ne constitue pas un dispositif médical et ne remplace pas le jugement clinique, les protocoles de service ni la formation. Les posologies doivent être vérifiées avant toute administration.

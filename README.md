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

## Contenu v1.2.3

### Scores cliniques

| Score | Domaine | Affichage |
|-------|---------|-----------|
| Glasgow | Neuro / Conscience | Anneau coloré |
| NIHSS | Neuro / AVC | Standard |
| NEWS2 | Cardio / Dégradation | Anneau coloré |
| HEART | Cardio / SCA | Standard |
| Shock Index | Cardio / Hémodynamique | Standard |
| Wells EP | Thrombose / EP | Standard |
| Vittel | Trauma | Standard |
| qSOFA | Infectio / Sepsis | Anneau coloré |
| APGAR | Néonatal | Standard |
| Malinas | Obstétrique | Standard |
| Cushman | Thrombose | Standard |
| Braden | Escarre | Standard |

### Protocoles d'urgence
- ACR adulte (ERC 2025)
- ACR pédiatrique (AFGSU/ERC 2025)
- Choc anaphylactique
- AVC — Alerte et orientation
- Douleur thoracique / SCA (ESC 2023)

### Autres modules
- Débit de perfusion
- Normes biologiques (adulte + pédiatrique)
- Toxicologie : 52 antidotes + 112 doses toxiques
- Doses pondérales
- Convertisseur biologique
- Constantes vitales par population
- Ordre de prélèvement des tubes
- Sources (ERC 2025, SFMU, SFAR, HAS, ESC 2023)

---

## Changelog

### v1.2.3 (mars 2026)

**Fonctionnalités**
- ✅ Anneaux de score animés sur Glasgow, NEWS2, qSOFA (fond sombre, cercle coloré, pill niveau de risque)
- ✅ Splash screen animé au démarrage
- ✅ Système de profils médecin / paramédical (overlay premier lancement + toggle Paramètres)
- ✅ Navigation retour Android — bouton retour remonte dans la hiérarchie des pages jusqu'à l'accueil, dialogue de confirmation pour quitter
- ✅ Logo cliquable dans la topbar → retour accueil
- ✅ CSS scores amélioré : items sélectionnés avec bordure gauche colorée + fond teinté
- ✅ PWA : manifest + Service Worker (offline, actif uniquement sur GitHub Pages)

**Corrections**
- ✅ Fix bug espace blanc sur toutes les pages (cause : `</div>` en trop dans `screen-scores` et manquant dans `screen-toxico-doses` — le navigateur sortait les sections du flux)
- ✅ Fix status bar Android 15 (edge-to-edge, targetSdk 35)
- ✅ Logo topbar corrigé — SVG fidèle à l'icône (cercle `var(--primary)`, croix blanche, ECG bleu foncé pixel-perfect)
- ✅ Email Cloudflare obfuscation supprimé (CGU + privacy)
- ✅ CGU et privacy complétées (articles 11-12, droit applicable, RGPD/CNIL)
- ✅ Service Worker conditionnel au domaine GitHub Pages (supprime l'erreur 404 en local)

### v1.2.0 (mars 2026)
- 6 nouveaux scores : Wells EP, NIHSS, HEART, Vittel, Shock Index, Malinas
- Menu scores réorganisé par catégories (Neuro, Cardio, Trauma, Infectio, Spécialisés)
- Section Paramètres enrichie (À propos, Contact, Disclaimer, CGU, Privacy)
- Sources mises à jour ERC 2025

---

## Structure du dépôt

```
urg-pocket/
├── index.html              ← entrée GitHub Pages (redirect)
├── urg_pocket_v1.2.0.html  ← application principale (single-file)
├── manifest.json           ← PWA manifest
├── sw.js                   ← Service Worker (offline, GitHub Pages uniquement)
├── cgu.html                ← Conditions Générales d'Utilisation (12 articles)
├── privacy.html            ← Politique de confidentialité (RGPD)
├── icons/
│   ├── icon-192.png        ← icône PWA
│   └── icon-512.png        ← icône Play Store
└── README.md
```

---

## Déploiement GitHub Pages

1. Pousser tous les fichiers sur la branche `main`
2. Dans Settings → Pages → Source : `main` / `/ (root)`
3. L'application sera disponible sur `https://max54130.github.io/urg-pocket/`

## APK Android

Le projet Android Studio utilise :
- `WebViewAssetLoader` — sert le HTML via `https://urgpocket.app/` (pas `file://`)
- `OnBackPressedDispatcher` + `AndroidBridge` — délègue la navigation retour au JS (`handleBackPress()`)
- `targetSdk 35` — edge-to-edge Android 15, status bar gérée via `env(safe-area-inset-top)`
- `compileSdk 35`, `minSdk 26` (Android 8.0+)

---

## Hiérarchie de navigation (bouton retour Android)

```
home
├── scores
│   ├── score-glasgow
│   ├── score-news2
│   ├── score-qsofa
│   ├── score-braden / apgar / cushman / heart / nihss / ...
│   └── score-wells-ep / vittel / shockindex / malinas
├── normes
│   └── norme-detail
├── protocoles
│   ├── proto-acr / proto-acr_ped
│   ├── proto-anaphylaxie / proto-avc / proto-douleur_tho
├── antidotes
│   ├── toxico-antidotes
│   └── toxico-doses
└── debit / tubes / doses / convertisseur / constped / sources / settings
```

---

## Sources médicales

- **ERC 2025** — European Resuscitation Council Guidelines
- **SFMU** — Société Française de Médecine d'Urgence
- **SFAR** — Société Française d'Anesthésie-Réanimation
- **HAS** — Haute Autorité de Santé
- **ESC 2023** — European Society of Cardiology
- **AFGSU** — Attestation de Formation aux Gestes et Soins d'Urgence

---

## Avertissement

Urg Pocket est un **aide-mémoire** destiné aux professionnels de santé. Il ne constitue pas un dispositif médical et ne remplace pas le jugement clinique, les protocoles de service ni la formation. Les posologies doivent être vérifiées avant toute administration.

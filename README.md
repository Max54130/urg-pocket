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

## Contenu v1.2.0

### Scores cliniques
| Score | Domaine |
|-------|---------|
| Glasgow | Neuro / Conscience |
| NIHSS | Neuro / AVC |
| NEWS2 | Cardio / Dégradation |
| HEART | Cardio / SCA |
| Shock Index | Cardio / Hémodynamique |
| Wells EP | Thrombose / EP |
| Vittel | Trauma |
| qSOFA | Infectio / Sepsis |
| APGAR | Néonatal |
| Malinas | Obstétrique |
| Cushman | Thrombose |
| Braden | Escarre |

### Protocoles d'urgence
- ACR adulte (ERC 2025)
- ACR pédiatrique (AFGSU/ERC 2025)
- Choc anaphylactique
- AVC — Alerte et orientation
- Douleur thoracique / SCA (ESC 2023)
- **Trauma grave** — Critères Vittel + ABC + orientation centre trauma *(nouveau v1.2.0)*

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

### v1.2.0 (mars 2026)
- ✅ Nouveau protocole **Trauma grave** (Vittel + ABC + orientation)
- ✅ CSS scores amélioré : bordure gauche colorée sur items sélectionnés, badges résultat vert/orange/rouge
- ✅ Splash screen animé
- ✅ Système de profils médecin / paramédical
- ✅ Fix bug espace vide sur écrans scores (navigation)
- ✅ Fix status bar Android 15 (edge-to-edge, targetSdk 35)
- ✅ PWA : manifest + Service Worker offline
- ✅ Email Cloudflare obfuscation supprimé

### v1.1.0 (mars 2026)
- 6 nouveaux scores : Wells EP, NIHSS, HEART, Vittel, Shock Index, Malinas
- Menu scores réorganisé par catégories
- Section Paramètres enrichie (À propos, Contact, Disclaimer, CGU, Privacy)
- Sources mises à jour ERC 2025

---

## Structure du dépôt

```
urg-pocket/
├── index.html              ← entrée GitHub Pages (redirect)
├── urg_pocket_v1.2.0.html  ← application principale (single-file)
├── manifest.json           ← PWA manifest
├── sw.js                   ← Service Worker (offline)
├── cgu.html                ← Conditions Générales d'Utilisation
├── privacy.html            ← Politique de confidentialité
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── README.md
```

---

## Déploiement GitHub Pages

1. Pousser tous les fichiers sur la branche `main`
2. Dans Settings → Pages → Source : `main` / `/ (root)`
3. L'application sera disponible sur `https://<username>.github.io/urg-pocket/`

## APK Android

Le projet Android Studio (`urg-pocket-android/`) utilise :
- `WebViewAssetLoader` pour servir le fichier local
- `OnBackPressedDispatcher` pour la navigation retour
- `targetSdk 35` avec gestion edge-to-edge (status bar via `env(safe-area-inset-top)`)

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

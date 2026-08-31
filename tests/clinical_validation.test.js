/**
 * Urg Pocket — Suite de tests unitaires et de validation clinique automatisée
 * Exécutable via `node tests/clinical_validation.test.js` ou `npm test`
 */

const assert = require('assert');

console.log('====================================================');
console.log('  URG POCKET — VALIDATION CLINIQUE ET ALGORITHMIQUE ');
console.log('====================================================\n');

let passedTests = 0;
let totalTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(`    Erreur: ${err.message}`);
  }
}

/* ==========================================================================
   1. CALCULS RÉNNAUX & HYDRO-ÉLECTROLYTIQUES
   ========================================================================== */
console.log('--- 1. CALCULS RÉNNAUX & BIOLOGIQUES ---');

// Cockcroft-Gault : ClCr = ((140 - age) * poids * k) / creat_umol
// k = 1.23 pour homme, 1.04 pour femme
function calcCockcroft(age, poids, creatUmol, sexe) {
  if (!(age > 0) || !(poids > 0) || !(creatUmol > 0)) return null;
  const k = sexe === 'femme' ? 1.04 : 1.23;
  return ((140 - age) * poids * k) / creatUmol;
}

test('Cockcroft-Gault — Homme 70 ans, 70 kg, créat 100 µmol/L', () => {
  const cl = calcCockcroft(70, 70, 100, 'homme');
  assert.strictEqual(Math.round(cl), 60); // (70 * 70 * 1.23) / 100 = 60.27
});

test('Cockcroft-Gault — Femme 65 ans, 60 kg, créat 90 µmol/L', () => {
  const cl = calcCockcroft(65, 60, 90, 'femme');
  assert.strictEqual(Math.round(cl), 52); // (75 * 60 * 1.04) / 90 = 52.00
});

// CKD-EPI 2021 (sans variable ethnique)
// Scr en mg/dL (1 mg/dL = 88.4 µmol/L)
function calcCkdEpi2021(age, creatUmol, sexe) {
  const scr = creatUmol / 88.4;
  const isFemale = sexe === 'femme';
  const kappa = isFemale ? 0.7 : 0.9;
  const alpha = isFemale ? -0.241 : -0.302;
  const minRatio = Math.min(scr / kappa, 1);
  const maxRatio = Math.max(scr / kappa, 1);
  const genderMult = isFemale ? 1.012 : 1.0;
  return 142 * Math.pow(minRatio, alpha) * Math.pow(maxRatio, -1.2) * Math.pow(0.9938, age) * genderMult;
}

test('CKD-EPI 2021 — Homme 50 ans, créat 80 µmol/L (~0.905 mg/dL)', () => {
  const dfg = calcCkdEpi2021(50, 80, 'homme');
  assert.ok(dfg > 95 && dfg < 110, `DFG calculé ${dfg} doit être normal (>95)`);
});

test('CKD-EPI 2021 — Femme 75 ans, créat 180 µmol/L (Insuffisance rénale sévère)', () => {
  const dfg = calcCkdEpi2021(75, 180, 'femme');
  assert.ok(dfg < 30 && dfg > 20, `DFG calculé ${dfg} doit être entre 20 et 30 mL/min/1.73m²`);
});

// Calcémie corrigée : Ca_corr (mmol/L) = Ca_mesure (mmol/L) + 0.02 * (40 - Albumin_g/L)
function calcCaCorrigee(caMmol, albG_L) {
  if (caMmol <= 0 || albG_L <= 0) return null;
  return caMmol + 0.02 * (40 - albG_L);
}

test('Calcémie corrigée — Hypoalbuminémie (Ca 2.0 mmol/L, Albumin 25 g/L)', () => {
  const caCorr = calcCaCorrigee(2.0, 25);
  // 2.0 + 0.02 * (40 - 25) = 2.0 + 0.30 = 2.30 mmol/L (normocalcémie réelle)
  assert.strictEqual(Math.round(caCorr * 100) / 100, 2.30);
});

// Trou Anionique : TA = (Na + K) - (Cl + HCO3) ou Na - (Cl + HCO3)
function calcTrouAnionique(na, cl, hco3, k = 0) {
  return (na + k) - (cl + hco3);
}

test('Trou Anionique standard — Na 140, Cl 102, HCO3 24 (sans K)', () => {
  const ta = calcTrouAnionique(140, 102, 24);
  assert.strictEqual(ta, 14); // 140 - 126 = 14 (Normal 12-16)
});

test('Trou Anionique élevé (Acidocétose) — Na 135, Cl 95, HCO3 10', () => {
  const ta = calcTrouAnionique(135, 95, 10);
  assert.strictEqual(ta, 30); // 135 - 105 = 30 (Acidose à TA élevé)
});

/* ==========================================================================
   2. SCORES CARDIO-VASCULAIRES & CHOCS
   ========================================================================== */
console.log('\n--- 2. CARDIO-VASCULAIRE & ÉTATS DE CHOC ---');

// Shock Index = FC / PAS (Normal < 0.7, > 0.9 = risque choc occulte)
function calcShockIndex(fc, pas) {
  if (!(fc > 0) || !(pas > 0)) return null;
  return fc / pas;
}

test('Shock Index — Patient stable (FC 70, PAS 130)', () => {
  const si = calcShockIndex(70, 130);
  assert.ok(si < 0.7, `Shock index ${si} doit être < 0.7`);
});

test('Shock Index — Choc hémorragique compensé (FC 115, PAS 95)', () => {
  const si = calcShockIndex(115, 95);
  assert.ok(si > 1.0, `Shock index ${si} doit être > 1.0 (haut risque)`);
});

// HEART Score (0 à 10)
function evalHeartRisk(score) {
  if (score <= 3) return 'Faible';
  if (score <= 6) return 'Intermédiaire';
  return 'Élevé';
}

test('HEART Score — Seuils de stratification', () => {
  assert.strictEqual(evalHeartRisk(2), 'Faible');
  assert.strictEqual(evalHeartRisk(5), 'Intermédiaire');
  assert.strictEqual(evalHeartRisk(8), 'Élevé');
});

// Killip Classification IDM
function evalKillip(rales, poumonComplet, tasInf90, choc) {
  if (tasInf90 || choc) return 'IV';
  if (poumonComplet) return 'III';
  if (rales) return 'II';
  return 'I';
}

test('Killip — Stratification de gravité post-IDM', () => {
  assert.strictEqual(evalKillip(false, false, false, false), 'I');
  assert.strictEqual(evalKillip(true, false, false, false), 'II');
  assert.strictEqual(evalKillip(true, true, false, false), 'III');
  assert.strictEqual(evalKillip(true, true, true, true), 'IV');
});

/* ==========================================================================
   3. EMBOLIE PULMONAIRE (WELLS, GENÈVE, YEARS, sPESI, PERC)
   ========================================================================== */
console.log('\n--- 3. STRATIFICATION EMBOLIE PULMONAIRE ---');

// YEARS Algorithm
function evalYears(nbItems, ddimeres) {
  const seuil = nbItems === 0 ? 1000 : 500;
  if (isNaN(ddimeres)) return { decision: 'Doser D-dimères', seuil };
  if (ddimeres < seuil) return { decision: 'EP exclue', seuil };
  return { decision: 'Angio-TDM requis', seuil };
}

test('YEARS — 0 critère avec D-dimères à 750 ng/mL (<1000 ng/mL)', () => {
  const res = evalYears(0, 750);
  assert.strictEqual(res.decision, 'EP exclue');
});

test('YEARS — 1 critère avec D-dimères à 750 ng/mL (≥500 ng/mL)', () => {
  const res = evalYears(1, 750);
  assert.strictEqual(res.decision, 'Angio-TDM requis');
});

// sPESI (Simplified PESI) : 0 = Risque faible, >= 1 = Risque élevé
function evalSpesi(points) {
  return points === 0 ? 'Faible mortalité' : 'Risque élevé';
}

test('sPESI — Stratification pronostique', () => {
  assert.strictEqual(evalSpesi(0), 'Faible mortalité');
  assert.strictEqual(evalSpesi(1), 'Risque élevé');
  assert.strictEqual(evalSpesi(3), 'Risque élevé');
});

/* ==========================================================================
   4. BRÛLURES & PARKLAND (ADULTE & PÉDIATRIE)
   ========================================================================== */
console.log('\n--- 4. BRÛLURES & RÉANIMATION HYDRIQUE (PARKLAND) ---');

function calcParkland(poids, scbPourcent, isPed = false) {
  const totalMl24h = 4 * poids * scbPourcent;
  const first8h = totalMl24h / 2;
  const next16h = totalMl24h / 2;
  const seuilGrave = isPed ? 10 : 20;
  const isGrave = scbPourcent >= seuilGrave;
  return { totalMl24h, first8h, next16h, isGrave };
}

test('Parkland Adulte — 70 kg, 25% SCB', () => {
  const p = calcParkland(70, 25, false);
  assert.strictEqual(p.totalMl24h, 7000);
  assert.strictEqual(p.first8h, 3500);
  assert.strictEqual(p.isGrave, true);
});

test('Parkland Pédiatrique — 15 kg, 12% SCB (Seuil pédiatrique ≥ 10%)', () => {
  const p = calcParkland(15, 12, true);
  assert.strictEqual(p.totalMl24h, 720);
  assert.strictEqual(p.first8h, 360);
  assert.strictEqual(p.isGrave, true, 'Une brûlure ≥ 10% SCB chez l\'enfant doit être classée grave');
});

/* ==========================================================================
   5. NEUROLOGIE & SCORES DIVERS (GLASGOW, NIHSS, PRAM, MALINAS)
   ========================================================================== */
console.log('\n--- 5. NEUROLOGIE & SCORES DIVERS ---');

// Glasgow
function evalGlasgow(e, v, m) {
  const t = e + v + m;
  const grave = t <= 8;
  const modere = t >= 9 && t <= 12;
  const mineur = t >= 13;
  return { total: t, grave, modere, mineur };
}

test('Glasgow — Coma profond (E1 V1 M1 = 3)', () => {
  const g = evalGlasgow(1, 1, 1);
  assert.strictEqual(g.total, 3);
  assert.strictEqual(g.grave, true);
});

test('Glasgow — Patient vigile (E4 V5 M6 = 15)', () => {
  const g = evalGlasgow(4, 5, 6);
  assert.strictEqual(g.total, 15);
  assert.strictEqual(g.mineur, true);
});

// PRAM (Asthme pédiatrique : 0-3 Léger, 4-7 Modéré, 8-12 Sévère)
function evalPram(score) {
  if (score <= 3) return 'Léger';
  if (score <= 7) return 'Modéré';
  return 'Sévère';
}

test('PRAM — Évaluation gravité crise d\'asthme pédiatrique', () => {
  assert.strictEqual(evalPram(2), 'Léger');
  assert.strictEqual(evalPram(6), 'Modéré');
  assert.strictEqual(evalPram(10), 'Sévère');
});

// Malinas (Accouchement imminent si >= 8)
function evalMalinas(score) {
  if (score < 5) return 'Transport possible';
  if (score <= 7) return 'Réévaluer / Surveillance';
  return 'Accouchement imminent';
}

test('Malinas — Accouchement imminent (Score = 9)', () => {
  assert.strictEqual(evalMalinas(9), 'Accouchement imminent');
});

/* ==========================================================================
   6. CALCULATEURS DE DOSES & SÉCURITÉ PÉDIATRIQUE (DOSE CLAMPING)
   ========================================================================== */
console.log('\n--- 6. POSOLOGIES & SÉCURITÉ DOSE MAX (CLAMPING) ---');

function computeDose(poids, mgKg, maxDose = null) {
  if (poids <= 0 || mgKg <= 0) return { dose: 0, clamped: false };
  const raw = poids * mgKg;
  if (maxDose && raw > maxDose) {
    return { dose: maxDose, raw, clamped: true };
  }
  return { dose: raw, raw, clamped: false };
}

test('Dose pédiatrique Paracétamol — Enfant 15 kg (15 mg/kg)', () => {
  const res = computeDose(15, 15, 1000);
  assert.strictEqual(res.dose, 225);
  assert.strictEqual(res.clamped, false);
});

test('Dose pédiatrique avec dépassement max (ex: Kétamine 90 kg à 2 mg/kg, max 150 mg)', () => {
  const res = computeDose(90, 2, 150);
  assert.strictEqual(res.dose, 150, 'La dose doit être clampée à 150 mg');
  assert.strictEqual(res.clamped, true);
  assert.strictEqual(res.raw, 180);
});

/* ==========================================================================
   SYNTHÈSE
   ========================================================================== */
console.log('\n====================================================');
console.log(`  RÉSULTAT DES TESTS : ${passedTests} / ${totalTests} RÉUSSIS (${Math.round((passedTests / totalTests) * 100)}%)`);
console.log('====================================================\n');

if (passedTests === totalTests) {
  console.log('🎉 TOUTES LES FORMULES CLINIQUES SONT 100% CONFORMES !');
  process.exit(0);
} else {
  console.error('❌ CERTAINS TESTS ONT ÉCHOUÉ.');
  process.exit(1);
}

/**
 * Script de build pour PWA statique.
 * Lit MYNUMBER depuis .env et l'injecte dans script.js.
 * À lancer avant chaque déploiement : node build.js
 */
const fs = require('fs');
const path = require('path');

const root = path.dirname(__filename);
const envPath = path.join(root, '.env');
const templatePath = path.join(root, 'script.template.js');
const outputPath = path.join(root, 'script.js');

// Lecture et parsing de .env
function loadEnv() {
  if (!fs.existsSync(envPath)) {
    console.error('Erreur : fichier .env introuvable.');
    process.exit(1);
  }
  const content = fs.readFileSync(envPath, 'utf8');
  for (const line of content.split('\n')) {
    const m = line.match(/^\s*MYNUMBER\s*=\s*(.+?)\s*$/);
    if (m) {
      const val = m[1].replace(/^["']|["']$/g, '').trim();
      if (val) return val;
    }
  }
  console.error('Erreur : MYNUMBER non trouvé dans .env');
  process.exit(1);
}

// Vérification du template
if (!fs.existsSync(templatePath)) {
  console.error('Erreur : script.template.js introuvable.');
  process.exit(1);
}

const phone = loadEnv();
let code = fs.readFileSync(templatePath, 'utf8');
code = code.replace(/__MYNUMBER__/g, phone.replace(/\\/g, '\\\\').replace(/"/g, '\\"'));

fs.writeFileSync(outputPath, code);
console.log('Build OK : script.js généré avec MYNUMBER depuis .env');

# 🏗 Architecture & Structure des Données

Ce projet fonctionne sur une architecture **Statique** (HTML/CSS/JS) alimentée par des fichiers de données **JSON**.

## 📂 Arborescence

```
├── index.html       # Structure, header (spacer / titre / actions), calendrier, main, modales, footer
├── style.css        # Design (Thème Rose Gold), responsive (menu ⋯ mobile, supersets côte à côte)
├── script.js        # Logique (Calendrier, JSON, Chrono auto, WhatsApp, Check technique, PWA)
├── manifest.json    # PWA : nom, thème, icônes, mode standalone
├── favicon.svg      # Icône onglet
├── icon-192.png     # Icône PWA (Android + iOS)
├── icon-512.png     # Icône PWA (haute résolution)
├── sw.js            # Service Worker (cache, offline, stratégie JSON)
├── clients/
│   └── clientX.json # Fichiers clients individuels
```

## 🖥 Interface (résumé)

- **Header :** Grille 3 colonnes (spacer | titre + sous-titre centrés | menu ⋯). Pas de logo. Optionnel : barre de suivi à gauche (max. 3 objectifs : poids, taille, hanches, poitrine, cuisses, bras ; % dans la barre ; valeur la plus récente par horodatage ; vêtement test en texte). Menu : Ajouter à l'agenda, Focus, Mode sombre, Paramètres.
- **Calendrier :** Frise horizontale avec jours passés + à venir, nom court de la séance sous la date, badge ✓ pour les séances terminées.
- **Séance :** Cartes exercices en accordéon (noms en Josefin Sans). Supersets regroupés. Chrono repos et effort : clic pour pause/reprise. Modal RPE en fin d'exercice (sauf échauffement ; en superset uniquement sur le dernier exercice). Warm-up = cellule à part. Bouton « Recommencer la séance » en bas.

## 📝 Structure du fichier JSON (Règles strictes v2.0+)

Le fichier client ne contient plus une liste d'exercices à la racine, mais une liste de **séances** (`sessions`) datées.

### Les Champs Clés (séance)

* `sessions`: Tableau contenant les différentes séances.
* `date`: **OBLIGATOIRE** (format v2). Format strict **"AAAA-MM-JJ"** (Ex: "2024-05-21"). C'est ce qui permet d'afficher la séance le bon jour sur le calendrier.
* `id`: Identifiant unique pour la sauvegarde des charges et l'état "séance terminée" (ex: "s1_legs").
* `name`: Nom court de la séance (affiché sur le calendrier et en tête).
* `exercises`: Tableau d'exercices (ou de sections `type: "section"`).

### Les Champs Clés (exercice)

* `name`, `sets`, `reps`, `rest` (ex: "4", "6-8", "90s"). Optionnel : `charge`, `rpe_target`, `note_coach`, `image`.
* `reps` / `rest` peuvent être des tableaux pour varier par série.
* **Supersets :** `superset_type`: "start" | "middle" | "end".
* **Sections :** `{"type": "section", "title": "..."}`. Optionnel : `coach_notes`.
* Optionnel : `tempo`, `variation`, `alternative`, `warmup_sets`, `until_failure`, `check_technique`.
* Exercices au temps : `reps` = "45s" ou "1 min" → chrono d'effort (compte à rebours).

### Optionnel (racine / session)

* Racine : `clientName`, `programTitle`, `weeklyGoal`, `recovery_url`, `baseline_weight_kg` (poids de base pour le calcul d'objectif dans le header).
* Session : `nutrition_tip`, `session_intro`.

---

*Architecture 100% Statique - Hébergeable sur GitHub Pages.*

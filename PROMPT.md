# 🤖 Prompts pour Générateur IA (v2.7)

Utilise ce prompt pour transformer ta planification en fichier JSON compatible avec l’app **Mon Programme Coaching** (calendrier roulant, objectifs, Check ma technique, etc.).

---

## Le Prompt Maître

Copie-colle le bloc ci-dessous et remplace la dernière ligne par ton planning.

```
Agis comme un assistant technique pour mon application de coaching.
Je vais te donner un planning de séances avec des dates. Tu dois le convertir en JSON strict, sans commentaires.

RÈGLES RACINE :
- Inclus "clientName" et "programTitle".
- Optionnel : "weeklyGoal" = nombre de séances cibles par semaine (ex: 3) pour afficher "Objectif semaine : X/Y séances".
- Optionnel : "recovery_url" = URL YouTube pour la routine de récupération/stretching affichée les jours de repos.

RÈGLES SESSIONS :
- La racine doit contenir "sessions": [...].
- Chaque session doit avoir "date" au format strict "AAAA-MM-JJ" (Année-Mois-Jour).
- Chaque session doit avoir un "id" unique (ex: "s1_legs", "seance_push_1").
- Chaque session doit avoir "name" (ex: "Jambes & Fessiers") et "exercises": [...].
- Optionnel (session) : "nutrition_tip" = conseil nutritionnel affiché dans la modale de fin. "session_intro" = encadré doré en tête de séance (présentation, objectifs, etc.).

RÈGLES EXERCICES :
- Pour un titre de phase (ex: Échauffement), utilise {"type": "section", "title": "..."}. Optionnel : "coach_notes" = texte affiché au-dessus du titre dans l’encadré doré (ex: "Focus ouverture cage thoracique, respiration fluide.").
- Pour un exercice : "name", "sets", "reps", "rest" (ex: "4", "6-8", "90s"). Optionnel : "charge" (pré-remplit l'input kg), "rpe_target", "note_coach", "image" (URL ou YouTube). reps/rest peuvent être des tableaux (ex: ["10","8","6","6"]) pour varier par série.
- Supersets : "superset_type": "start" sur le 1er, "middle" sur les intermédiaires (circuits 3+ exos), "end" sur le dernier.
- Optionnel : "tempo", "variation", "alternative", "warmup_sets" (ex: 1 → affiche une cellule Warm-up avant les séries, modal 40%/60%/80%).
- Pour exercices au temps (gainage) : reps = "45s" ou "1 min" → chrono d'effort automatique.
- Pour "jusqu'à échec" : ajoute "until_failure": true et laisse "reps" ou mets une indication.
- Pour les exercices où la cliente envoie une vidéo de technique au coach : ajoute "check_technique": true (ouvre WhatsApp ; elle utilise l'icône caméra pour joindre la vidéo).

Pas de commentaires dans le JSON. Réponds uniquement avec le JSON valide.

Voici le planning à convertir :
[COLLER TES NOTES ICI]
```

---

## Exemple de consigne à coller

*Remplace la dernière ligne du prompt par quelque chose comme :*

- *"Sophie, Objectif Athlète Complet. Semaine du 10 février 2026. 3 séances par semaine. Lundi 10 : Jambes — Squat 4x6-8 RPE 8, Fentes bulgares 3x10, Leg curl 3x15 en superset avec Mollets. Mercredi 12 : Push — Développé couché 4x6, OHP 3x8, Dips 3x10. Vendredi 14 : Pull — Rowing 4x8, Tirage 3x10, Curl 3x12. Tu peux mettre check_technique sur Squat et Rowing."*

L’IA te renverra un JSON prêt à être enregistré dans `clients/sophie.json` (ou autre nom de fichier).

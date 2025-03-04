# Poker Hand Evaluator

## Description du Projet
Ce projet est un évaluateur de mains de poker développé en TypeScript, utilisant une approche de Développement Piloté par les Tests (Test-Driven Development - TDD).

## Structure du Projet
```
poker-hand-evaluator/
│
├── src/
│   ├── models/
│   │   ├── Card.ts       # Définition des cartes
│   │   └── Hand.ts       # Définition des mains de poker
│   │
│   └── services/
│       └── PokerHandEvaluator.ts  # Logique d'évaluation des mains
│
├── input.ts              # Script d'entrée pour comparer les mains
├── tsconfig.json         # Configuration TypeScript
└── README.md             # Ce fichier
```

## Prérequis
- Node.js
- TypeScript

## Installation
1. Clonez le dépôt
2. Installez les dépendances :
```bash
npm install
```

## Utilisation
Pour compiler et exécuter le script de comparaison de mains :
```bash
# Compiler le script TypeScript
tsc input.ts

# Exécuter le script
node input.js
```

### Format de Saisie des Cartes
Lors de l'exécution, vous serez invité à saisir les cartes au format :
`Rang_Couleur`

Exemples valides :
- `As_Coeur`
- `Roi_Pique`
- `10_Carreau`

## Règles du Poker

### Cartes
- 52 cartes : 4 couleurs (Cœur, Carreau, Trèfle, Pique) et 13 rangs (2, 3, 4, 5, 6, 7, 8, 9, 10, Valet, Dame, Roi, As)
- Une main de poker est composée de 5 cartes

### Types de mains (du plus fort au plus faible)

1. **Quinte Flush Royale** (Royal Flush)
   - Une suite de As, Roi, Dame, Valet, 10 de la même couleur
   - Exemple : As♥ Roi♥ Dame♥ Valet♥ 10♥

2. **Quinte Flush** (Straight Flush)
   - Cinq cartes de la même couleur qui se suivent
   - Exemple : 9♠ 8♠ 7♠ 6♠ 5♠
   - L'As peut former une quinte basse : As, 2, 3, 4, 5

3. **Carré** (Four of a Kind)
   - Quatre cartes de même rang
   - Exemple : 7♥ 7♦ 7♠ 7♣ 9♥
   - En cas d'égalité : le carré le plus élevé gagne

4. **Full** (Full House)
   - Un brelan (trois cartes de même rang) et une paire
   - Exemple : 10♥ 10♦ 10♠ 4♣ 4♥
   - En cas d'égalité : comparer d'abord le brelan, puis la paire

5. **Couleur** (Flush)
   - Cinq cartes de la même couleur (non consécutives)
   - Exemple : As♣ 10♣ 7♣ 6♣ 2♣
   - En cas d'égalité : comparer la carte la plus haute, puis la suivante, etc.

6. **Quinte** (Straight)
   - Cinq cartes qui se suivent (pas de la même couleur)
   - Exemple : 9♥ 8♣ 7♠ 6♦ 5♥
   - L'As peut former une quinte haute (10, V, D, R, A) ou basse (A, 2, 3, 4, 5)
   - En cas d'égalité : la quinte avec la carte la plus haute gagne

7. **Brelan** (Three of a Kind)
   - Trois cartes de même rang
   - Exemple : 8♥ 8♦ 8♠ K♣ 3♦
   - En cas d'égalité : le brelan le plus élevé gagne

8. **Deux Paires** (Two Pair)
   - Deux paires de cartes de même rang
   - Exemple : J♥ J♣ 4♠ 4♥ A♦
   - En cas d'égalité : comparer la paire la plus haute, puis la seconde paire, puis la carte restante

9. **Paire** (One Pair)
   - Deux cartes de même rang
   - Exemple : 10♥ 10♣ K♠ 4♥ 3♦
   - En cas d'égalité : comparer la paire, puis les cartes restantes par ordre décroissant

10. **Carte Haute** (High Card)
    - Aucune combinaison ci-dessus
    - En cas d'égalité : comparer la carte la plus haute, puis la suivante, etc.

### Départage en cas d'égalité
- Pour les mains de même type, on départage en comparant les cartes par ordre de valeur
- L'ordre des rangs (du plus faible au plus fort) : 2, 3, 4, 5, 6, 7, 8, 9, 10, Valet, Dame, Roi, As

## Tests
Les tests sont implémentés dans les fichiers `.test.ts` dans le dossier `src`.
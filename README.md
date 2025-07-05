# Tic Tac Toe avec BOBY (IA)

Un jeu de Tic Tac Toe pour le defi du semaine 5 de [OPENDEV MADA](https://www.facebook.com/profile.php?id=61576678558068), TYPESCRIPT, HTML et CSS où vous affrontez BOBY, une IA imbattable !

## Fonctionnalités principales

- Jouez contre une IA utilisant l’algorithme Minimax (impossible à battre)
- Règle spéciale : en cas de match nul, une case occupée est supprimée au hasard et la partie continue
- Bouton "Rejouer" centré qui apparaît à la fin de la partie

## Démarrage rapide

### 1. Installation

Assurez-vous d’avoir [Node.js](https://nodejs.org/) installé.

```bash
pnpm install
```

### 2. Compilation TypeScript

Compilez le code TypeScript :

```bash
npx tsc
```

### 3. Lancez le jeu

```bash
pnpm run build
```

Ouvrez `index.html` dans votre navigateur préféré.

---

## Structure du projet

- `index.html` : structure HTML du jeu et inclusion du script compilé
- `styles.css` : styles et animations
- `src/main.ts` : toute la logique du jeu (IA, règles, gestion du plateau...)
- `assets/image.png` : logo OPENDEV MADA affiché en haut de page

## Règles du jeu

- Alignez 3 symboles pour gagner
- Vous jouez contre BOBY (l’IA imbattable)
- S’il y a match nul, une case occupée est supprimée au hasard et la partie continue !

## Auteur

Projet réalisé avec ❤️ par [RDH](https://github.com/RDH36)

---

N’hésitez pas à forker, améliorer ou proposer des idées !

Laissez une étoile si vous avez aimé le projet !

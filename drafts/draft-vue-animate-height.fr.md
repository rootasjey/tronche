# Le piège `scrollHeight` avec `overflow: hidden` (ou comment j'ai appris à animer une hauteur automatique)

## Le besoin

Sur la page d'accueil de mon projet [tronche](https://tronche.cc), j'ai un bloc de code avec des onglets (Nuxt, React, Solid, Svelte…). En cliquant sur un onglet, le contenu change, et je voulais que la hauteur du bloc s'anime fluidement entre l'ancienne et la nouvelle valeur. 

Je m'y suis donc mis hier soir en me disant que cela prendra un prompt LLM, quelques retouches manuelles, du nettoyage, une review et au lit. 5 min à tout casser. Mais pas du tout !

Rien de sorcier en apparence : une classique animation FLIP (First, Last, Invert, Play).

```js
// 1. Mesurer l'ancienne hauteur
const prevHeight = wrapper.scrollHeight

// 2. Figer la hauteur actuelle
wrapper.style.height = prevHeight + 'px'

// 3. Laisser le DOM se mettre à jour
await nextTick()

// 4. Mesurer la nouvelle hauteur
const newHeight = wrapper.scrollHeight

// 5. Transition CSS
wrapper.style.height = newHeight + 'px'

// 6. Nettoyer après la fin de l'animation
wrapper.addEventListener('transitionend', () => {
  wrapper.style.height = ''
})
```

Simple, propre, ça marche.

… non.

## Ce qui se passait vraiment

L'animation fonctionnait **uniquement quand le nouveau contenu était plus grand** que l'ancien. Pas de bol : impossible de rétrécir le bloc. Et cerise sur le gâteau, après le premier clic, **plus rien ne s'animait du tout**. Le bloc restait bloqué à sa hauteur maximale.

Je parlais à une IA (oui, les temps sont durs) qui m'a pondu exactement le code ci-dessus. Après quelques aller-retours :

> « scrollHeight retourne max(clientHeight, contentHeight). Si tu fixes height à 400px et que le nouveau contenu fait 250px, scrollHeight vaut toujours 400. »

**Boum.**

## Le piège (`overflow: hidden` + `height` fixe = `scrollHeight` ne rétrécit pas)

Quand un élément a :

```css
.wrapper {
  overflow: hidden;
  transition: height 0.35s ease;
}
```

et que tu fixes une `height` explicite (via JS), le navigateur calcule `scrollHeight` comme :

```
scrollHeight = max(clientHeight, contentHeight)
```

Autrement dit :

1. Tu mesures `prevHeight = 400px` (l'ancien contenu fait 400px de haut)
2. Tu fixes `wrapper.style.height = '400px'` → ça ne change rien visuellement
3. Le DOM se met à jour, le nouveau contenu fait 250px
4. Mais la hauteur de l'élément est toujours bloquée à `400px`, donc…
5. `scrollHeight = max(400, 250) = 400` → exactement comme avant !
6. `prevHeight === newHeight` → on abandonne, pas d'animation

Le pire, c'est que le bloc reste indéfiniment à 400px, même après la fin de l'animation (qui n'a jamais eu lieu).

## La solution (toute bête, une fois qu'on sait)

Ne pas mesurer l'élément qui a `overflow: hidden`. Mesurer un **enfant sans contrainte** :

```html
<div ref="wrapper" class="code-content-wrapper">  <!-- overflow: hidden ici -->
  <div ref="inner" v-html="..."></div>               <!-- aucune contrainte ici -->
</div>
```

```js
const prevHeight = wrapper.offsetHeight   // hauteur rendue (fiable)
wrapper.style.height = prevHeight + 'px'  // figer

await nextTick()

const newHeight = inner.scrollHeight       // vraie hauteur du contenu (enfant libre !)
wrapper.style.height = newHeight + 'px'    // transition CSS
```

L'enfant n'a ni `overflow: hidden`, ni `height` fixe → son `scrollHeight` retourne toujours la vraie hauteur du contenu, quoi qu'il arrive au parent.

## Pourquoi ça marche

- `wrapper.offsetHeight` : hauteur **rendue** du wrapper. Avant toute manipulation, elle reflète le contenu. Après avoir figé la hauteur, elle reflète la valeur figée. Utilisable pour l'ancienne hauteur.
- `inner.scrollHeight` : hauteur **totale du contenu** de l'enfant. Sans contrainte de débordement ni de hauteur, c'est toujours la mesure exacte. Utilisable pour la nouvelle hauteur.

La transition CSS sur `height` du wrapper fait le reste : elle part de `prevHeight` (figée) vers `newHeight`, et un `transitionend` remet la hauteur à `auto`.

## Le FLIP fiable (la recette)

1. `wrapper.offsetHeight` pour l'**ancienne** hauteur
2. `inner.scrollHeight` (enfant libre) pour la **nouvelle** hauteur
3. Transition CSS sur `wrapper.style.height` entre les deux valeurs
4. Nettoyage : `el.style.height = ''` sur `transitionend`

## Ce qu'il faut retenir

> **Quand un élément a `overflow: hidden` et une hauteur fixe, `scrollHeight` est clampé à `max(clientHeight, contentHeight)` et ne peut pas diminuer.**

Pour mesurer la hauteur d'un contenu qui peut grandir ou rétrécir sous un élément avec `overflow: hidden` : **mesure un enfant, pas le parent**.

---

*Écrit avec l'assistance d'un agent. Relu, corrigé, et édité par un humain.*

# Rules

- **NE JAMAIS proposer une fonctionnalité, un package, une API ou une solution sans l'avoir vérifié.** Systématiquement : `npm view`, consultation de la doc officielle, ou test rapide. Ne pas deviner. Si l'info n'est pas trouvable, dire "je ne sais pas" plutôt qu'inventer.
- **Sourcer/référencer ses propos.** Quand une affirmation technique est faite, l'accompagner d'une source (lien doc, extrait de code, résultat de commande).
- **Vérifier les suppositions avant d'agir.** "Je pense que X fonctionne" n'est pas suffisant — le confirmer par un test, une lecture de code, ou une requête au registry.

- NE JAMAIS tuer les dev servers (ports 3002, 3004, etc.) — ce sont les serveurs du user. Les laisser tourner après les tests.
- NE PAS utiliser `kill` sur des process Node sans demande explicite.
- AVANT de lancer un dev server, vérifier avec `curl -s -o /dev/null -w "%{http_code}" http://localhost:3004` s'il est déjà actif. Si oui, ne pas en lancer un nouveau.
- Ne pas tuer un dev server pour "nettoyer". Un kill n'est acceptable que si l'utilisateur le demande explicitement, ou s'il est nécessaire pour appliquer des modifications (ex : reconfig de port, redémarrage requis).
- Pour tuer un dev server, utiliser `lsof -ti :3004` (avec un espace avant le port) pour obtenir le PID, puis `kill <PID>`. Ne jamais utiliser `pkill -f` ou `lsof -ti:3004` (sans espace), qui peuvent matcher d'autres processus.
- **NE JAMAIS commiter avant que l'utilisateur ait testé et confirmé le fix.** Les commits intermédiaires non testés polluent l'historique et rendent le revert difficile. Créer des commits atomiques de test uniquement après validation.
- **AVANT de commiter un fix, s'assurer qu'il est vérifiable** : test unitaire qui reproduit le bug et prouve sa résolution, OU test manuel validé par l'utilisateur. Ne jamais commiter un fix non vérifié. C'est le ba-ba du développement.

# Svelte adapter

- Svelte gère nativement les attributs SVG kebab-case et les éléments `<defs>` (`<filter>`, `<linearGradient>`). Pas de hack nécessaire contrairement à Solid.
- Les composants utilisent les runes Svelte 5 : `$props()` pour les props, `$derived()` pour les valeurs réactives.
- Le spread `{...rest}` permet de passer les attributs SVG supplémentaires.
- Les composants variants sont sélectionnés dynamiquement via une variable `$derived` contenant le constructeur (pas de `<svelte:component>`).
- Le bundle externalise `svelte/internal/client` pour éviter le doublement du runtime.
- Utiliser `@testing-library/svelte` pour les tests : `render(Component, { props })`.
- Les props passées par le dispatcher doivent avoir une valeur par défaut pour éviter que `$props()` ne reçoive `undefined` (car Svelte 5 n'applique pas les defaults des enfants si la prop est explicitement passée).
- **IMPORTANT : SVG camelCase → kebab-case** — Svelte ne convertit PAS les attributs SVG camelCase en kebab-case (contrairement à React). Les attributs comme `strokeLinecap`, `strokeWidth`, `strokeLinejoin` doivent être écrits en kebab-case : `stroke-linecap`, `stroke-width`, `stroke-linejoin`. React/Solid les convertissent automatiquement, pas Svelte.

- **IMPORTANT : SVG fragment identifiers** — Les `url(#id)` dans les attributs SVG (`mask="url(#id)"`, `fill="url(#id)"`) doivent toujours inclure le `#` devant l'id. Contrairement à Solid/React, Svelte ne l'ajoute pas automatiquement.

# Solid adapter

- Solid ne convertit PAS les attributs SVG camelCase en kebab-case (contrairement à React).
- Les attributs comme `stopColor`, `floodOpacity`, `colorInterpolationFilters` doivent être écrits en kebab-case : `stop-color`, `flood-opacity`, `color-interpolation-filters`.
- Impossible d'utiliser des attributs kebab-case directement en JSX Solid → solution : injecter le fragment SVG via `innerHTML` (le parseur SVG natif du navigateur gère les kebab-case).
- Concernés : `<linearGradient>`, `<stop>`, `<filter>`, `<feFlood>`, `<feBlend>`, `<feGaussianBlur>`, `<feDropShadow>` et leurs attributs camelCase.

# Angular adapter

- Composants standalone Angular 17+ avec `input()` signaux et `computed()`.
- **SVG kebab-case natif** — Les attributs comme `flood-opacity`, `color-interpolation-filters`, `stroke-linecap` fonctionnent directement dans les templates Angular. Pas de hack nécessaire (contrairement à Solid).
- **Expressions complexes** dans les bindings `[attr.name]="..."` → les concaténations avec `()` ou `+` ne marchent pas en JIT. Toujours utiliser des `computed()` dans la classe pour les transform strings, mask URLs, etc.
- **Pas de passthrough d'attributs** — Angular n'a pas de spread `{...rest}`. Les attributs inconnus sont ignorés. Les composants exposent uniquement les props définies (`name`, `colors`, `title`, `square`, `size`).
- **Inputs signaux non résolus en JIT** — `componentRef.setInput()` et `overrideComponent` échouent avec `NG0303` en mode JIT. Les tests ne peuvent utiliser que les valeurs par défaut. Le build AOT fonctionne parfaitement.
- **Build** : `vite build --config vite.angular.config.ts` avec `@analogjs/vite-plugin-angular`.
- **Peer dependency** : `@angular/core >=17.0.0`.
- **Exemple** : `examples/angular/` — standalone, avec theme/palette/name controls.

# Animation de hauteur (height auto)

- **Piège `scrollHeight` + `overflow: hidden`** : Quand un élément a `overflow: hidden` et une `height` explicitement fixée, `scrollHeight` retourne `max(clientHeight, contentHeight)`. Si le contenu devient plus court que la hauteur fixée, `scrollHeight` ne diminue pas → impossible de détecter le changement.
- **Solution** : Ne pas mesurer l'élément qui a `overflow: hidden`. Mesurer plutôt un élément enfant *sans* contrainte de hauteur/débordement. Sa `scrollHeight` retournera toujours la vraie hauteur du contenu.
- **FLIP fiable** : `wrapper.offsetHeight` pour l'ancienne hauteur, `inner.scrollHeight` (enfant libre) pour la nouvelle. Puis transition CSS sur `height` du wrapper entre les deux valeurs.

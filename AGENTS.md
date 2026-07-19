# Rules

- NE JAMAIS tuer les dev servers (ports 3002, 3004, etc.) — ce sont les serveurs du user. Les laisser tourner après les tests.
- NE PAS utiliser `kill` sur des process Node sans demande explicite.
- AVANT de lancer un dev server, vérifier avec `curl -s -o /dev/null -w "%{http_code}" http://localhost:3004` s'il est déjà actif. Si oui, ne pas en lancer un nouveau.
- Ne pas tuer un dev server pour "nettoyer". Un kill n'est acceptable que si l'utilisateur le demande explicitement, ou s'il est nécessaire pour appliquer des modifications (ex : reconfig de port, redémarrage requis).
- Pour tuer un dev server, utiliser `lsof -ti :3004` (avec un espace avant le port) pour obtenir le PID, puis `kill <PID>`. Ne jamais utiliser `pkill -f` ou `lsof -ti:3004` (sans espace), qui peuvent matcher d'autres processus.

# Svelte adapter

- Svelte 5 gère la plupart des attributs SVG kebab-case dans ses templates, mais certains éléments SVG dans `<defs>` (`<filter>`, `<linearGradient>`) ont des problèmes de rendu en environnement réel. Solution : injecter le contenu de `<defs>` via `innerHTML={markup}` (comme Solid).
- Les composants utilisent les runes Svelte 5 : `$props()` pour les props, `$derived()` pour les valeurs réactives.
- Le spread `{...rest}` permet de passer les attributs SVG supplémentaires.
- Les composants variants sont sélectionnés dynamiquement via une variable `$derived` contenant le constructeur (pas de `<svelte:component>`).
- Le bundle externalise `svelte/internal/client` pour éviter le doublement du runtime.
- Utiliser `@testing-library/svelte` pour les tests : `render(Component, { props })`.
- Les props passées par le dispatcher doivent avoir une valeur par défaut pour éviter que `$props()` ne reçoive `undefined` (car Svelte 5 n'applique pas les defaults des enfants si la prop est explicitement passée).
- **IMPORTANT : SVG camelCase → kebab-case** — Svelte ne convertit PAS les attributs SVG camelCase en kebab-case (contrairement à React). Les attributs comme `strokeLinecap`, `strokeWidth`, `strokeLinejoin` doivent être écrits en kebab-case : `stroke-linecap`, `stroke-width`, `stroke-linejoin`. React/Solid les convertissent automatiquement, pas Svelte.
- **IMPORTANT : SVG `filter` attribut → CSS `filter`** — L'attribut SVG `filter="url(#id)"` ne s'applique pas en runtime Svelte 5. Utiliser le CSS `style="filter: url(#id)"` à la place.
- **IMPORTANT : SVG fragment identifiers** — Les `url(#id)` dans les attributs SVG (`mask="url(#id)"`, `fill="url(#id)"`) doivent toujours inclure le `#` devant l'id. Contrairement à Solid/React, Svelte ne l'ajoute pas automatiquement.

# Solid adapter

- Solid ne convertit PAS les attributs SVG camelCase en kebab-case (contrairement à React).
- Les attributs comme `stopColor`, `floodOpacity`, `colorInterpolationFilters` doivent être écrits en kebab-case : `stop-color`, `flood-opacity`, `color-interpolation-filters`.
- Impossible d'utiliser des attributs kebab-case directement en JSX Solid → solution : injecter le fragment SVG via `innerHTML` (le parseur SVG natif du navigateur gère les kebab-case).
- Concernés : `<linearGradient>`, `<stop>`, `<filter>`, `<feFlood>`, `<feBlend>`, `<feGaussianBlur>`, `<feDropShadow>` et leurs attributs camelCase.

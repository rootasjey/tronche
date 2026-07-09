# Rules

- NE JAMAIS tuer les dev servers (ports 3002, 3004, etc.) — ce sont les serveurs du user. Les laisser tourner après les tests.
- NE PAS utiliser `kill` sur des process Node sans demande explicite.
- AVANT de lancer un dev server, vérifier avec `curl -s -o /dev/null -w "%{http_code}" http://localhost:3004` s'il est déjà actif. Si oui, ne pas en lancer un nouveau.
- Ne pas tuer un dev server pour "nettoyer". Un kill n'est acceptable que si l'utilisateur le demande explicitement, ou s'il est nécessaire pour appliquer des modifications (ex : reconfig de port, redémarrage requis).
- Pour tuer un dev server, utiliser `lsof -ti :3004` (avec un espace avant le port) pour obtenir le PID, puis `kill <PID>`. Ne jamais utiliser `pkill -f` ou `lsof -ti:3004` (sans espace), qui peuvent matcher d'autres processus.

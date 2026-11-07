// Counts client-side page changes. The first page view is counted by the GoatCounter script itself.
// Only the pathname is sent: a query string can hold what the learner typed (e.g. /search?q=...),
// and /search rewrites its own URL on every keystroke, which is not a new page view.
export function onRouteDidUpdate({ location, previousLocation }) {
  if (!previousLocation || !window.goatcounter?.count) return;
  if (location.pathname === previousLocation.pathname) return;
  window.goatcounter.count({ path: location.pathname });
}

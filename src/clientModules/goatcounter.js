// Counts client-side page changes. The first page view is counted by the GoatCounter script itself.
export function onRouteDidUpdate({ location, previousLocation }) {
  if (!previousLocation || !window.goatcounter?.count) return;
  window.goatcounter.count({ path: location.pathname + location.search });
}

// src/utils/ui.js

export function fontScale(scene, opts = {}) {
  const H = scene?.scale?.height ?? scene?.sys?.game?.config?.height ?? 640;
  const min = opts.min ?? 14;
  const f = (r) => Math.max(min, Math.round(H * r));
  return {
    title: f(opts.title ?? 0.05),   // títulos
    body:  f(opts.body  ?? 0.038),  // texto
    md:    f(opts.md    ?? 0.034),  // medio
    sm:    f(opts.sm    ?? 0.030),  // pequeño
  };
}

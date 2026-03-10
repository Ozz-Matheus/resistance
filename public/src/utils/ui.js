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

// Perfiles globales de estilo para los textos
export const TextStyles = {
  base: {
    fontFamily: 'Verdana',
    fill: '#ffffff',
    shadow: { offsetX: 1, offsetY: 1, color: '#b7b7b7', blur: 4, fill: true }
  },
  success: {
    fontFamily: 'Verdana',
    fill: '#00b83f',
    shadow: { offsetX: 1, offsetY: 1, color: '#006a00', blur: 6, fill: true }
  },
  danger: {
    fontFamily: 'Verdana',
    fill: '#fd2727',
    shadow: { offsetX: 1, offsetY: 1, color: '#F44336', blur: 4, fill: true }
  },
  hud: {
    fontFamily: 'Verdana',
    fill: '#fff',
    shadow: { offsetX: 1, offsetY: 1, color: '#2ef', blur: 8, fill: true }
  }
};
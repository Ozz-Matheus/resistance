// src/utils/hudLayout.js

export function hudLayout(scene) {

  // Tamaño lógico del juego
  const W = scene.scale.width;
  const H = scene.scale.height;

  // Escala móvil
  const scale = Phaser.Math.Clamp(H / 800, 0.75, 1.0);

  // Tamaño base del pad
  const f = scene.textures.getFrame('virtual-gamepad', 0);
  const base = f ? Math.max(f.width, f.height) : 100;
  const padSize = Math.round(base * scale);

  // ----- Safe-area y toolbars (px CSS) -----
  const css = getComputedStyle(document.documentElement);
  const raw = css.getPropertyValue('--safe-bottom') || '0';
  const safeEnvPx = parseFloat(raw) || 0;

  // Delta visualViewport (mejor estimación)
  let toolbarPx = 0;
  if (window.visualViewport) {
    const vv = window.visualViewport;
    const layoutH = document.documentElement.clientHeight || H;
    const innerH  = window.innerHeight || layoutH;
    const delta1 = layoutH - vv.height;
    const delta2 = innerH - vv.height - (vv.offsetTop || 0);
    toolbarPx = Math.max(0, Math.ceil(Math.max(delta1, delta2)));
  }

  // iOS / Chrome iOS
  const isIOS = !!scene.sys.game.device?.os?.iOS;
  const isiOSChrome = isIOS && /CriOS|Chrome/i.test(navigator.userAgent);

  // Acolchado base mínimo (home bar)
  const extraBasePx = isIOS ? (isiOSChrome ? 8 : 6) : 0;

  // Estimación por porcentaje si Chrome iOS reporta poco delta
  let percentBarPx = 0;
  if (isiOSChrome && window.visualViewport && toolbarPx < 24) {
    const vh = window.visualViewport.height;
    // ~10% del viewport, limitado
    percentBarPx = Math.max(60, Math.min(120, Math.round(vh * 0.10)));
  }

  // Valor final en px CSS
  const safeBottomPx = Math.max(safeEnvPx, toolbarPx, percentBarPx) + extraBasePx;

  // ----- Conversión px CSS -> unidades del mundo -----
  const dispH  = scene.scale.displaySize?.height ?? H;
  const scaleY = dispH / H || 1;
  const safeBottom = safeBottomPx / scaleY;

  // Márgenes y baseline
  const margin = Math.max(16, Math.round(H * 0.02));
  const bottomGap = Math.max(12, Math.round(H * 0.012));
  const baselineY = Math.round(H - (margin + bottomGap + safeBottom));

  // ⬅️ Joystick
  const leftPad = {
    x: Math.round(margin + padSize / 2),
    y: Math.round(baselineY - padSize / 2),
  };

  // ➡️ Fire
  const fire = {
    x: Math.round(W - margin),
    y: baselineY,
  };

  const showFullscreen = !!scene.sys.game.device?.os?.desktop;
  return { scale, padSize, leftPad, fire, showFullscreen };
}

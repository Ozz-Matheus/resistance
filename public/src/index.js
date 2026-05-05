// src/index.js

import { Game } from './scenes/game.js';
import { MainMenu } from './scenes/mainmenu.js';
import { ControlsPowers } from './scenes/controlspowers.js';
import { GameOver } from './scenes/gameover.js';
import { VictoryScreen } from './scenes/victory.js';
import { PreLevelScene } from './scenes/prelevel.js';
import { EnemyIntroScene } from './scenes/enemyintro.js';
import { LevelPassedScene } from './scenes/levelpassed.js';
import { StartScene } from './scenes/start.js';

const DPR = Math.min(window.devicePixelRatio || 1, 2);

// Función auxiliar para determinar si superamos el límite
const isDesktop = () => window.innerWidth > 800;

// Obtenemos el tamaño respetando el límite
const getGameSize = (w = window.innerWidth, h = window.innerHeight) => {
  if (isDesktop()) {
    return { width: 800, height: 600 };
  }
  return { width: w, height: h };
};

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#000000',

  ...getGameSize(),

  resolution: DPR,

  scene: [
    StartScene,
    MainMenu,
    ControlsPowers,
    PreLevelScene,
    EnemyIntroScene,
    Game,
    GameOver,
    VictoryScreen,
    LevelPassedScene
  ],

  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },

  scale: {
    // Asignación dinámica inicial
    mode: isDesktop() ? Phaser.Scale.FIT : Phaser.Scale.RESIZE,
    parent: document.body,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },

  render: {
    antialias: true,
    pixelArt: false,
  }
};

// --- ESPERAR FUENTES ---
document.fonts.ready.then(() => {

  const game = new Phaser.Game(config);

  //  debounce simple
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  //  Resize principal
  const handleResize = debounce(() => {
    const { width, height } = getGameSize();
    const newMode = isDesktop() ? Phaser.Scale.FIT : Phaser.Scale.RESIZE;

    // Si el usuario redimensiona la ventana y cruza el límite de los 800px, cambiamos el modo en caliente
    if (game.scale.scaleMode !== newMode) {
      game.scale.scaleMode = newMode;
    }

    game.scale.resize(width, height);
    game.scale.refresh(); // Fundamental para forzar a Phaser a recalcular el centrado tras cambiar el modo
  }, 100);

  window.addEventListener('resize', handleResize);

  //  Soporte móvil (teclado, barras, etc.)
  if (window.visualViewport) {
    const handleViewport = debounce(() => {
      const { width, height } = getGameSize(
        window.visualViewport.width, 
        window.visualViewport.height
      );

      game.scale.resize(width, height);
      game.events.emit('viewport-changed');
    }, 100);

    window.visualViewport.addEventListener('resize', handleViewport, { passive: true });
    window.visualViewport.addEventListener('scroll', handleViewport, { passive: true });
  }

});
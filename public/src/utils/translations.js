// src/utils/translations.js

export const Texts = {
  // Pantallas Generales
  startStory: "\n En la Vía Láctea, \n una fuerza desconocida \n se convirtió en amenaza. \n\n Pero una Resistencia \n ha despertado.",
  start: "👉 Toca para iniciar",
  controlsTitle: "🎮 \t Controles \n Muévete para esquivar los villanos \n ⬅️ ➡️ \t Desplázate por la base \n ⏺️ \t Botón de disparo",
  powerUpsTitle: "🌟 \t Poderes No peleas solo.\n Los poderes de tus aliados \n — Las píldoras de la Resistencia \n — activan tus habilidades:",
  powerUpsList: "🟡 \t Amarillo: Triple disparo \n 🟠 \t Naranja: Inmunidad temporal \n 🔴 \t Rojo: Ralentiza villanos \n ⚪️ \t Blanco: Duplica tu velocidad",
  powerUpsFooter: "\n Cada poder cambia tu forma de resistir.\nCada batalla exige una estrategia distinta.",
  newGame: "👉 Comenzar misión", 
  loading: "cargando...",
  retry: "👉 Reintentar",
  playAgain: "👉 jugar de nuevo",
  viewControls: "⚙️ \t Ver Controles y Poderes",
  back: "👈 volver al menú",

  // Textos por Nivel (Pre-Level)
  preLevel: {
    1: "nivel 1: mantente firme. \n\n resiste el \n primer ataque.",
    2: "nivel 2: no dejes que \n tomen más terreno \n en el campo.",
    3: "nivel 3: los villanos quieren \n que te detengas.\n\nno lo hagas.",
    4: "nivel 4: Nuevos villanos \n se acercan.\n\nprepárate para lo peor.",
    5: "nivel final: el emperador \n villano \n y su ejército \n\nestán aquí.\n\ndestruye la amenaza."
  },

  // Textos de Game Over
  gameOverMsg: {
    1: "la amenaza\nsigue activa.\n\nel villano\nencontró\nuna grieta.\n\nrespira…\n\ny vuelve a\nintentarlo.",
    2: "la amenaza\n se extendió.\n\nlos villanos \n ganaron terreno.\n\naún puedes \n contenerlos.",
    3: "la amenaza \n te alcanzó.\n\npero la resistencia \n no termina aquí.\n\nlevántate y sigue.",
    4: "la amenaza \n se intensificó.\n\nlos villanos \n están más cerca.\n\nno te rindas.\n\nla batalla aún no termina.",
    5: "la amenaza \n del villano \n sigue activa.\n\nno ha sido \n detenida.\n\nla vía láctea \n aún te necesita."
  },

  // Textos de Nivel Superado (Level Pass)
  levelPassedMsg: {
    1: "villanos \n neutralizados\n\nla resistencia \n avanza.\n\naún quedan \n fuerzas \n por derrotar.\n\ncontinúa.",
    2: "villanos \n contenidos\n\nhas detenido \n su expansión.\n\nno bajes \n la guardia.\n más villanos \n están cerca.\n\nprepárate.",
    3: "villanos superados\n\nhas resistido \n lo más duro.\n\nlas defensas del \n imperio comienzan \n a fallar.\n\nestán expuestos.\n\nes momento \n de avanzar.",
    4: "villanos derrotados\n\nhas superado \n la amenaza más fuerte.\n\nel emperador \n está vulnerable.\n\nes tu oportunidad \n de acabar con él."
  },

  // Victoria Final
  victoryTitle: "victoria",
  victoryDesc: "el emperador \n ha sido derrotado.\nla resistencia \n ha liberado la vía láctea.\ngracias, guerrero estelar.\nel multiverso \n está en deuda contigo.\nsigue resistiendo.\nel planeta tierra aún \n depende de ti.",

  // HUD / Extras
  newRecord: "¡Nuevo récord!",
  almostRecord: "¡Estuviste cerca \n del récord!",
  level: (n) => `Nivel ${n}`,
  score: (n) => `Puntos: ${n}`,
  record: (n) => `Récord: ${n}`,
};
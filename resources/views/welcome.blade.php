<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Cosmic Resistance</title>
  <style>
    html, body {
      margin: 0;
      height: 100%;
      background: #000;
    }

    #phaser-game-resistance {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    canvas {
      max-width: 100%;
      width: 95%;
      height: auto;
      display: block;
    }
    @media(min-width:1199px){
       canvas {
        width: 50%;
      }
    }
  </style>
</head>
<body>
  <div id="phaser-game-resistance"></div>

  <!-- Phaser CDN -->
  <script src="https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.js"></script>

  <!-- Tu juego -->
  <script type="module" src="{{ asset('scripts/main.js')}}"></script>
</body>
</html>

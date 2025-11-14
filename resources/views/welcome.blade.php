<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
  <title>{{ config('app.name') }}</title>
  <link rel="icon" type="image/png" href="{{ asset('assets/favicon.png')}}"  />
  <style>
    :root{
      --safe-top:    env(safe-area-inset-top, 0px);
      --safe-right:  env(safe-area-inset-right, 0px);
      --safe-bottom: env(safe-area-inset-bottom, 0px);
      --safe-left:   env(safe-area-inset-left, 0px);
    }
    /* alto real en móviles (sin afectar canvas con padding) */
    html, body { height: 100dvh; }
    body{
      margin: 0;
      padding: 0;                 /*  no empujes el canvas */
      background: #000;
      overflow: hidden;           /* evita scroll accidental */
      touch-action: none;         /* bloquea gestos del navegador */
    }
    canvas{ display:block; border:none }
  </style>
</head>
<body>
    <!-- Phaser CDN -->
    <script src="https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.js"></script>
    <!-- Juego -->
  <script type="module" src="{{ asset('src/index.js')}}"></script>
</body>
</html>
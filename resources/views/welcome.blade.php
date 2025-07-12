<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="UTF-8">
  <title>{{ config('app.name') }}</title>
  <link rel="stylesheet" href="{{ asset('styles/main.css')}}"/>
</head>
<body>

  <div id="phaser-game-resistance"></div>

  <!-- Phaser CDN -->
  <script src="https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.js"></script>
  <!-- Script -->
  <script type="module" src="{{ asset('scripts/main.js')}}"></script>
</body>
</html>
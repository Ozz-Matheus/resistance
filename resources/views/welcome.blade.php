<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
  <title>{{ config('app.name') }}</title>
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <link rel="icon" type="image/png" href="{{ asset('assets/favicon.png')}}"  />
  <style>
    :root{
      --safe-top:    env(safe-area-inset-top, 0px);
      --safe-right:  env(safe-area-inset-right, 0px);
      --safe-bottom: env(safe-area-inset-bottom, 0px);
      --safe-left:   env(safe-area-inset-left, 0px);
    }
    /* Alto real en móviles (sin afectar canvas con padding) */
    html, body { height: 100dvh; }
    body{
      margin: 0;
      padding: 0;
      background: #000;
      overflow: hidden;
      touch-action: none;
    }
    input{ box-sizing: border-box }
    canvas{ display:block; border:none }
  </style>
</head>
<body>
  <!-- Modal simple para pedir datos -->
  <div id="player-score-modal" style="
       position: fixed;
       inset: 0;
       display: none;
       align-items: center;
       justify-content: center;
       background: rgba(0,0,0,.7);
       z-index: 9999;">
    <form id="player-score-form" style="
          background: rgba(0,0,0,0.7);
          padding: 16px;
          border-radius: 8px;
          max-width: 320px;
          width: 90%;
          color: #fff;
          font-family: system-ui, sans-serif;">
      <h2 style="margin-bottom: 12px;">Nuevo score</h2>

      <label style="display:block; margin-bottom:8px;">
        Alias
        <input type="text" name="alias" required
               style="width:100%; padding:6px; margin-top:4px;">
      </label>

      <label style="display:block; margin-bottom:8px;">
        Correo
        <input type="email" name="email" required
               style="width:100%; padding:6px; margin-top:4px;">
      </label>

      <label style="display:block; margin-bottom:12px;">
        Teléfono
        <input type="tel" name="phone" required
               pattern="\d{10}"
               maxlength="10"
               inputmode="numeric"
               style="width:100%; padding:6px; margin-top:4px;">
      </label>

      <input type="hidden" name="score" id="player-score-value">

      <p id="player-score-status"
               style="margin:8px 0 0; font-size:12px; min-height:1em;"></p>

      <div style="display:flex; gap:8px; justify-content:flex-end;">
        <button type="button" id="player-score-skip">Omitir</button>
        <button type="submit">Guardar</button>
      </div>
    </form>
  </div>

  <!-- Phaser CDN -->
  <script src="https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.js"></script>

  <!-- Función global para mostrar guardar puntaje -->
  <script>
    window.SCORE_STORE_URL = "{{ route('scores.store') }}";

    window.showPlayerScoreForm = function (score) {
      const modal = document.getElementById('player-score-modal');
      const form = document.getElementById('player-score-form');
      const skip = document.getElementById('player-score-skip');
      const scoreInput = document.getElementById('player-score-value');
      const status = document.getElementById('player-score-status');
      const csrf = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute('content');

      scoreInput.value = score;
      status.textContent = '';
      modal.style.display = 'flex';

      const close = () => {
        modal.style.display = 'none';
        form.removeEventListener('submit', onSubmit);
        skip.removeEventListener('click', onSkip);
      };

      async function onSubmit(e) {
        e.preventDefault();

        const data = {
          alias: form.alias.value,
          email: form.email.value,
          phone: form.phone.value,
          score: parseInt(form.score.value || '0', 10),
        };

        status.textContent = 'Guardando...';

        try {
          const response = await fetch(window.SCORE_STORE_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'X-CSRF-TOKEN': csrf,
              'X-Requested-With': 'XMLHttpRequest',
            },
            body: JSON.stringify(data),
          });

          if (response.ok) {
            status.textContent = 'Score guardado. ¡Gracias!';
            setTimeout(() => close(), 1200);
          } else {
            status.textContent = 'No se pudo guardar. Intenta más tarde.';
          }
        } catch (err) {
          console.error(err);
          status.textContent = 'Error de conexión. Intenta más tarde.';
        }
      }

      function onSkip() {
        status.textContent = '';
        close();
      }

      form.addEventListener('submit', onSubmit);
      skip.addEventListener('click', onSkip);
    };
  </script>

  <!-- Game -->
  <script type="module" src="{{ asset('src/index.js')}}"></script>
</body>
</html>
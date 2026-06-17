<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Top Puntajes - {{ config('app.name') }}</title>
    <link rel="icon" type="image/png" href="{{ asset('favicon/ico.png') }}" />
    <style>
        @font-face {
            font-family: 'BebasNeue';
            src: url('{{ asset('src/fonts/BebasNeue.woff2') }}') format('woff2'),
                 url('{{ asset('src/fonts/BebasNeue.woff') }}') format('woff');
            font-display: swap;
        }
        body {
            background-color: #000;
            color: #fff;
            font-family: 'BebasNeue', Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 2rem 1rem;
            margin: 0;
        }
        h1 {
            color: #0bb83f;
            font-size: 3rem;
            margin-bottom: 2rem;
            text-align: center;
            text-shadow: 1px 1px 6px #006a00;
        }
        table {
            width: 100%;
            max-width: 450px;
            border-collapse: collapse;
            font-size: 1.5rem;
            letter-spacing: 1px;
        }
        th, td {
            padding: 0.8rem;
            text-align: left;
            border-bottom: 1px solid #333;
        }
        th { 
            color: #0bb83f; 
            border-bottom: 2px solid #0bb83f;
        }
        .score-col { text-align: right; }
        .rank { color: #888; width: 40px; text-align: center; }
        .back-btn {
            margin-top: 3rem;
            color: #fff;
            text-decoration: none;
            font-size: 1.2rem;
            border: 1px solid #333;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            transition: all 0.2s;
        }
        .back-btn:hover { background: #333; }
    </style>
</head>
<body>
    <h1>TOP DE LA RESISTENCIA</h1>
    <table>
        <thead>
            <tr>
                <th class="rank">#</th>
                <th>Alias</th>
                <th class="score-col">Puntaje</th>
            </tr>
        </thead>
        <tbody>
            @forelse($scores as $index => $score)
                <tr>
                    <td class="rank">{{ $index + 1 }}</td>
                    <td>{{ $score->alias }}</td>
                    <td class="score-col">{{ number_format($score->score, 0, ',', '.') }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="3" style="text-align: center; color: #888;">Aún no hay reclutas registrados.</td>
                </tr>
            @endforelse
        </tbody>
    </table>
    <a href="{{ url('/') }}" class="back-btn">Volver a la base</a>
</body>
</html>
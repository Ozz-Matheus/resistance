<?php

namespace App\Filament\Resources;

use App\Filament\Resources\GameScoreResource\Pages;
use App\Models\GameScore;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class GameScoreResource extends Resource
{
    protected static ?string $model = GameScore::class;

    protected static ?string $modelLabel = 'Puntaje';

    protected static ?string $pluralModelLabel = 'Puntajes';

    protected static ?string $navigationLabel = 'Puntajes';

    protected static ?string $navigationGroup = 'Gestión';

    protected static ?string $navigationIcon = 'heroicon-o-rocket-launch';

    protected static ?int $navigationSort = 4;

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('alias')
                    ->searchable(),
                Tables\Columns\TextColumn::make('email')
                    ->label('Correo')
                    ->searchable(),
                Tables\Columns\TextColumn::make('phone')
                    ->label('Teléfono')
                    ->searchable(),
                Tables\Columns\TextColumn::make('score')
                    ->label('Puntaje')
                    ->numeric()
                    ->sortable()
                    ->suffix(' Ptje'),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Creado en')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Actualizado en')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->bulkActions([
                // Tables\Actions\BulkActionGroup::make([
                //     Tables\Actions\DeleteBulkAction::make(),
                // ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListGameScores::route('/'),
        ];
    }
}

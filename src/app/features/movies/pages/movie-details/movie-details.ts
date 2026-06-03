import { DecimalPipe } from '@angular/common';
import { Component, inject, input, linkedSignal, signal, WritableSignal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FavoritesApi } from '../../../../shared/services/favorites-api';
import { MoviesApi } from '../../services/movies-api';

@Component({
  selector: 'app-movie-details',
  imports: [DecimalPipe],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css',
})
export class MovieDetails {
  private readonly _moviesApi = inject(MoviesApi);
  private readonly _favoritesApi = inject(FavoritesApi);

  readonly BASE_URL = 'http://localhost:3000';

  id = input.required<string>();

  movieDetailsResource = rxResource({
    params: () => this.id(),
    stream: ({ params }) => this._moviesApi.getMoviesDetails(+params),
  });

  movieDetails = linkedSignal(() => {
    const ERROR_ON_RESPONSE = !!this.movieDetailsResource.error();

    if (ERROR_ON_RESPONSE) return undefined;

    return this.movieDetailsResource.value();
  });

  isFavorite = signal(false);
  currentRating = signal<number | undefined>(undefined);

  toggleFavorite() {
    this.isFavorite.update((value) => !value);
    console.log(`Filme agora é favorito: ${this.isFavorite()}`);
  }

  updateRating(newRating: number) {

  }
}

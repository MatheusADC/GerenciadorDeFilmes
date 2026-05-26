import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { MoviesListResponse } from "../types/movies-list-reponse";

@Injectable({
  providedIn: 'root',
})
export class FavoritesApi {
  private readonly _httpClient = inject(HttpClient);

  getFavorites() {
    return this._httpClient.get<MoviesListResponse>('http://localhost:your_port/favorites');
  }

  addMoviesToFavorites() {}

  removeMoviesFromFavorites() {}
}

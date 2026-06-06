import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { MoviesListResponse } from "../../../shared/types/movies-list-reponse";
import { IMovieResponse } from "../../../shared/models/movie-response";

@Injectable({
  providedIn: 'root',
})
export class MoviesApi {
  private readonly _httpClient = inject(HttpClient);

  getMovies() {
    return this._httpClient.get<MoviesListResponse>('http://localhost:YOUR_PORT/movies');
  }

  getMoviesDetails(id: number) {
    return this._httpClient.get<IMovieResponse>('http://localhost:YOUR_PORT/movies/' + id);
  }

  rateMovie(movieId: number, rating: number) {
    return this._httpClient.post<IMovieResponse>('http://localhost:YOUR_PORT/movies/' + movieId + '/rate', {
      rating
    });
  }
}

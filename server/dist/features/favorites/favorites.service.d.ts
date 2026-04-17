import { Movie } from '../movies/movie.interface';
export declare class FavoritesService {
    private movieService;
    add(userId: number, movieId: number): Promise<void>;
    remove(userId: number, movieId: number): Promise<void>;
    listByUser(userId: number): Promise<Movie[]>;
    private getAll;
}
//# sourceMappingURL=favorites.service.d.ts.map
import { Movie } from './movie.interface';
export declare class MovieService {
    findAll(): Promise<Movie[]>;
    findById(id: number): Promise<Movie | undefined>;
    rate(id: number, rating: number): Promise<Movie | null>;
    create(movieData: Omit<Movie, 'id' | 'qtdVotos' | 'mediaVotos'>): Promise<Movie>;
}
//# sourceMappingURL=movie.service.d.ts.map
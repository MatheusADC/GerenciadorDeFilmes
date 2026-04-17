"use strict";
// Responsável por ler o movies.json.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieService = void 0;
const promises_1 = __importDefault(require("node:fs/promises"));
const path_1 = __importDefault(require("path"));
const DB_PATH = path_1.default.join(__dirname, '../../../data/movies.json');
class MovieService {
    // Lê o arquivo json e retorna a lista
    async findAll() {
        try {
            const data = await promises_1.default.readFile(DB_PATH, 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            // Se não existir arquivo ainda, cria e retorna vazio
            await promises_1.default.mkdir(path_1.default.dirname(DB_PATH), { recursive: true });
            await promises_1.default.writeFile(DB_PATH, '[]');
            return [];
        }
    }
    async findById(id) {
        const movies = await this.findAll();
        return movies.find((movie) => movie.id === id);
    }
    async rate(id, rating) {
        const movies = await this.findAll();
        const movieIndex = movies.findIndex((m) => m.id === id);
        if (movieIndex === -1) {
            return null; // Filme não encontrado
        }
        const movie = movies[movieIndex];
        if (!movie) {
            return null;
        }
        // 1. Calcular a soma atual dos votos (Reverter a média)
        // Se qtdVotos for 0, a soma é 0.
        const currentTotalScore = movie.mediaVotos * movie.qtdVotos;
        // 2. Incrementar a quantidade de votos
        movie.qtdVotos += 1;
        // 3. Calcular a nova média
        // (Soma antiga + Nova Nota) / Nova quantidade
        const newAverage = (currentTotalScore + rating) / movie.qtdVotos;
        // 4. Arredondar para 1 casa decimal (ex: 8.5) para ficar bonito
        movie.mediaVotos = parseFloat(newAverage.toFixed(4));
        // 5. Atualizar o array e Salvar no arquivo
        movies[movieIndex] = movie;
        await promises_1.default.writeFile(DB_PATH, JSON.stringify(movies, null, 2));
        return movie;
    }
    async create(movieData) {
        const movies = await this.findAll();
        const newMovie = {
            id: Date.now(),
            ...movieData,
            qtdVotos: 0, // Inicia zerado
            mediaVotos: 0, // Inicia zerado
        };
        movies.push(newMovie);
        await promises_1.default.writeFile(DB_PATH, JSON.stringify(movies, null, 2));
        return newMovie;
    }
}
exports.MovieService = MovieService;
//# sourceMappingURL=movie.service.js.map
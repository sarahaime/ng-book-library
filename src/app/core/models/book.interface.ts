import { GenresEnum } from "./genres.enum";

export interface IBook {
    id: number;
    title: string;
    author: string;
    year: number;
    description?: string;
    genre: GenresEnum;
  }
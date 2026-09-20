import { poster, type PosterSrc } from "@/data/posters";

export type Genre = {
  /** TMDB genre id — the same id stored in the backend's `genres` table. */
  id: number;
  slug: string;
  name: string;
  /** Four posters shown as a 2×2 mosaic on the category card. */
  posters: [PosterSrc, PosterSrc, PosterSrc, PosterSrc];
};

/**
 * All 19 TMDB movie genres, as seeded in the backend. Ordered so the first
 * carousel page is the one in the Figma (Action, Adventure, Comedy, Drama,
 * Horror), followed by the rest alphabetically.
 *
 * The five Figma genres keep their exact poster sets; the others are loosely
 * thematic picks from the same 54-poster pool. All of it is placeholder
 * artwork until posters come from the TMDB-backed API.
 */
export const genres: Genre[] = [
  { id: 28, slug: "action", name: "Action", posters: [poster(37), poster(19), poster(21), poster(38)] },
  { id: 12, slug: "adventure", name: "Adventure", posters: [poster(39), poster(40), poster(41), poster(42)] },
  { id: 35, slug: "comedy", name: "Comedy", posters: [poster(43), poster(44), poster(45), poster(46)] },
  { id: 18, slug: "drama", name: "Drama", posters: [poster(47), poster(48), poster(49), poster(50)] },
  { id: 27, slug: "horror", name: "Horror", posters: [poster(51), poster(52), poster(53), poster(54)] },
  { id: 16, slug: "animation", name: "Animation", posters: [poster(33), poster(5), poster(2), poster(24)] },
  { id: 80, slug: "crime", name: "Crime", posters: [poster(1), poster(48), poster(21), poster(23)] },
  { id: 99, slug: "documentary", name: "Documentary", posters: [poster(26), poster(22), poster(20), poster(32)] },
  { id: 10751, slug: "family", name: "Family", posters: [poster(29), poster(33), poster(24), poster(18)] },
  { id: 14, slug: "fantasy", name: "Fantasy", posters: [poster(4), poster(7), poster(15), poster(29)] },
  { id: 36, slug: "history", name: "History", posters: [poster(22), poster(27), poster(30), poster(26)] },
  { id: 10402, slug: "music", name: "Music", posters: [poster(26), poster(6), poster(32), poster(25)] },
  { id: 9648, slug: "mystery", name: "Mystery", posters: [poster(3), poster(5), poster(15), poster(14)] },
  { id: 10749, slug: "romance", name: "Romance", posters: [poster(20), poster(11), poster(32), poster(6)] },
  { id: 878, slug: "science-fiction", name: "Science Fiction", posters: [poster(2), poster(17), poster(28), poster(31)] },
  { id: 53, slug: "thriller", name: "Thriller", posters: [poster(8), poster(16), poster(23), poster(1)] },
  { id: 10770, slug: "tv-movie", name: "TV Movie", posters: [poster(10), poster(13), poster(9), poster(36)] },
  { id: 10752, slug: "war", name: "War", posters: [poster(27), poster(30), poster(34), poster(22)] },
  { id: 37, slug: "western", name: "Western", posters: [poster(35), poster(34), poster(12), poster(27)] },
];

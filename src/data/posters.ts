/**
 * Placeholder artwork exported from the Figma design and downscaled to
 * 400×600 WebP. They stand in for TMDB posters until the NestJS API exists;
 * `poster-01…36` are the hero mosaic (four rows of nine, left to right) and
 * `poster-37…54` only appear in the category cards.
 *
 * The mosaics are decorative, so consumers render them with an empty alt.
 */
export type PosterSrc = `/images/posters/poster-${string}.webp`;

export function poster(n: number): PosterSrc {
  return `/images/posters/poster-${String(n).padStart(2, "0")}.webp`;
}

const HERO_ROWS = 4;
const HERO_COLUMNS = 9;

/** The hero backdrop: 4 rows × 9 posters, in the order they appear in Figma. */
export const heroPosterRows: PosterSrc[][] = Array.from(
  { length: HERO_ROWS },
  (_, row) =>
    Array.from({ length: HERO_COLUMNS }, (_, col) =>
      poster(row * HERO_COLUMNS + col + 1),
    ),
);

/** The grey wave texture blended over the hero mosaic at 50% opacity. */
export const heroOverlaySrc = "/images/hero-overlay.webp";

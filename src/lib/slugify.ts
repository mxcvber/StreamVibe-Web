/** "Science Fiction" -> "science-fiction", "TV Movie" -> "tv-movie". */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

import { cacheLife } from "next/cache";

/**
 * The current year for the footer's copyright line. Under Cache Components a
 * bare `new Date()` can't be prerendered, so the value is cached and the
 * prerendered pages refresh it daily.
 */
export async function CopyrightYear() {
  "use cache";
  cacheLife("days");

  return new Date().getFullYear();
}

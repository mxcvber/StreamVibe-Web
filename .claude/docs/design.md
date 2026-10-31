# Design

## The Figma file

- "StreamVibe - Produce UI":
  https://www.figma.com/design/2r18HpPPFNUyIAnr3M27QQ/StreamVibe---Produce-UI (file key
  `2r18HpPPFNUyIAnr3M27QQ`).
- 🌈 Guide page: the palette, as colour styles. The file has no variables or text styles, so
  sizes and spacing were measured on the artboards.
- ⭐ Design page: one frame per page and artboard, named `<Page> - Desktop`, `- Laptop` and
  `- Mobile` (1920, 1440 and 390 wide).
- Icons page: the exported icons, plus the heroicons-outline sets (24px) the outline icons
  come from.

The coding conventions for translating it (breakpoints, tokens, the minus-1px border rule,
aspect ratios) are in `.claude/rules/styling.md`.

## Frames

Node ids on the ⭐ Design page, read 2026-10-27. Pass them to the Figma MCP as written; in a
URL they become `node-id=34-919`.

| Figma page | Desktop 1920 | Laptop 1440 | Mobile 390 | Route |
| --- | --- | --- | --- | --- |
| Home Page | `34:919` | `288:4471` | `288:4912` | `/` |
| Movies & Shows Page | `97:2` | `305:2` | `305:1606` | `/movies` (the movie parts) |
| Movies Page Open | `106:1301` | `312:2552` | `312:3580` | `/movies/[id]` (hero only so far) |
| Shows Page Open | `226:2795` | `312:4166` | `312:4573` | out of scope |
| Support Page | `107:323` | `312:5165` | `315:5680` | `/support` |
| Subscription Page | `109:844` | `315:6146` | `315:6595` | `/subscriptions` |

`/movies/all` and the genre and top-10 pages have no artboards: they reuse the Movies page's
hero and catalog box.

## Deliberate deviations

These differences from the artboards were chosen on purpose. Don't "fix" them back without
asking.

**Scope**
- Movies only (decided 2026-10-27): the Shows pages and the mobile Movies/Shows tab bar are out
  of scope, since the backend has no TV data. The nav item reads "Movies" rather than Figma's
  "Movies & Shows", and the footer has no "Shows" column. On phones, `CatalogBox`'s linked
  label pill leads to "All Movies" instead of the tab bar.

**Layout**
- Tablets (768–1023) have no artboard. They keep the mobile layout with 2-column grids, 40px
  gutters, side-by-side heading rows and a 3-column footer. The Movies hero's actions form a
  row from `md`.
- The phone menu is a right-side `Sheet` drawer, because Figma has no open state. Its hamburger
  is lucide's `Menu` until Figma node 291:4952 is exported.
- The Movies hero, the movie page and the plan comparison heading take their copy width from
  the artboard's text box as a max-width rather than Figma's side padding, so the copy degrades
  between 1024 and 1440.
- `ContactSection` splits its columns 429fr : 800fr (533 : 976 on desktop) rather than fixing
  the left one at 429px, which would leave the form about 385px wide at 1024.
- `PlanCard` keeps 16px padding below 375px. Figma's 24px would overflow the buttons on 360px
  phones.
- Must-watch shows 3 cards per page up to 1279px and 4 from 1280. The laptop artboard's 4
  leave the chips no room below about 1300px. Plain genre cards show 4 from `lg` and 5 from `xl`.

**Content and labels**
- The `newest` sort reads "Upcoming", with a hint, because the API returns unreleased movies,
  soonest first.
- Release dates use the short month ("30 Sept 2026"), because long months don't fit the cards.
  On narrow cards the "Released at" lead-in is screen-reader-only.
- Trending and must-watch chips compact on narrow cards: no icons, and "1h 39m".
- Ratings round to half stars, because Figma draws only full, half and empty stars.
- The movie page keeps only Play Now and the bookmark (no add, like or sound buttons), on one
  row on phones.
- Movie page fields the database doesn't hold map onto real columns: IMDb rating → TMDB
  rating, spoken languages → country of origin, and "From India" is dropped. Check each new
  field against `../api/prisma/schema.prisma`, and ask before extending the schema.
- The plan comparison copy has the design's typos fixed ("Free Trail", "Two device",
  "a widest"). It says "movies" for "movies and shows", and keeps one Family Sharing text on
  phones.
- The device cards repeat one description six times, as the design does.

**Undesigned additions**
- The Movies hero autoplays every 7s. It pauses on hover, keyboard focus, drag and hidden tabs,
  and is off for reduced motion.
- The top-10 rank badge on catalog cards copies `TopGenresCard`'s "Top 10 In" badge.
- Error, empty, loading and success states stay quiet: grey inline messages, red borders with
  a short message on fields, skeletons sized like the content. A checked checkbox uses the
  brand red.
- The FAQ is two independent columns, so opening an item only reflows its own column.
- The country picker offers 10 curated countries, defaulting to India, whose flag the artboards
  show.
- Small controls get invisible, enlarged hit areas.

**Approximations**
- The device cards' red glow imitates the rendered design, because Figma's exported gradient
  was garbled.
- The `surface` button's Black/15 hairline also covers the carousel arrows, which Figma draws
  with Black/12. Over an image the difference is invisible.
- The nav pill's 8px padding is drawn as a 4px border plus 4px of padding.

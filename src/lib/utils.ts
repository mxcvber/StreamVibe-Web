import { createCn } from "cn/config"

// The type scale in globals.css names sizes by pixel value (`text-18`). The
// class merger only knows Tailwind's default size names, so it would read
// `text-18` as a text *colour* and drop it whenever a colour class follows
// (`text-18 text-white` -> `text-white`). Registering the sizes fixes that.
const fontSizes = ["12", "14", "16", "18", "20", "22", "24", "28", "30", "38", "40", "48", "58"]

// Likewise the section spacing tokens: unregistered, `gap-section-mobile` isn't
// seen as a gap, so a caller's `gap-5` is appended instead of replacing it and
// the token wins by stylesheet order.
const sectionSpacing = ["section-mobile", "section-laptop", "section-desktop"]

export const cn = createCn({
  extend: { classGroups: { "font-size": [{ text: fontSizes }], gap: [{ gap: sectionSpacing }] } },
})

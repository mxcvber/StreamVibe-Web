export type FaqItem = {
  id: string;
  /** Zero-padded ordinal shown in the badge, e.g. "01". */
  number: string;
  question: string;
  answer: string;
};

/**
 * Questions are verbatim from the design. Only the first answer exists in
 * Figma; the others are placeholder copy to make the accordion usable.
 */
export const faq: FaqItem[] = [
  {
    id: "what-is-streamvibe",
    number: "01",
    question: "What is StreamVibe?",
    answer:
      "StreamVibe is a streaming service that allows you to watch movies on demand.",
  },
  {
    id: "cost",
    number: "02",
    question: "How much does StreamVibe cost?",
    answer:
      "Plans start at $9.99 a month for the Basic plan, with Standard and Premium tiers that add more content and features.",
  },
  {
    id: "content",
    number: "03",
    question: "What content is available on StreamVibe?",
    answer:
      "A wide range of movies, from the latest blockbusters and new releases to classics and documentaries.",
  },
  {
    id: "how-to-watch",
    number: "04",
    question: "How can I watch StreamVibe?",
    answer:
      "Stream on your smartphone, tablet, laptop, smart TV, gaming console or VR headset, anywhere with an internet connection.",
  },
  {
    id: "sign-up",
    number: "05",
    question: "How do I sign up for StreamVibe?",
    answer:
      "Pick a plan, create an account with your email address and add a payment method. You can start watching right away.",
  },
  {
    id: "free-trial",
    number: "06",
    question: "What is the StreamVibe free trial?",
    answer:
      "Every plan comes with a free trial period so you can explore the full library before your first payment.",
  },
  {
    id: "support",
    number: "07",
    question: "How do I contact StreamVibe customer support?",
    answer:
      "Head to the Support page to send us a message. Our team replies by email as quickly as possible.",
  },
  {
    id: "payment-methods",
    number: "08",
    question: "What are the StreamVibe payment methods?",
    answer:
      "Major credit and debit cards are accepted, and subscriptions can be changed or cancelled at any time from your account.",
  },
];

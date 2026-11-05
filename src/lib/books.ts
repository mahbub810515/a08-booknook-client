export type Book = {
  bookName: string;
  writer: string;
  image: string;
  description: string;
  category: string;
  language: string;
  pages: number;
  stock: number;
};

export const newArrivals: Book[] = [
  {
    bookName: "The Silent Patient",
    writer: "Alex Michaelides",
    image: "https://covers.openlibrary.org/b/isbn/9781250301697-L.jpg",
    description:
      "A famous painter stops speaking after allegedly murdering her husband, and a psychotherapist becomes obsessed with uncovering her motive.",
    category: "Fiction",
    language: "English",
    pages: 336,
    stock: 5,
  },
  {
    bookName: "Atomic Habits",
    writer: "James Clear",
    image: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
    description:
      "A proven framework for building good habits and breaking bad ones, one small change at a time.",
    category: "Self-Help",
    language: "English",
    pages: 320,
    stock: 12,
  },
  {
    bookName: "The Midnight Library",
    writer: "Matt Haig",
    image: "https://covers.openlibrary.org/b/isbn/9780525559474-L.jpg",
    description:
      "Between life and death there is a library, and within it, infinite books — each the story of another life you could have lived.",
    category: "Fiction",
    language: "English",
    pages: 304,
    stock: 8,
  },
  {
    bookName: "Sapiens",
    writer: "Yuval Noah Harari",
    image: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg",
    description:
      "A brief history of humankind, from the emergence of Homo sapiens to the rise of capitalism and technology.",
    category: "History",
    language: "English",
    pages: 443,
    stock: 3,
  },
  {
    bookName: "The Alchemist",
    writer: "Paulo Coelho",
    image: "https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg",
    description:
      "A shepherd boy travels in search of a worldly treasure and discovers something far more valuable along the way.",
    category: "Fiction",
    language: "English",
    pages: 197,
    stock: 0,
  },
  {
    bookName: "Educated",
    writer: "Tara Westover",
    image: "https://covers.openlibrary.org/b/isbn/9780399590504-L.jpg",
    description:
      "A memoir about a woman who grows up in a survivalist family and earns a PhD from Cambridge University.",
    category: "Biography",
    language: "English",
    pages: 334,
    stock: 6,
  },
  {
    bookName: "Dune",
    writer: "Frank Herbert",
    image: "https://covers.openlibrary.org/b/isbn/9780441013593-L.jpg",
    description:
      "On the desert planet Arrakis, young Paul Atreides is drawn into a struggle for the galaxy's most precious substance.",
    category: "Science",
    language: "English",
    pages: 688,
    stock: 4,
  },
  {
    bookName: "A Brief History of Time",
    writer: "Stephen Hawking",
    image: "https://covers.openlibrary.org/b/isbn/9780553380163-L.jpg",
    description:
      "A landmark exploration of the universe — from the Big Bang to black holes — written for the curious reader.",
    category: "Science",
    language: "English",
    pages: 212,
    stock: 7,
  },
];

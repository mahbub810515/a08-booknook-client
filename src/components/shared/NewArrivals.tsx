
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Playfair_Display } from "next/font/google";

import { Button } from "@/components/ui/button";
import BookCard from "@/components/shared/BookCard";
import { BooksType } from "@/types/booksType";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export default function NewArrivals() {
  const [books, setBooks] = useState<BooksType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/books`);

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const data: BooksType[] = await response.json();

        setBooks(data.slice(0, 8));
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-16 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-50 px-4 py-2 text-xs font-semibold tracking-widest text-emerald-700 uppercase">
            <Sparkles size={14} aria-hidden="true" />
            Fresh on the shelves
          </div>

          <h2
            className={`${playfair.className} text-3xl font-bold text-gray-900 sm:text-4xl`}
          >
            New Arrivals
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-600 sm:text-base">
            The latest additions to the BookNook collection — grab a copy before
            it flies off the shelf.
          </p>
        </div>

        <Button
          nativeButton={false}
          render={<Link href="/books" />}
          variant="outline"
          className="h-11 gap-2 rounded-full px-6 font-semibold"
        >
          View All Books
          <ArrowRight
            size={16}
            className="transition-transform group-hover/button:translate-x-1"
          />
        </Button>
      </div>

      <div className="mt-10">
        {loading && (
          <p className="text-center py-10">Loading books...</p>
        )}

        {error && (
          <p className="text-center py-10 text-red-500">
            {error}
          </p>
        )}

        {!loading && !error && books.length === 0 && (
          <p className="text-center py-10">No books available.</p>
        )}

        {!loading && !error && books.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {books.map((book, index) => (
              <BookCard
                key={book.bookName || index}
                book={book}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

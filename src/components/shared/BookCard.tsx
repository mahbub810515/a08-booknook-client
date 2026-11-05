"use client";

import Image from "next/image";
import { BookOpen, Globe } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Book } from "@/lib/books";

export default function BookCard({ book }: { book: Book }) {
  const inStock = book.stock > 0;

  return (
    <Card className="group h-full gap-0 overflow-hidden rounded-2xl bg-white p-0 shadow-sm ring-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100">
        <Image
          src={book.image}
          alt={`Cover of ${book.bookName}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          
        />

        <Badge className="absolute top-3 left-3 bg-emerald-600 text-white shadow-sm">
          {book.category}
        </Badge>

        <Badge
          className={`absolute top-3 right-3 bg-white/95 shadow-sm ${
            inStock ? "text-emerald-700" : "text-red-600"
          }`}
        >
          {inStock ? `In Stock (${book.stock})` : "Out of Stock"}
        </Badge>
      </div>

      <CardContent className="flex flex-1 flex-col gap-2.5 px-4 pt-3.5 pb-4">
        <div>
          <h3 className="line-clamp-1 text-base font-semibold text-gray-900">
            {book.bookName}
          </h3>
          <p className="mt-0.5 text-sm text-gray-500">by {book.writer}</p>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
          {book.description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-gray-100 pt-3 text-xs text-gray-500">
          <span className="inline-flex items-center gap-1.5">
            <Globe size={13} aria-hidden="true" />
            {book.language}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BookOpen size={13} aria-hidden="true" />
            {book.pages} pages
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

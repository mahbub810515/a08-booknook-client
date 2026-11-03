"use client";

import Image from "next/image";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { ArrowRight, BookOpen } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Button } from "@/components/ui/button";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const slides = [
  {
    title: "Read More. Dream Bigger.",
    description:
      "Discover new knowledge, borrow your favorite books, and make every reading moment unforgettable.",
    image: "/hero/library-1.jpg",
    imageAlt: "Open book resting on a table in a library",
  },
  {
    title: "A Library Without Limits.",
    description:
      "Browse thousands of titles across every genre — from timeless classics to the newest bestsellers.",
    image: "/hero/library-2.jpg",
    imageAlt: "Stack of books in a quiet reading room",
  },
  {
    title: "Your Next Chapter Awaits.",
    description:
      "Join BookNook, borrow your favorites, and turn every quiet moment into a new adventure.",
    image: "/hero/library-3.jpg",
    imageAlt: "Tall shelves inside a grand library",
  },
];

export default function HeroSlider() {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      loop
      navigation
      pagination={{ clickable: true }}
      className="hero-swiper h-[calc(100vh-5rem)] max-h-180 min-h-130 w-full"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={slide.title}>
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src={slide.image}
              alt={slide.imageAlt}
              fill
              sizes="100vw"
              priority={index === 0}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-liner-to-r from-black/85 via-black/55 to-black/25" />

            <div className="relative mx-auto flex h-full max-w-7xl items-center px-5 lg:px-8">
              <div className="max-w-2xl pb-10">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase backdrop-blur-sm">
                  <BookOpen size={14} aria-hidden="true" />
                  Your reading journey starts here
                </div>

                <h1
                  className={`${playfair.className} text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-6xl`}
                >
                  {slide.title}
                </h1>

                <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
                  {slide.description}
                </p>

                <Button nativeButton={false}
                  render={<Link href="/books" />}
                  className="mt-8 h-12 gap-2 rounded-full bg-emerald-600 px-7 text-base font-semibold text-white shadow-lg shadow-emerald-900/25 hover:bg-emerald-700"
                >
                  Browse Books
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover/button:translate-x-1"
                  />
                </Button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

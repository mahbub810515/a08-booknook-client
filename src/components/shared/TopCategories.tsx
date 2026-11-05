import Link from "next/link";
import { Atom, Landmark, Smile, Sparkles } from "lucide-react";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const categories = [
  {
    name: "Fiction",
    description: "Novels and short stories",
    href: "/books?category=Fiction",
    icon: Sparkles,
  },
  {
    name: "Science",
    description: "How the world works",
    href: "/books?category=Science",
    icon: Atom,
  },
  {
    name: "History",
    description: "Stories from the past",
    href: "/books?category=History",
    icon: Landmark,
  },
  {
    name: "Kids",
    description: "Picture books and more",
    href: "/books?category=Children",
    icon: Smile,
  },
];

export default function TopCategories() {
  return (
    <section className="w-full bg-white py-16 lg:py-20">
      <div className="mx-auto w-full max-w-6xl px-5 lg:px-8">
        <div className="text-center">
          <h2
            className={`${playfair.className} text-3xl font-bold text-gray-900 sm:text-4xl`}
          >
            Top Categories
          </h2>
          <p className="mt-3 text-sm text-gray-600 sm:text-base">
            Pick a shelf and start reading.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {categories.map(({ name, description, href, icon: Icon }) => (
            <Link
              key={name}
              href={href}
              className="group rounded-xl border border-gray-200 bg-white px-6 py-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-600 hover:shadow-lg"
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 transition-colors group-hover:bg-emerald-600">
                <Icon
                  size={22}
                  className="text-emerald-600 transition-colors group-hover:text-white"
                  aria-hidden="true"
                />
              </span>

              <h3
                className={`${playfair.className} mt-5 text-lg font-bold text-gray-900 sm:text-xl`}
              >
                {name}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

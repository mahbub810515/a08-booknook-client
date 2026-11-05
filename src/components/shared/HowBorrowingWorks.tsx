import { BookOpen, RotateCcw, Search } from "lucide-react";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const steps = [
  {
    step: "Step 1",
    title: "Find a book",
    description: "Browse the shelf and open any book you like.",
    icon: Search,
  },
  {
    step: "Step 2",
    title: "Borrow it",
    description: "Confirm the borrow. The book is yours for 7 days.",
    icon: BookOpen,
  },
  {
    step: "Step 3",
    title: "Return it",
    description: "Done reading? Return it from My Borrows in one click.",
    icon: RotateCcw,
  },
];

export default function HowBorrowingWorks() {
  return (
    <section className="w-full bg-gray-50 py-16 lg:py-20">
      <div className="mx-auto w-full max-w-6xl px-5 lg:px-8">
        <div className="text-center">
          <h2
            className={`${playfair.className} text-3xl font-bold text-gray-900 sm:text-4xl`}
          >
            How Borrowing Works
          </h2>
          <p className="mt-3 text-sm text-gray-600 sm:text-base">
            Three steps. No library card needed.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:gap-6">
          {steps.map(({ step, title, description, icon: Icon }) => (
            <div
              key={step}
              className="rounded-xl border border-gray-200 bg-white px-6 py-8 text-center shadow-sm"
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                <Icon
                  size={20}
                  className="text-emerald-600"
                  aria-hidden="true"
                />
              </span>

              <p className="mt-5 text-xs font-bold tracking-wide text-emerald-600 uppercase">
                {step}
              </p>

              <h3
                className={`${playfair.className} mt-1.5 text-lg font-bold text-gray-900 sm:text-xl`}
              >
                {title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

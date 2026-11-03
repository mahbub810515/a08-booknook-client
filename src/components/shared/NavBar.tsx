
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BookOpen,
  Menu,
  X,
  Library,
  Plus,
  BookMarked,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const navLinks = [
  {
    name: "Home",
    href: "/",
    icon: Library,
  },
  {
    name: "All Books",
    href: "/books",
    icon: Library,
  },
  {
    name: "Add Books",
    href: "/books/add",
    icon: Plus,
  },
  {
    name: "My Books",
    href: "/my-books",
    icon: BookMarked,
  },
  {
    name: "My Borrow",
    href: "/borrow",
    icon: BookMarked,
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/70 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
            <BookOpen size={23} />
          </div>

          <span className="text-2xl font-bold tracking-tight text-gray-900">
            Book<span className="text-emerald-600">Nook</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-emerald-600"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Button
            
            variant="ghost"
            className="font-semibold text-gray-700 hover:text-emerald-600"
          >
            <Link href="/sign-in">Sign In</Link>
          </Button>

          <Button
            
            className="rounded-full bg-emerald-600 px-6 font-semibold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700"
          >
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-gray-100 bg-white px-5 py-5 shadow-lg md:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <Icon size={19} />
                  {link.name}
                </Link>
              );
            })}

            <div className="my-2 border-t border-gray-100" />
            <Button  variant="outline" className="w-full rounded-full">
              <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                Sign In
              </Link>
            </Button>

            <Button              
              className="w-full rounded-full bg-emerald-600 hover:bg-emerald-700"
            >
              <Link href="/sign-up" onClick={() => setIsOpen(false)}>
                Sign Up
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

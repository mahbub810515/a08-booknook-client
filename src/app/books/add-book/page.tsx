"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";

type FieldName =
  | "bookName"
  | "writer"
  | "image"
  | "description"
  | "category"
  | "language"
  | "pages"
  | "stock";

type FormValues = Record<FieldName, string>;
type FormErrors = Partial<Record<FieldName, string>>;

const initialValues: FormValues = {
  bookName: "",
  writer: "",
  image: "",
  description: "",
  category: "",
  language: "",
  pages: "",
  stock: "",
};

const categories = [
  "Fiction",
  "Non-Fiction",
  "Science",
  "Technology",
  "History",
  "Biography",
  "Self-Help",
  "Children",
  "Other",
];

const languages = ["English", "Bangla", "Hindi", "Arabic", "Other"];

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.bookName.trim()) {
    errors.bookName = "Book name is required";
  }

  if (!values.writer.trim()) {
    errors.writer = "Writer name is required";
  }

  if (!values.image.trim()) {
    errors.image = "Image URL is required";
  } else if (!/^https?:\/\/\S+$/i.test(values.image.trim())) {
    errors.image = "Enter a valid URL (https://...)";
  }

  if (!values.description.trim()) {
    errors.description = "Description is required";
  }

  if (!values.category) {
    errors.category = "Category is required";
  }

  if (!values.language) {
    errors.language = "Language is required";
  }

  if (!values.pages.trim()) {
    errors.pages = "Pages is required";
  } else if (!/^\d+$/.test(values.pages.trim()) || Number(values.pages) < 1) {
    errors.pages = "Pages must be a positive whole number";
  }

  if (!values.stock.trim()) {
    errors.stock = "Stock is required";
  } else if (!/^\d+$/.test(values.stock.trim()) || Number(values.stock) < 0) {
    errors.stock = "Stock must be 0 or more";
  }

  return errors;
}

export default function AddBooksPage() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as FieldName]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setSubmitError(null);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }

  
  }

  function fieldError(name: FieldName) {
    return errors[name] ? (
      <p role="alert" className="text-xs font-medium text-destructive">
        {errors[name]}
      </p>
    ) : null;
  }

  return (
    <main className="flex flex-1 items-center justify-center px-5 py-12">
      <Card className="w-full max-w-xl gap-6 shadow-xl shadow-gray-900/5">
        <CardHeader className="gap-2 text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Add a Book
          </CardTitle>
          <CardDescription>
            Fill in the details to add a new book to BookNook
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-5">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="bookName" className="text-gray-700">
                Book Name
              </Label>
              <Input
                id="bookName"
                name="bookName"
                type="text"
                placeholder="The Silent Patient"
                value={values.bookName}
                onChange={handleChange}
                aria-invalid={Boolean(errors.bookName)}
                className="h-10 rounded-full px-4"
              />
              {fieldError("bookName")}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="writer" className="text-gray-700">
                Writer
              </Label>
              <Input
                id="writer"
                name="writer"
                type="text"
                placeholder="Alex Michaelides"
                value={values.writer}
                onChange={handleChange}
                aria-invalid={Boolean(errors.writer)}
                className="h-10 rounded-full px-4"
              />
              {fieldError("writer")}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="image" className="text-gray-700">
                Image URL
              </Label>
              <Input
                id="image"
                name="image"
                type="url"
                placeholder="https://example.com/book-cover.jpg"
                value={values.image}
                onChange={handleChange}
                aria-invalid={Boolean(errors.image)}
                className="h-10 rounded-full px-4"
              />
              {fieldError("image")}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="description" className="text-gray-700">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="A short summary of the book..."
                value={values.description}
                onChange={handleChange}
                aria-invalid={Boolean(errors.description)}
                className="min-h-24 rounded-xl"
              />
              {fieldError("description")}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="category" className="text-gray-700">
                  Category
                </Label>
                <NativeSelect
                  id="category"
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.category)}
                  className="w-full"
                >
                  <NativeSelectOption value="">Select category</NativeSelectOption>
                  {categories.map((category) => (
                    <NativeSelectOption key={category} value={category}>
                      {category}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
                {fieldError("category")}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="language" className="text-gray-700">
                  Language
                </Label>
                <NativeSelect
                  id="language"
                  name="language"
                  value={values.language}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.language)}
                  className="w-full"
                >
                  <NativeSelectOption value="">Select language</NativeSelectOption>
                  {languages.map((language) => (
                    <NativeSelectOption key={language} value={language}>
                      {language}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
                {fieldError("language")}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="pages" className="text-gray-700">
                  Pages
                </Label>
                <Input
                  id="pages"
                  name="pages"
                  type="number"
                  min={1}
                  placeholder="320"
                  value={values.pages}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.pages)}
                  className="h-10 rounded-full px-4"
                />
                {fieldError("pages")}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="stock" className="text-gray-700">
                  Stock
                </Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  min={0}
                  placeholder="10"
                  value={values.stock}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.stock)}
                  className="h-10 rounded-full px-4"
                />
                {fieldError("stock")}
              </div>
            </div>

            <Button
              type="submit"
              className="mt-1 h-10 w-full rounded-full bg-emerald-600 px-6 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700"
            >
              Add Book
            </Button>

            {submitted && (
              <p
                role="status"
                className="rounded-lg bg-emerald-50 px-4 py-3 text-center text-sm font-medium text-emerald-700 ring-1 ring-emerald-600/20"
              >
                Book added successfully!
              </p>
            )}

            {submitError && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600 ring-1 ring-red-600/20"
              >
                {submitError}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

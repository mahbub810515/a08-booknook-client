"use client";

import Link from "next/link";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";

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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError("Enter a valid email address");
      return;
    }

    setSubmitting(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
      if (!baseUrl) {
        throw new Error("Server is not configured. Please try again later.");
      }

      const response = await fetch(`${baseUrl}/api/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!response.ok) {
        let message = "Could not send the reset link. Please try again.";
        const data = await response.json().catch(() => null);
        if (data && typeof data.message === "string") {
          message = data.message;
        }
        throw new Error(message);
      }

      setSuccess(
        "If an account exists for that email, a reset link has been sent."
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex flex-1 items-center justify-center px-5 py-12">
      <Card className="w-full max-w-md gap-6 shadow-xl shadow-gray-900/5">
        <CardHeader className="gap-2 text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Forgot password
          </CardTitle>
          <CardDescription>
            Enter your email and we&apos;ll send you a reset link
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-5">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-4"
          >
            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700 ring-1 ring-red-600/20"
              >
                {error}
              </p>
            )}

            {success && (
              <p
                role="status"
                className="rounded-lg bg-emerald-50 px-4 py-3 text-center text-sm font-medium text-emerald-700 ring-1 ring-emerald-600/20"
              >
                {success}
              </p>
            )}

            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="jane@example.com"
                autoComplete="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (error) setError("");
                }}
                aria-invalid={Boolean(error)}
                className="h-10 rounded-full px-4"
              />
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="mt-1 h-10 w-full gap-2 rounded-full bg-emerald-600 px-6 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700"
            >
              {submitting && (
                <Loader2Icon
                  className="size-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Send reset link
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Remembered it?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-emerald-600 hover:underline"
            >
              Back to Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}

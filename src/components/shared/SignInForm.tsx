"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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
import { toast } from "@/components/ui/toast";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getSafeNext(raw: string | null): string {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) {
    return "/";
  }
  return raw;
}

function GoogleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-4"
      fill="currentColor"
    >
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = getSafeNext(searchParams.get("next"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function notifyError(message: string) {
    setFormError(message);
    toast.add({
      type: "error",
      title: "Login failed",
      description: message,
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
  }

  function handleGoogleLogin() {
    setFormError("");
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
    if (!baseUrl) {
      notifyError(
        "Google login is unavailable right now. Please try again later."
      );
      return;
    }
    try {
      const url = new URL(`${baseUrl}/api/auth/google`);
      url.searchParams.set("next", next);
      window.location.href = url.href;
    } catch {
      notifyError(
        "Google login is unavailable right now. Please try again later."
      );
    }
  }

  return (
    <main className="flex flex-1 items-center justify-center px-5 py-12">
      <Card className="w-full max-w-md gap-6 shadow-xl shadow-gray-900/5">
        <CardHeader className="gap-2 text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Login
          </CardTitle>
          <CardDescription>
            Welcome back — enter your credentials to continue reading
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-5">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="google-sign-in" className="sr-only">
                Sign in with Google
              </Label>
              <Button
                id="google-sign-in"
                type="button"
                variant="outline"
                onClick={handleGoogleLogin}
                className="h-10 w-full gap-2.5 rounded-full text-sm font-semibold"
              >
                <GoogleIcon />
                Sign in with Google
              </Button>
            </div>

            <div className="flex items-center gap-3 text-xs font-medium text-gray-400">
              <span className="h-px flex-1 bg-gray-200" />
              or continue with email
              <span className="h-px flex-1 bg-gray-200" />
            </div>

            {formError && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700 ring-1 ring-red-600/20"
              >
                {formError}
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
                  if (errors.email) {
                    setErrors((prev) => ({ ...prev, email: undefined }));
                  }
                }}
                aria-invalid={Boolean(errors.email)}
                className="h-10 rounded-full px-4"
              />
              {errors.email && (
                <p role="alert" className="text-xs font-medium text-destructive">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <Label htmlFor="password" className="text-gray-700">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-emerald-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  if (errors.password) {
                    setErrors((prev) => ({ ...prev, password: undefined }));
                  }
                }}
                aria-invalid={Boolean(errors.password)}
                className="h-10 rounded-full px-4"
              />
              {errors.password && (
                <p
                  role="alert"
                  className="text-xs font-medium text-destructive"
                >
                  {errors.password}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="mt-1 h-10 w-full gap-2 rounded-full bg-emerald-600 px-6 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700"
            >
              {submitting && (
                <Loader2Icon className="size-4 animate-spin" aria-hidden="true" />
              )}
              Login
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-emerald-600 hover:underline"
            >
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}

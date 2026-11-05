import { Suspense } from "react";

import SignInForm from "@/components/shared/SignInForm";

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <main className="flex flex-1 items-center justify-center px-5 py-12">
          <p className="text-sm text-gray-500">Loading…</p>
        </main>
      }
    >
      <SignInForm />
    </Suspense>
  );
}

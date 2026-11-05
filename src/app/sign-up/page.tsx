"use client";

import Link from "next/link";
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


type FieldName = "name" | "email" | "photoUrl" | "password";

type FormValues = Record<FieldName, string>;
type FormErrors = Partial<Record<FieldName, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  photoUrl: "",
  password: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = "Enter a valid email address";
  }

  if (!values.photoUrl.trim()) {
    errors.photoUrl = "Photo URL is required";
  } else if (!/^https?:\/\/\S+$/i.test(values.photoUrl.trim())) {
    errors.photoUrl = "Enter a valid URL (https://...)";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
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

export default function SignUpPage() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
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

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }
    try{
      const userData ={
        ...values
      }
      console.log(userData)
      //send data to the server
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/sign-up`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"          
        },
        body:JSON.stringify(userData)
      })
      if(!response.ok){
          throw new Error("failed to save user data")
      }
      const result = await response.json();
      console.log("submited successfully",result);
      setSubmitted(true)

    }catch (error){
      console.log("Error",error);
      setSubmitted(false);
    }
  }

  const fields: Array<{
    name: FieldName;
    label: string;
    type: string;
    placeholder: string;
    autoComplete?: string;
  }> = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Jane Doe",
      autoComplete: "name",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "jane@example.com",
      autoComplete: "email",
    },
    {
      name: "photoUrl",
      label: "Photo URL",
      type: "url",
      placeholder: "https://example.com/photo.jpg",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "••••••••",
      autoComplete: "new-password",
    },
  ];

  return (
    <main className="flex flex-1 items-center justify-center px-5 py-12">
      <Card className="w-full max-w-md gap-6 shadow-xl shadow-gray-900/5">
        <CardHeader className="gap-2 text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Create an account
          </CardTitle>
          <CardDescription>
            Join BookNook to discover, borrow, and share books
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-5">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="google-sign-up" className="sr-only">
                Sign up with Google
              </Label>
              <Button
                id="google-sign-up"
                type="button"
                variant="outline"
                className="h-10 w-full gap-2.5 rounded-full text-sm font-semibold"
              >
                <GoogleIcon />
                Sign up with Google
              </Button>
            </div>

            <div className="flex items-center gap-3 text-xs font-medium text-gray-400">
              <span className="h-px flex-1 bg-gray-200" />
              or continue with email
              <span className="h-px flex-1 bg-gray-200" />
            </div>

            {fields.map((field) => (
              <div key={field.name} className="flex flex-col gap-2">
                <Label htmlFor={field.name} className="text-gray-700">
                  {field.label}
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                  value={values[field.name]}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors[field.name])}
                  className="h-10 rounded-full px-4"
                />
                {errors[field.name] && (
                  <p role="alert" className="text-xs font-medium text-destructive">
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}

            <Button
              type="submit"
              className="mt-1 h-10 w-full rounded-full bg-emerald-600 px-6 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700"
            >
              Register
            </Button>

            {submitted && (
              <p
                role="status"
                className="rounded-lg bg-emerald-50 px-4 py-3 text-center text-sm font-medium text-emerald-700 ring-1 ring-emerald-600/20"
              >
                Your account has been created successfully!
              </p>
            )}
          </form>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-emerald-600 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}

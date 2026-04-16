"use client";

import Link from "next/link";
import { GalleryVerticalEnd } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "../hooks/use-auth";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending, errorMessage } = useLoginMutation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({ username, password });
  };

  return (
    <div
      className={cn(
        "rounded-2xl border w-125 border-border/80 bg-card/90 p-6  shadow-xl shadow-background backdrop-blur sm:p-8",
        className,
      )}
      {...props}
    >
      <form className="space-y-5 min-w-80" onSubmit={handleSubmit}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex size-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
              <GalleryVerticalEnd className="size-5" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Welcome back
            </h1>
            <FieldDescription className="text-muted-foreground">
              Sign in to continue to Hamro Dashboard
            </FieldDescription>
          </div>

          <FieldSeparator className="my-2" />

          <Field>
            <FieldLabel htmlFor="username">username</FieldLabel>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="h-11 rounded-xl border-border bg-card"
            />
          </Field>

          <Field>
            <div className="mb-1 flex items-center justify-between">
              <FieldLabel htmlFor="password">Password</FieldLabel>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-11 rounded-xl border-border bg-card"
            />
          </Field>

          {errorMessage ? <FieldError>{errorMessage}</FieldError> : null}

          <Field className="pt-2">
            <Button
              type="submit"
              disabled={isPending}
              className="h-11 w-full rounded-xl bg-slate-900 text-white hover:bg-slate-800"
            >
              {isPending ? "Signing in..." : "Sign in"}
            </Button>
          </Field>

          <FieldDescription className="pt-1 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Create one
            </Link>
          </FieldDescription>
        </FieldGroup>
      </form>

      <FieldDescription className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">
        By continuing, you agree to our{" "}
        <Link href="/terms" className="underline underline-offset-2">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline underline-offset-2">
          Privacy Policy
        </Link>
        .
      </FieldDescription>
    </div>
  );
}

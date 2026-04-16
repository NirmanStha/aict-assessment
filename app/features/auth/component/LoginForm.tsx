import Link from "next/link";
import { GalleryVerticalEnd } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-2xl border w-125 border-slate-200/80 bg-white/90 p-6  shadow-xl shadow-slate-300/30 backdrop-blur sm:p-8",
        className,
      )}
      {...props}
    >
      <form className="space-y-5 min-w-80">
        <FieldGroup>
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex size-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
              <GalleryVerticalEnd className="size-5" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Welcome back
            </h1>
            <FieldDescription className="text-slate-600">
              Sign in to continue to Hamro Dashboard
            </FieldDescription>
          </div>

          <FieldSeparator className="my-2" />

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              required
              className="h-11 rounded-xl border-slate-300 bg-white"
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
              className="h-11 rounded-xl border-slate-300 bg-white"
            />
          </Field>

          <Field className="pt-2">
            <Button
              type="submit"
              className="h-11 w-full rounded-xl bg-slate-900 text-white hover:bg-slate-800"
            >
              Sign in
            </Button>
          </Field>

          <FieldDescription className="pt-1 text-center text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-slate-900 underline-offset-4 hover:underline"
            >
              Create one
            </Link>
          </FieldDescription>
        </FieldGroup>
      </form>

      <FieldDescription className="mt-5 text-center text-xs leading-relaxed text-slate-500">
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

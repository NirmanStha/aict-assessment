import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { login, me, register } from "../api/auth.api";
import type {
  LoginPayload,
  RegisterPayload,
} from "@/app/features/auth/types/auth.types";
import { authKeys } from "./auth.keys";

export function meQueryOptions(enabled: boolean) {
  return queryOptions({
    queryKey: authKeys.me(),
    queryFn: me,
    enabled,
    retry: false,
    staleTime: 60 * 1000,
  });
}

export function loginMutationOptions() {
  return mutationOptions({
    mutationFn: (payload: LoginPayload) => login(payload),
  });
}

export function registerMutationOptions() {
  return mutationOptions({
    mutationFn: (payload: RegisterPayload) => register(payload),
  });
}

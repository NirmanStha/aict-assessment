"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type {
  ApiErrorPayload,
  LoginPayload,
  UserProfile,
} from "@/app/features/auth/types/auth.types";
import { authKeys } from "../queries/auth.keys";
import {
  loginMutationOptions,
  logoutMutationOptions,
  meQueryOptions,
} from "../queries/auth.queries";

function toErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const payload = error.response?.data as ApiErrorPayload | undefined;

    if (payload?.message) {
      return payload.message;
    }

    if (payload?.error) {
      return payload.error;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

export function useMeQuery() {
  return useQuery(meQueryOptions(true));
}

export function useLoginMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    ...loginMutationOptions(),
    onSuccess: (data: UserProfile) => {
      const profile: UserProfile = {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        image: data.image,
        gender: data.gender,
      };

      queryClient.setQueryData(authKeys.me(), profile);
      toast.success("Login successful");
      router.push("/");
    },
    onError: (error) => {
      toast.error(toErrorMessage(error));
    },
  });

  return {
    ...mutation,
    errorMessage: mutation.error ? toErrorMessage(mutation.error) : "",
    login: (payload: LoginPayload) => mutation.mutate(payload),
  };
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    ...logoutMutationOptions(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: authKeys.all });
      router.push("/login");
      router.refresh();
    },
    onError: (error) => {
      toast.error(toErrorMessage(error));
    },
  });

  return {
    ...mutation,
    logout: () => mutation.mutate(),
  };
}

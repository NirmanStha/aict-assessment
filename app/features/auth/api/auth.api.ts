import axios, { type AxiosResponse } from "axios";
import api from "@/lib/http";
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  UserProfile,
} from "@/app/features/auth/types/auth.types";

const ACCESS_EXPIRY_MINUTES = 30;

const authApi = axios.create({
  withCredentials: true,
});

function extractData<T>(request: Promise<AxiosResponse<T>>): Promise<T> {
  return request.then((response) => response.data);
}

export function login(payload: LoginPayload): Promise<UserProfile> {
  return extractData(
    authApi.post<UserProfile>("/api/auth/login", {
      username: payload.username,
      password: payload.password,
      expiresInMins: ACCESS_EXPIRY_MINUTES,
    }),
  );
}

export function register(payload: RegisterPayload): Promise<AuthResponse> {
  return extractData(
    api.post<AuthResponse>("/auth/register", {
      email: payload.email,
      password: payload.password,
    }),
  );
}

export function me(): Promise<UserProfile> {
  return extractData(authApi.get<UserProfile>("/api/auth/me"));
}

export function logout(): Promise<{ ok: boolean }> {
  return extractData(authApi.post<{ ok: boolean }>("/api/auth/logout"));
}

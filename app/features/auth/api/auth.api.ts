import type { AxiosResponse } from "axios";
import api from "@/lib/http";
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  UserProfile,
} from "@/app/features/auth/types/auth.types";

const ACCESS_EXPIRY_MINUTES = 30;

function extractData<T>(request: Promise<AxiosResponse<T>>): Promise<T> {
  return request.then((response) => response.data);
}

export function login(payload: LoginPayload): Promise<AuthResponse> {
  return extractData(
    api.post<AuthResponse>("/auth/login", {
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
  return extractData(api.get<UserProfile>("/auth/me"));
}

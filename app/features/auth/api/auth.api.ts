import api from "@/lib/http";

export function login(email: string, password: string) {
  return api.post("/auth/login", { email, password, expiresInMins: 10 });
}

export const register = (email: string, password: string) => {
  return api.post("/auth/register", { email, password });
};

export function me() {
  return api.get("/auth/me");
}

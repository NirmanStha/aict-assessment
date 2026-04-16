export const authKeys = {
  all: ["auth"] as const,
  me: () => ["auth", "me"] as const,
  session: () => ["auth", "session"] as const,
};

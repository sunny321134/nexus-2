"use client";

export type User = { id: string; name: string; email: string } | null;

export function getCurrentUser(): User {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("pg_user");
  return raw ? (JSON.parse(raw) as User) : null;
}

export function signIn(email: string, password: string): User {
  const fakeUser = { id: "local-" + Math.random().toString(36).slice(2), name: email.split("@")[0], email };
  if (typeof window !== "undefined") localStorage.setItem("pg_user", JSON.stringify(fakeUser));
  return fakeUser;
}

export function signUp(name: string, email: string, password: string): User {
  const fakeUser = { id: "local-" + Math.random().toString(36).slice(2), name, email };
  if (typeof window !== "undefined") localStorage.setItem("pg_user", JSON.stringify(fakeUser));
  return fakeUser;
}

export function signOut() {
  if (typeof window !== "undefined") localStorage.removeItem("pg_user");
}


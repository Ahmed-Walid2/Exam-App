"use client";

import { SessionProvider } from "next-auth/react";

type NextAuthProviderType = {
  children: React.ReactNode;
};

export default function NextAuthProvider({ children }: NextAuthProviderType) {
  return <SessionProvider>{children}</SessionProvider>;
}

import { createContext } from "react";

import type { AuthUser } from "../@types/auth";

export type AuthContextType = {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  isLoggedIn: boolean;
  isAuthLoading: boolean;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
};

export const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);
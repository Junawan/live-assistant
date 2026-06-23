import { create } from "zustand";

import type {
  User,
  Company,
  Subscription,
} from "@/types";

interface SessionState {
  user: User | null;

  company: Company | null;

  subscription: Subscription | null;

  loading: boolean;

  setSession: (session: {
    user: User;
    company: Company;
    subscription: Subscription;
  }) => void;

  clear: () => void;

  setLoading: (loading: boolean) => void;
}

export const useSessionStore =
  create<SessionState>((set) => ({
    user: null,

    company: null,

    subscription: null,

    loading: true,

    setSession: (session) =>
      set({
        user: session.user,
        company: session.company,
        subscription: session.subscription,
      }),

    clear: () =>
      set({
        user: null,
        company: null,
        subscription: null,
        loading: false,
      }),

    setLoading: (loading) =>
      set({
        loading,
      }),
  }));
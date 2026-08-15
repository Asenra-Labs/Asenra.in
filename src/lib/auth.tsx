"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabase";
import { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  activeEmail: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
  setCustomSessionEmail: (email: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  activeEmail: null,
  isLoggedIn: false,
  loading: true,
  signOut: async () => {},
  refreshSession: async () => {},
  setCustomSessionEmail: () => {},
});

// Cookie helper
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop()?.split(";").shift() || "");
  return null;
}

function setCookie(name: string, value: string, days: number = 30) {
  if (typeof document === "undefined") return;
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/; SameSite=Lax`;
}

function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
}

export function AuthProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [activeEmail, setActiveEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const syncEmailState = (supabaseUser: User | null) => {
    if (supabaseUser?.email) {
      setActiveEmail(supabaseUser.email);
      setCookie("asenra_session_email", supabaseUser.email, 30);
      if (typeof window !== "undefined") {
        localStorage.setItem("asenra_session_email", supabaseUser.email);
      }
    } else {
      const storedCookieEmail = getCookie("asenra_session_email");
      const storedLocalEmail = typeof window !== "undefined" ? localStorage.getItem("asenra_session_email") : null;
      const fallbackEmail = storedCookieEmail || storedLocalEmail;
      setActiveEmail(fallbackEmail);
    }
  };

  const fetchSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      syncEmailState(session?.user ?? null);
    } catch (err) {
      console.error("Error fetching session:", err);
      syncEmailState(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        syncEmailState(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const setCustomSessionEmail = (email: string) => {
    const cleanEmail = email.trim().toLowerCase();
    setActiveEmail(cleanEmail);
    setCookie("asenra_session_email", cleanEmail, 30);
    if (typeof window !== "undefined") {
      localStorage.setItem("asenra_session_email", cleanEmail);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {}
    setUser(null);
    setSession(null);
    setActiveEmail(null);
    deleteCookie("asenra_session_email");
    deleteCookie("asenra_employee_id");
    if (typeof window !== "undefined") {
      localStorage.removeItem("asenra_session_email");
      localStorage.removeItem("asenra_employee_id");
    }
  };

  const refreshSession = async () => {
    await fetchSession();
  };

  const isLoggedIn = Boolean(user || activeEmail);

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      activeEmail, 
      isLoggedIn, 
      loading, 
      signOut, 
      refreshSession,
      setCustomSessionEmail
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

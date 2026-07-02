import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext(null);
const PROFILE_STORAGE_KEY = "user_profile";
const SESSION_STORAGE_KEY = "user_session";

function getStoredProfile() {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(PROFILE_STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
}

function getStoredSession() {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(SESSION_STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(getStoredSession);
  const [profile, setProfile] = useState(getStoredProfile);
  const [loading, setLoading] = useState(true);

  const setStoredProfile = useCallback((nextProfile) => {
    setProfile(nextProfile);
    if (typeof window !== "undefined") {
      if (nextProfile) {
        window.localStorage.setItem(
          PROFILE_STORAGE_KEY,
          JSON.stringify(nextProfile),
        );
      } else {
        window.localStorage.removeItem(PROFILE_STORAGE_KEY);
      }
    }
  }, []);

  const setStoredSession = useCallback((nextSession) => {
    setSession(nextSession);
    if (typeof window !== "undefined") {
      if (nextSession) {
        window.localStorage.setItem(
          SESSION_STORAGE_KEY,
          JSON.stringify(nextSession),
        );
      } else {
        window.localStorage.removeItem(SESSION_STORAGE_KEY);
      }
    }
  }, []);

  const loadProfile = useCallback(
    async (user, shouldPersist = true) => {
      if (!user) {
        setStoredProfile(null);
        return null;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (error && error.code !== "PGRST116") {
        console.error(error);
      }

      if (!data) {
        const fallbackProfile = {
          id: user.id,
          full_name:
            user.name ||
            user.full_name ||
            user.email?.split("@")[0] ||
            "Member",
          role: user.role === "admin" ? "admin" : "member",
          tier: "bronze",
          total_points: 0,
        };
        if (shouldPersist) {
          setStoredProfile(fallbackProfile);
        }
        return fallbackProfile;
      }

      const normalizedProfile = {
        ...data,
        role: data.role || "member",
        tier: data.tier || "bronze",
        total_points: data.total_points || 0,
      };

      if (shouldPersist) {
        setStoredProfile(normalizedProfile);
      }

      return normalizedProfile;
    },
    [setStoredProfile],
  );

  useEffect(() => {
    const initializeAuth = async () => {
      const storedSession = getStoredSession();
      setSession(storedSession);
      if (storedSession) {
        await loadProfile(storedSession);
      } else {
        setStoredProfile(null);
      }
      setLoading(false);
    };

    initializeAuth();
  }, [loadProfile, setStoredProfile]);

  const signIn = useCallback(
    async (email, password) => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .eq("password", password)
        .maybeSingle();

      if (error) {
        throw error;
      }

      if (!data) {
        throw new Error("Email atau password salah.");
      }

      const profileData = await loadProfile(data);
      setStoredSession(data);
      setStoredProfile(profileData);
      return { user: data, profile: profileData };
    },
    [loadProfile, setStoredProfile, setStoredSession],
  );

  const signUp = useCallback(
    async (email, password, fullName) => {
      const { data: existing, error: existingError } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .maybeSingle();

      if (existingError) {
        throw existingError;
      }

      if (existing) {
        throw new Error("Email sudah terdaftar.");
      }

      const { data, error } = await supabase
        .from("users")
        .insert({
          name: fullName,
          email,
          password,
          role: "user",
        })
        .select("*")
        .single();

      if (error) {
        throw error;
      }

      const profileData = await loadProfile(data);
      setStoredSession(data);
      setStoredProfile(profileData);
      return { user: data, profile: profileData };
    },
    [loadProfile, setStoredProfile, setStoredSession],
  );

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
    setStoredProfile(null);
  }, [setStoredProfile]);

  const value = useMemo(
    () => ({
      session,
      profile,
      loading,
      signIn,
      signUp,
      signOut,
      refreshProfile: () => loadProfile(session?.user),
    }),
    [loading, loadProfile, profile, session, signIn, signOut, signUp],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

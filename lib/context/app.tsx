import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { CircularProgress } from "@mui/material";
import '../services/firebase';

type App = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  user: User | undefined;
};

export const AppContext = createContext<App>({
  loading: false,
  setLoading: (value: boolean) => {},
} as App);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => setLoading(true));
    router.events.on("routeChangeComplete", () => setLoading(false));
    router.events.on("routeChangeError", () => setLoading(false));
  });

  useEffect(() => {
    onAuthStateChanged(getAuth(), (u) => {
      u && setUser(u);
      setMounted(true);
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        user,
      }}
    >
      {mounted ? (
        children
      ) : (
        <div className="center vh">
          <CircularProgress sx={{ color: "white" }} />
        </div>
      )}
    </AppContext.Provider>
  );
}

/** Hook to get current user */
export function useApp() {
  return useContext(AppContext);
}

import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

type App = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export const AppContext = createContext<App>({
  loading: false,
  setLoading: (value: boolean) => {},
} as App);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => setLoading(true));
    router.events.on("routeChangeComplete", () => setLoading(false));
    router.events.on("routeChangeError", () => setLoading(false));
  });

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

/** Hook to get current user */
export function useApp() {
  return useContext(AppContext);
}

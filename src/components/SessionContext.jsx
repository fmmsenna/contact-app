import React, { useEffect, useState } from "react";
import supabase from "../supabase";

export const SessionContext = React.createContext(null);

export function SessionProvider({ children }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    let subscription;

    const setupSession = async () => {
      const {
        data: { session: initialSession },
      } = await supabase.auth.getSession();

      if (initialSession) {
        setSession(initialSession);
      }

      subscription = supabase.auth.onAuthStateChange(
        (_event, changedSession) => {
          setSession(changedSession);
        }
      );
    };

    setupSession();

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
}

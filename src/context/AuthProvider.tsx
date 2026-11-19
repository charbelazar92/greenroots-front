import { useState, useEffect,useRef } from "react";
import type { ReactNode } from "react";
import type { AuthUser } from "../@types/auth";
import { AuthContext } from "./AuthContext.ts";



export default function AuthProvider({ children,}: {children: ReactNode;}) {

  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Empêche la restauration de session d'être appelée deux fois
  // en développement avec le Strict Mode de React et ainsi générer 2refreshtoken
  const hasRestoredSession = useRef(false);


  // Vérifie la présence d'une session au premier chargement
  // ou après un rafraîchissement de la page.
 useEffect(() => {
  if (hasRestoredSession.current) {
    return;
  }

  hasRestoredSession.current = true;

  async function restoreSession() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (!response.ok) {
        setUser(null);
        return;
      }

      const userData = await response.json();
      setUser(userData);
    } catch {
      setUser(null);
    } finally {
      setIsAuthLoading(false);
    }
  }

  restoreSession();
}, []);


async function login(email: string, password: string) {
  const userLoginData = {
    email,
    password,
  };

  let response: Response;

  try {
    response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/auth/login`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLoginData),
      },
    );
  } catch {
    throw new Error(
      "Impossible de contacter le serveur. Veuillez réessayer.",
    );
  }

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      responseData.error || "La connexion a échoué.",
    );
  }

  setUser(responseData);
}

  const isLoggedIn = user !== null;

  async function logout() {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/auth/logout`,
    {
      method: "POST",
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("La déconnexion a échoué.");
  }

  setUser(null);
}
  
 
  return (
    <AuthContext.Provider value={{ user, setUser,isLoggedIn,  isAuthLoading, login,logout,}}>
      {children}
    </AuthContext.Provider>
  );
}

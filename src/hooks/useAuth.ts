import { useContext } from "react";

import { AuthContext } from "../context/AuthContext.ts";

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      "useAuth doit être utilisé dans un AuthProvider",
    );
  }

  return context;
}



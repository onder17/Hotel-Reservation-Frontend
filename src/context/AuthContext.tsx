import { createContext } from "react";

interface AuthContextType {
  accessToken: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);



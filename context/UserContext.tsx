"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { user } from "@/interface/interface";



interface UserContextProps {
  user: user | null;
  setUser: (user: user) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

// Este es el Provider que envolverá tu app
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<user | null>(null);

  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser debe usarse dentro de <UserProvider>");
  return context;
};

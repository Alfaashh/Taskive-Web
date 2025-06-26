"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Pet = { id: number, name: string, status: string, image: string };
export type User = {
  name: string;
  level: number;
  xp: number;
  nextLevelExp: number;
  coins: number;
  pets: Pet[];
  email?: string;
};

const defaultUser: User = {
  name: "Loading..",
  level: 1,
  xp: 0,
  nextLevelExp: 0,
  coins: 0,
  pets: [],
  email: "",
};

const UserContext = createContext<{
  user: User;
  setUser: (u: User) => Promise<void>;
}>({ user: defaultUser, setUser: async () => {} });

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User>(defaultUser);

  // Fetch user from API saat mount
  useEffect(() => {
    fetch("http://localhost/web/api/user.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.user) {
          setUserState({
            ...data.user,
            xp: Number(data.user.xp) || 0,
            nextLevelExp: Math.round(600 * Math.pow(1.2, (Number(data.user.level) || 1) - 1)),
            pets: [], // pets diabaikan dulu
          });
        }
      });
  }, []);

  // setUser: update ke API dan state
  const setUser = async (u: User) => {
    const payload = {
      name: u.name,
      coins: u.coins,
      xp: u.xp,
      level: u.level,
      email: u.email || "",
    };
    await fetch("http://localhost/web/api/user.php", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setUserState({
      ...u,
      nextLevelExp: Math.round(600 * Math.pow(1.2, (u.level || 1) - 1)),
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
} 
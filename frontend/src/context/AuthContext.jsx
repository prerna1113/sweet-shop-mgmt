import { createContext, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");

    if (!token) return null;

    try {
      const decoded = jwtDecode(token);
      return {
        token,
        role: decoded.role,   // 👈 role comes from JWT
        userId: decoded.userId
      };
    } catch (err) {
      localStorage.removeItem("token");
      return null;
    }
  });

  const login = (token) => {
    const decoded = jwtDecode(token);

    const userData = {
      token,
      role: decoded.role,     // 👈 admin / user
      userId: decoded.userId
    };

    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

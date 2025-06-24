// AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import keycloak from "../keycloak";

type AuthContextType = {
  token: string | null;
  user: any;
  login: () => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

let isKeycloakInitialized = false;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    keycloak.login();
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setUser(null);
    keycloak.logout({ redirectUri: window.location.origin });
  };

  const updateAuthState = (authenticated: boolean) => {
    setIsAuthenticated(authenticated);

    if (authenticated) {
      setToken(keycloak.token ?? null);
      setUser(keycloak.tokenParsed ?? null);
    } else {
      setToken(null);
      setUser(null);
    }
  };

  useEffect(() => {
    if (isKeycloakInitialized) {
      updateAuthState(keycloak.authenticated || false);
      return;
    }

    isKeycloakInitialized = true;

    keycloak
      .init({
        onLoad: "check-sso",
        pkceMethod: "S256",
        silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
      })
      .then((authenticated) => {
        updateAuthState(authenticated);

        // Event listeners'ı sadece ilk init'te kuruyoruz
        keycloak.onAuthSuccess = () => updateAuthState(true);
        keycloak.onAuthLogout = () => updateAuthState(false);
        keycloak.onTokenExpired = () => {
          keycloak.updateToken(30).then((refreshed) => {
            updateAuthState(refreshed);
          });
        };
      })
      .catch((err) => {
        console.error("Keycloak init error", err);
        setIsAuthenticated(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      token,
      user,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

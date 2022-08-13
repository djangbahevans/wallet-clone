import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_staff: boolean;
  phone: string;
  address: string;
  city: string;
  country: string;
  avatar: string;
  birth_date: string;
  gender: string;
  last_login: string;
  date_joined: string;
};


type AuthContext = {
  isAuthenticated: boolean;
  loading: boolean;
  user?: User;
  login: (user: any) => void;
  logout: () => void;
};

const authContext = createContext<AuthContext>({} as AuthContext);

const useAuthContext = () => {
  console.log("useAuthContext");
  const [authInfo, setAuthInfo] = useState<Omit<AuthContext, "login" | "logout">>({ isAuthenticated: false, loading: true });

  useQuery({
    queryKey: ["current_user"],
    queryFn: async () => {
      console.log("queryFn");
      // Get token from local storage
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("no token");
        throw new Error("No token found");
      }
      // Get user from token
      const { data } = await axios.get<User>("http://localhost:8000/api/v0/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data
    },
    onSuccess: (data) => {
      setAuthInfo({
        isAuthenticated: true,
        loading: false,
        user: data
      });
    },
    onError: (error) => {
      console.log("error");
      setAuthInfo({
        isAuthenticated: false,
        loading: false
      });
    }
  })

  const login = async ({ email, password }: { email: string, password: string }) => {
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    const { data } = await axios.post<{ access_token: string, token_type: string }>("http://localhost:8000/api/v0/login/access-token", formData);

    localStorage.setItem("token", data.access_token);

    // get user from token
    const { data: user } = await axios.get<User>("http://localhost:8000/api/v0/users/me", {
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      },
    });

    setAuthInfo({
      isAuthenticated: true,
      loading: false,
      user: user
    });
  }

  const logout = () => {
    localStorage.removeItem("token");
    setAuthInfo({
      isAuthenticated: false,
      loading: false
    });
  }

  return {
    ...authInfo,
    login,
    logout
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  console.log("AuthProvider");
  const authContextValue = useAuthContext();

  return (
    <authContext.Provider value={authContextValue}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);

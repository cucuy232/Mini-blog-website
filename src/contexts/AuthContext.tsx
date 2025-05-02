
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

// Define types
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  updateUser: (userData: Partial<User>) => void;
}

// Create context
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => false,
  logout: () => {},
  signup: async () => false,
  updateUser: () => {},
});

// Demo user for development
const demoUser: User = {
  id: "user-123",
  name: "Demo User",
  email: "demo@example.com",
  avatar: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=500&q=80",
};

// Provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  // Check for existing auth on mount
  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      
      if (loggedIn) {
        // In a real app, we would validate the token with the backend
        // For now, we'll just use the demo user
        setIsAuthenticated(true);
        setUser(demoUser);
      }
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, we would call an API endpoint here
      // For demo purposes, we'll just simulate a successful login
      
      // Check if email/password is valid (simulate validation)
      if (email.trim() && password.trim()) {
        setIsAuthenticated(true);
        setUser(demoUser);
        localStorage.setItem('isLoggedIn', 'true');
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${demoUser.name}!`,
        });
        
        return true;
      }
      
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      
      return false;
    } catch (error) {
      console.error("Login error:", error);
      
      toast({
        title: "Login failed",
        description: "An error occurred during login",
        variant: "destructive",
      });
      
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isLoggedIn');
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  // Signup function
  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, we would call an API endpoint here
      // For demo purposes, we'll just simulate a successful signup
      
      if (name.trim() && email.trim() && password.trim()) {
        const newUser = {
          ...demoUser,
          name,
          email,
        };
        
        setIsAuthenticated(true);
        setUser(newUser);
        localStorage.setItem('isLoggedIn', 'true');
        
        toast({
          title: "Signup successful",
          description: `Welcome, ${name}!`,
        });
        
        return true;
      }
      
      toast({
        title: "Signup failed",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      
      return false;
    } catch (error) {
      console.error("Signup error:", error);
      
      toast({
        title: "Signup failed",
        description: "An error occurred during signup",
        variant: "destructive",
      });
      
      return false;
    }
  };

  // Update user function
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, signup, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => useContext(AuthContext);

export default AuthContext;

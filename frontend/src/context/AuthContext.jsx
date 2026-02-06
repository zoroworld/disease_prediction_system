import { createContext, useContext, useState } from "react";
import { signup as apiSignup, login as apiLogin, getUserById as apigetUserById } from "../api/users";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Save user after login
  const login = async (userData) => {
    try {

      // Call backend login API
      const res = await apiLogin(userData);
  
      if (res.success) {
        const user = res.data.user_id
        // Auto-login after signup
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      }

      return { success: true, user: userData };
    } catch (error) {
      if (error.response) {
        return { success: false, errors: error.response.data.detail || error.response.data };
      }
      return { success: false, errors: "Network error" };
    }
  };

  // Signup function
  const signup = async ({ username, email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      return { success: false, errors: { password: "Passwords do not match" } };
    }

    // Call backend API
    const res = await apiSignup({ username, email, password });



    if (res.success) {

      // Auto-login after signup
      setUser(res.user_id);
      localStorage.setItem("user", JSON.stringify(res.user_id));
    }

    return res;
  };



  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("refresh");
  };


  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);

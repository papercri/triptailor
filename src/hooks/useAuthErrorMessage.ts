
import { useCallback } from "react";

export const useAuthErrorMessage = () => {
  const getErrorMessage = useCallback((code: string): string => {
    switch (code) {
      case "auth/user-not-found":
        return "No account found with that email.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/too-many-requests":
        return "Too many failed attempts. Please wait and try again.";
      case "auth/email-already-in-use":
        return "This email is already in use.";
      case "auth/weak-password":
        return "Password must be at least 6 characters long.";
      case "auth/invalid-credential":
        return "Invalid login credentials.";
      default:
        return "Something went wrong. Please try again later.";
    }
  }, []);

  return { getErrorMessage };
};

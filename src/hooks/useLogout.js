import { useAuth } from "../context/AuthContext";
import { logout as logoutService } from "../services/auth";

export default function useLogout() {
  const { setUser } = useAuth();;

  const logout = async () => {
    try {
      await logoutService();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setUser(null);
    }
  };

  return { logout };
}

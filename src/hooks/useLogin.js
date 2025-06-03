import { useState } from "react";
import { login as loginService } from "../services/auth";
import { useAuth } from "../context/AuthContext";

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const { authenticate } = useAuth();

  const login = async (formData) => {
    setLoading(true);

    try {
      const response = await loginService(formData);
      authenticate({ user: response.user, token: response.token });
      return response;
    } catch (error) {
      const res = error?.response?.data;
      const messages = res?.errors?.length ? res.errors : [res?.message || "Unexpected error during log in."];
      throw messages;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
}

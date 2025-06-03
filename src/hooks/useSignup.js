import { useState } from "react";
import { signup as signupService } from "../services/auth";

export default function useSignup() {
  const [loading, setLoading] = useState(false);

  const signup = async (formData) => {
    setLoading(true);

    try {
      const response = await signupService(formData);
      return response;
    } catch (error) {
      const res = error?.response?.data;
      const messages = res?.errors?.length ? res.errors : [res?.message || "Unexpected error during sign up."];
      throw messages;
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading };
}

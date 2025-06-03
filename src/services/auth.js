import api from "./axios";

export const login = async ({ email, password }) => {
  const response = await api.post('/login', {
    email,
    password
  });
  return response.data;
}

export const signup = async ({ name, email, password, confirmPassword }) => {
  const response = await api.post('/signup', {
    name,
    email,
    password,
    password_confirmation: confirmPassword
  });
  return response.data;
}

export const logout = async () => {
  const response = await api.post('/logout');
  return response.data;
}
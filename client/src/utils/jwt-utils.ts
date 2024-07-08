import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const getToken = () => {
  const token = Cookies.get("token");
  if (!token) {
    return null;
  }
  return token;
};

export const isLoggedIn = () => {
  const token = Cookies.get("token");
  return token !== undefined && token !== null && token !== "";
}

export const getUserId = () => {
  const token = Cookies.get("token");
  if (!token) {
    return null;
  }
  const decodedToken = jwtDecode(token) as { userId: string };
  return decodedToken.userId;
};

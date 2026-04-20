import axios from "axios";

export const getUser = async () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    const res = await axios.get("http://localhost:8000/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
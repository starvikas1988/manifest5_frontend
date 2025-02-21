import { useEffect, useState } from "react";

const AuthProvider = ({ onTokenFetched }) => {
  const [apiToken, setApiToken] = useState(null);

  useEffect(() => {
    const fetchAuthToken = async () => {
      try {
        const response = await fetch("https://api.maniifest5.com/api/Auth/token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "john@example.com",
            password: "password123"
          }),
        });

        if (!response.ok) throw new Error("Failed to fetch token");

        const data = await response.json();
      //  console.log(data.response.accessToken);

        const token = data.response.accessToken; // Adjust if the structure is different

        localStorage.setItem("authToken", token); // Store token
        return token;

        // setApiToken(data.response.accessToken);
        // onTokenFetched(data.response.accessToken); // Pass the token to the parent component
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchAuthToken();
  }, [onTokenFetched]);

  return null; // No UI needed
};

export default AuthProvider;

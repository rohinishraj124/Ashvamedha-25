import { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";

// Helper function to decode JWT payload without external libraries
const decodeJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};


// 1. Create the context with a more descriptive default value
export const loginContext = createContext({
  isLoggedIn: false,
  sport: null,
  login: () => {},
  logout: () => {},
});

// 2. Create the provider component
export function LoginContextProvider({ children }) {
  // Correctly initialize useCookies to access and remove cookies
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken", "refreshToken"]);

  // Initialize state from the cookie if it exists
  const [isLoggedIn, setIsLoggedIn] = useState(!!cookies.accessToken);
  const [sport, setSport] = useState(null);

  // Effect to sync state when cookies change (e.g., from another tab)
  useEffect(() => {
    if (cookies.accessToken) {
      const decodedToken = decodeJwt(cookies.accessToken);
      setIsLoggedIn(true);
      if (decodedToken) {
        setSport(decodedToken.sport); // Assuming 'sport' is in the JWT payload
      }
    } else {
      setIsLoggedIn(false);
      setSport(null);
    }
  }, [cookies.accessToken]);


  const loginHandler = (accessToken, refreshToken) => {
    const decodedToken = decodeJwt(accessToken);
    if (decodedToken) {
      setSport(decodedToken.sport); // Set sport from token
    }
    setIsLoggedIn(true);
    
    // Set accessToken cookie (e.g., expires in 1 day)
    setCookie("accessToken", accessToken, {
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
      // sameSite: 'strict', // Recommended for security
      // secure: true,       // Recommended for production (HTTPS)
    });

    // Set refreshToken cookie (e.g., expires in 15 days)
    setCookie("refreshToken", refreshToken, {
      path: "/",
      maxAge: 60 * 60 * 24 * 15, // 15 days
      // sameSite: 'strict',
      // secure: true,
    });
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    setSport(null);
    // Use removeCookie for a cleaner logout process
    removeCookie("accessToken", { path: "/" });
    removeCookie("refreshToken", { path: "/" });
  };

  const context = {
    isLoggedIn,
    sport,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <loginContext.Provider value={context}>
      {children}
    </loginContext.Provider>
  );
}

// 3. Create a custom hook for easy consumption
export const useLogin = () => {
    const context = useContext(loginContext);
    if (context === undefined) {
        throw new Error("useLogin must be used within a LoginContextProvider");
    }
    return context;
};
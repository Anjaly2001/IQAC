import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const useAuth = () => {
  // States to store user role, authentication status, and loading state
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Handles loading state when fetching authentication details

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        // Fetch authentication token and user role from localStorage
        const token = localStorage.getItem('access_token');
        const role = localStorage.getItem('user_role');

        if (token && role) {
          // If valid token and role are found, set authentication to true and set the role
          setUserRole(role);
          setIsAuthenticated(true);
        } else {
          // If no token or role is found, mark as unauthenticated
          setUserRole(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        // In case of any error during the fetch, log out the user and show an error toast
        console.error('Error fetching auth data:', error);
        toast.error('Failed to fetch authentication data. Please log in again.');
      } finally {
        // Mark loading as complete regardless of success or failure
        setIsLoading(false); 
      }
    };

    fetchAuthData();

    // Listen to localStorage changes (e.g., logout from another tab)
    const handleStorageChange = () => {
      fetchAuthData();
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Function to log out the user
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_role');
    setUserRole(null);
    setIsAuthenticated(false);
    window.dispatchEvent(new Event('storage')); // Ensure the logout is reflected across all tabs
  };

  return { userRole, isAuthenticated, isLoading, logout };
};

export default useAuth;

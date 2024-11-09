// src/hooks/useAuthStatus.js
import { useEffect, useState } from 'react';
import { supabase } from './../lib/helper/supabaseClient';

function useAuthStatus() {
    const [user, setUser] = useState(null); // Store user data (id, email, name)
    // const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          setUser({
            id: user.id,
            email: user.email,
            name: '', // We'll populate the name after fetching the profile data
          });

          // Fetch user profile to get the name
          const { data: profileData, error } = await supabase
            .from("profiles")
            .select("name")
            .eq("id", user.id)
            .single();

          if (error) {
            console.error("Error fetching profile:", error.message);
          } else {
            setUser((prevUser) => ({
              ...prevUser,
              name: profileData?.name || "", // Default to empty string if no name
            }));
          }
        }

        // setLoading(false);
      };
  
      checkUser();
    }, []);
  
    return { user, setUser }; // Return the user data and loading state
}
  
export default useAuthStatus;

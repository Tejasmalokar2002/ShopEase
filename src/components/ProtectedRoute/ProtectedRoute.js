import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isTokenValid } from '../../utils/jwt-helper';

const ProtectedRoute = ({children}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const isValid = await isTokenValid(); // Assuming this could be async
      if (!isValid) {
        navigate("/v1/login");
      } else {
        setLoading(false); // If token is valid, stop loading
      }
    };

    checkToken();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // Show loading screen or something while checking
  }

  return (
    <div>
      {children}
    </div>
  );
};

export default ProtectedRoute;

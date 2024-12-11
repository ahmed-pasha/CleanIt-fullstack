import { useContext } from 'react';
// Import the context, not the provider

const useAuth = () => {
  const authContext = useContext(authContext);

  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return authContext;
};

export default useAuth;

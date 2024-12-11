export const isTokenValid = (token) => {
  if (!token) return false; 
  try {
    const payloadBase64 = token.split('.')[1]; 
    const payloadDecoded = JSON.parse(atob(payloadBase64)); 

    const currentTime = Date.now() / 1000; 
    return payloadDecoded.exp > currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return false; 
  }
};

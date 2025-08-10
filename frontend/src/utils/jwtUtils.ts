export interface JwtPayload {
  // Standard JWT fields
  nameid?: string; // User ID
  unique_name?: string; // Username
  email?: string; // Email
  exp?: number; // Expiration time
  iat?: number; // Issued at time
  
  // Alternative fields that might be used
  sub?: string; 
  userId?: string; 
  id?: string; 
  
  // Microsoft Identity claims (long format)
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'?: string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'?: string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'?: string;
}

export const decodeJwtPayload = (token: string): JwtPayload | null => {
  try {
    // JWT has 3 parts separated by dots: header.payload.signature
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.error('Invalid JWT token format');
      return null;
    }

    // Decode the payload (second part)
    const payload = parts[1];
    
    // Add padding if needed (JWT base64 might not be padded)
    const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4);
    
    // Decode base64
    const decodedPayload = atob(paddedPayload);
    
    // Parse JSON
    const parsedPayload: JwtPayload = JSON.parse(decodedPayload);
    
    // Debug: Log the decoded payload to see what's inside
    console.log('Decoded JWT payload:', parsedPayload);
    
    return parsedPayload;
  } catch (error) {
    console.error('Error decoding JWT payload:', error);
    return null;
  }
};

export const getUserIdFromToken = (token: string): number | null => {
  const payload = decodeJwtPayload(token);
  if (payload) {
    // Try multiple possible ID fields including Microsoft's long claim names
    let userIdString = 
      payload.nameid || 
      payload.sub || 
      payload.userId || 
      payload.id ||
      payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    
    if (userIdString) {
      const userId = parseInt(userIdString, 10);
      console.log('Extracted user ID:', userId);
      return isNaN(userId) ? null : userId;
    }
  }
  console.warn('Could not extract user ID from token');
  return null;
};

export const isTokenExpired = (token: string): boolean => {
  const payload = decodeJwtPayload(token);
  if (payload && payload.exp) {
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  }
  return true; // Consider expired if we can't determine
};

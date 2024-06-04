import jwt from 'jsonwebtoken';


export const decodeJWT = (token: string) => {
  const decodedToken = jwt.decode(token);
  return decodedToken;
};



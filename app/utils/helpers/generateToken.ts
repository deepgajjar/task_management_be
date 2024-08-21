import jwt from 'jsonwebtoken';

export const generateToken = (user: any, secret: string, tokenExpiredTime: any) => {
    
  const payloadData = {
    email: user?.email,
    _id: user?._id,
    userName:user?.userName
  };

  const payload = { data: payloadData };
  return jwt.sign(payload, secret, { expiresIn: `${tokenExpiredTime} days` });
};

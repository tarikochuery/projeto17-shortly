import jwt from 'jsonwebtoken';

export const validateToken = (req, res, next) => {
  const token = req.body.token.replace('Bearer ', '');
  jwt.verify(token, proccess.env.SECRET, (err, decoded) => {
    if (err) return res.status(401).send('Invalid Token');

    res.locals.userId = decoded.userId;
  });
};
import bcrypt, { hash } from 'bcrypt';
import auth from '../db/queries/authQueries.js';
import jwt from 'jsonwebtoken';

const authControllers = {
  signup: async (req, res) => {
    const { name, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    try {
      const { success, exists, error } = await auth.userAlreadyExists(email);
      if (!success) {
        console.log(error);
        return res.status(500).send('Deu ruim no DB');
      }
      if (exists) return res.status(409).send('Email already exists.');
      await auth.createUser({ name, email, password: hashPassword });
      return res.sendStatus(201);
    } catch (error) {
      console.log(error);
      res.status(500).send('Deu ruim no servidor');
    }
  },
  signin: async (req, res) => {
    const { email, password } = req.body;
    try {
      const { success, user, error } = await auth.getUserByEmail(email);
      if (!success) {
        console.log(error);
        return res.status(500).send('Deu ruim no DB');
      }
      if (!user) return res.status(401).send('Email or password incorrect');
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);
      if (!isPasswordCorrect) return res.status(401).send('Email or password incorrect');
      const token = jwt.sign({ userId: user.id }, 'SuperSecret', { expiresIn: '60m' });
      return res.send({ token });
    } catch (error) {
      return res.status(500).send('Deu ruim no servidor');
    }
  }
};

export default authControllers;
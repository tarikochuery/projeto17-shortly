import bcrypt, { hash } from 'bcrypt';
import auth from '../db/queries/authQueries.js';

const authControllers = {
  signup: async (req, res) => {
    const { name, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    try {
      const { success, exists, error } = await auth.userAlreadyExists(email);
      if (!success) throw new Error(error);
      if (exists) return res.status(409).send('Email already exists.');
      await auth.createUser({ name, email, password: hashPassword });
      return res.sendStatus(201);
    } catch (error) {
      console.log(error);
      res.status(500).send('Deu ruim no servidor');
    }
  }
};

export default authControllers;
import { db } from '../db.connection.js';

const auth = {
  createUser: async (newUser) => {
    const { name, email, password } = newUser;
    try {
      await db
        .query(
          'INSERT INTO users (name, email, password) values ($1, $2, $3)',
          [name, email, password]
        );
      return { success: true, error: undefined };
    } catch (error) {
      return { success: false, error };
    }
  },
  userAlreadyExists: async (email) => {
    try {
      const { rows: [user] } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      return user ?
        { success: true, exists: true, error: undefined }
        :
        { success: true, exists: false, error: undefined };
    } catch (error) {
      return { success: false, exists: undefined, error };
    }
  }
};

export default auth;
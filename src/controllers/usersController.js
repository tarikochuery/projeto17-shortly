import users from "../db/queries/usersQueries.js";

const usersController = {
  getUser: async (req, res) => {
    const { userId } = res.locals;
    try {
      const { success, user, error } = await users.getById(userId);
      if (!success) {
        console.log(error);
        return res.status(500).send('Deu ruim no DB');
      }
      return res.send(user);
    } catch (error) {
      return res.status(500).send('Deu ruim no servidor!');
    }
  }
};

export default usersController;
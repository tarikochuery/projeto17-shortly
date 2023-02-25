import { nanoid } from "nanoid";
import shortUrl from "../db/queries/urlQueries.js";

const urlController = {
  shorten: async (req, res) => {
    const { url } = req.body;
    const { userId } = res.locals;
    const identifier = nanoid();
    try {
      const { success, id, error } = await shortUrl.create({
        url,
        shortUrl: identifier,
        userId
      });
      if (!success) {
        console.log(error);
        return res.status(500).send('Deu ruim no db.');
      }
      return res.status(201).send({ id, shortUrl: identifier });
    } catch (error) {
      return res.status(500).send('Deu ruim no servidor');
    }
  }
};

export default urlController;
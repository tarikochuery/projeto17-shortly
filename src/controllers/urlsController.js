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
  },
  getShortUrlById: async (req, res) => {
    const { id } = req.params;
    try {
      const { success, url, error } = await shortUrl.getById(id);
      if (!success) {
        console.log(error);
        res.status(500).send('Deu ruim no db');
      }
      if (!url) res.sendStatus(404);
      return res.send(url);
    } catch (error) {
      console.log(error);
      res.status(500).send('Deu ruim no servidor');
    }
  },
  redirectShortUrl: async (req, res) => {
    const identifier = req.params.shortUrl;
    try {
      const { success, url, error } = await shortUrl.getByShortUrl(identifier);
      if (!success) {
        console.log(error);
        return res.status(500).send('Deu ruim no DB');
      }
      if (!url) return res.sendStatus(404);
      const { success: incrementSuccess, error: incrementError } = await shortUrl.incrementVisitsCountById(url.id);
      if (!incrementSuccess) {
        console.log(incrementError);
        return res.status(500).send('Deu ruim no DB! (Incremento)');
      }
      return res.redirect(url.url);
    } catch (error) {
      return res.status(500).send('Deu ruim no servidor!');
    }
  },
  deleteShortUrl: async (req, res) => {
    const { id } = req.params;
    const { userId } = res.locals;
    try {
      const { success, url, error } = await shortUrl.getById(id);
      if (!success) {
        console.log(error);
        return res.status(500).send('Deu ruim no DB!');
      }
      if (!url) return res.sendStatus(404);
      console.log(url);
      if (url.userId !== userId) return res.sendStatus(401);
      const { success: deleteSuccess, error: deleteError } = await shortUrl.delete(id);
      if (!deleteSuccess) {
        console.log(deleteError);
        return res.status(500).send('Deu ruim no DB');
      }
      return res.sendStatus(204);
    } catch (error) {

    }
  }
};

export default urlController;
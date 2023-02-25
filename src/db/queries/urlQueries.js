import { db } from "../db.connection.js";

const shortUrl = {
  create: async ({ url, shortUrl, userId }) => {
    try {
      const { rows: [{ id }] } = await db
        .query(
          'INSERT INTO "shorturls" ("shortUrl", url, "userId") values ($1, $2, $3) RETURNING id',
          [shortUrl, url, userId]
        );
      return { success: true, id, error: undefined };
    } catch (error) {
      return { success: false, id: undefined, error };
    }
  },
  getById: async (id) => {
    try {
      const { rows: [url] } = await db.query('SELECT id, "shortUrl", url FROM shorturls WHERE id = $1', [id]);
      return { success: true, url, error: undefined };
    } catch (error) {
      return { success: false, url: undefined, error };
    }
  }
};

export default shortUrl;
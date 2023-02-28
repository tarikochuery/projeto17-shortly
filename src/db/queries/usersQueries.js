import { db } from "../db.connection.js";

const users = {
  getById: async (id) => {
    try {
      const { rows: [userInfo] } = await db
        .query(
          `
          SELECT users.id, users.name, SUM("visitsCount") AS "totalVisits"
          FROM users
          JOIN shorturls
            ON shorturls."userId" = users.id
          WHERE users.id = $1
          GROUP BY users.id
          `,
          [id]
        );
      const { rows: shortenedUrls } = await db
        .query(
          `
        SELECT id, "shortUrl", url, "visitsCount" AS "visitCount" 
        FROM shorturls
        WHERE "userId" = $1
        ORDER BY id ASC
        `,
          [id]
        );
      return { success: true, user: { ...userInfo, shortenedUrls }, error: undefined };
    } catch (error) {
      return { success: false, user: undefined, error };
    }
  }
};

export default users;
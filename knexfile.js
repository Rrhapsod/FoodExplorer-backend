import { resolve } from "path";
import * as url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export const development = {
  client: "sqlite3",
  connection: {
    filename: resolve(__dirname, "src", "database", "database.db"),
  },
  pool: {
    afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb),
  },
  migrations: {
    directory: resolve(__dirname, "src", "database", "knex", "migrations"),
  },
  useNullAsDefault: true,
};

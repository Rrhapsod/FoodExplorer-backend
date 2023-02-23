import { resolve } from "path";
import multer from "multer";
import * as url from "url";

const { randomBytes } = await import("node:crypto");

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const TMP_FOLDER = resolve(__dirname, "..", "..", "tmp");
const UPLOADS_FOLDER = resolve(TMP_FOLDER, "uploads");

const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(request, file, callback) {
      const fileHash = randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};

export { TMP_FOLDER, UPLOADS_FOLDER, MULTER };

import { promises } from "node:fs";
import { resolve } from "path";

import { UPLOADS_FOLDER, TMP_FOLDER } from "../configs/upload.js";

export class DiskStorage {
  async saveFile(file) {
    await promises.rename(
      resolve(TMP_FOLDER, file),
      resolve(UPLOADS_FOLDER, file)
    );

    return file;
  }

  async deleteFile(file) {
    const filePath = resolve(UPLOADS_FOLDER, file);

    try {
      await promises.stat(filePath);
    } catch {
      return;
    }

    await promises.unlink(filePath);
  }
}

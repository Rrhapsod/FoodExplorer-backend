import knex from "../database/knex/index.js";
import { DiskStorage } from "../providers/DiskStorage.js";
import { Error } from "../utils/Error.js";

export class DishImageController {
  async update(request, response) {
    const { id } = request.params;
    const imageFilename = request.file.filename;

    const diskStorage = new DiskStorage();

    const dish = await knex("dishes").where({ id }).first();

    if (!dish) {
      throw new Error("Prato não encontrado!", 401);
    }

    if (dish.image) {
      await diskStorage.deleteFile(user.image);
    }

    const filename = await diskStorage.saveFile(imageFilename);
    dish.image = filename;

    await knex("dishes").update(dish).where({ id });

    return response.json(dish);
  }
}

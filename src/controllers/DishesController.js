import knex from "../database/knex/index.js";

export class DishesController {
  async create(request, response) {
    const { name, category, description, price, ingredients } = request.body;

    const dish_id = await knex("dishes").insert({
      name,
      category,
      description,
      price,
    });

    const ingredientsInsert = ingredients.map((name) => {
      return {
        dish_id,
        name,
      };
    });

    await knex("ingredients").insert(ingredientsInsert);

    return response.status(201).json();
  }

  async show(request, response) {
    const { id } = request.params;

    const dish = await knex("dishes").where({ id }).first();
    const ingredients = await knex("ingredients")
      .where({ dish_id: id })
      .orderBy("name");

    return response.json({
      ...dish,
      ingredients,
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("dishes").where({ id }).delete();

    return response.status(201).json();
  }

  async index(request, response) {
    const { category } = request.query;

    const dish = await knex("dishes").where({ category }).orderBy("name");

    return response.json({ dish });
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, category, description, price, ingredients } = request.body;

    const dish = await knex("dishes").where({ id }).first();
    if (!dish) {
      throw new Error("Prato não encontrado!");
    }

    const dishWithUpdatedName = await knex("dishes").where({ name }).first();
    if (dishWithUpdatedName && dishWithUpdatedName.id !== dish.id) {
      throw new Error("Prato já cadastrado!");
    }

    await knex("dishes")
      .update({
        name,
        category,
        description,
        price,
        updated_at: knex.fn.now(),
      })
      .where({ id });

    await knex("ingredients").where({ dish_id: id }).delete();

    const ingredientsInsert = ingredients.map((name) => {
      return {
        dish_id: id,
        name,
      };
    });

    await knex("ingredients").insert(ingredientsInsert);

    return response.status(201).json();
  }
}

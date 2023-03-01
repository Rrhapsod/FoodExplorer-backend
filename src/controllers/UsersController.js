import bcryptjs from "bcryptjs";

import knex from "../database/knex/index.js";
import { Error } from "../utils/Error.js";

const { hash, compare } = bcryptjs;

export class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const userExists = await knex("users").where({ email }).first();

    if (userExists) {
      throw new Error("E-mail já cadastrado!");
    }

    const hashedPassword = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
    });

    return response.status(201).json();
  }
}

import { development } from "../../../knexfile.js";
import knex from "knex";

const connection = knex(development);

export default connection;

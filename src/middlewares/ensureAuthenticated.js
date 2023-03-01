import jwt from "jsonwebtoken";

import { Error } from "../utils/Error.js";
import * as authConfig from "../configs/auth.js";

const { verify } = jwt;

export function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("JWT Token não informado", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret);

    request.user = {
      id: Number(user_id),
    };

    return next();
  } catch {
    throw new Error("JWT Token inválido", 401);
  }
}

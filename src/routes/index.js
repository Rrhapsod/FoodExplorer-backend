import { Router } from "express";

import { usersRoutes } from "../routes/users.routes.js";
import { sessionsRoutes } from "../routes/sessions.routes.js";
import { dishesRoutes } from "../routes/dishes.routes.js";

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/dishes", dishesRoutes);

export { routes };

import { Router } from "express";
import multer from "multer";

import { MULTER } from "../configs/upload.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

import { DishesController } from "../controllers/DishesController.js";
import { DishImageController } from "../controllers/DishImageController.js";

const dishesRoutes = Router();

const upload = multer(MULTER);

const dishesController = new DishesController();
const dishImageController = new DishImageController();

dishesRoutes.post("/", ensureAuthenticated, dishesController.create);
dishesRoutes.get("/:id", ensureAuthenticated, dishesController.show);
dishesRoutes.delete("/:id", ensureAuthenticated, dishesController.delete);
dishesRoutes.get("/", ensureAuthenticated, dishesController.index);
dishesRoutes.put("/:id", ensureAuthenticated, dishesController.update);
dishesRoutes.patch(
  "/:id/image",
  ensureAuthenticated,
  upload.single("image"),
  dishImageController.update
);

export { dishesRoutes };

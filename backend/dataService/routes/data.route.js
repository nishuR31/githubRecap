import express from "express";
import dataPing from "../controllers/dataPing.controller.js";
import searchRepositories from "../controllers/searchRepositories.controller.js";
import getUserData from "../controllers/getUserData.controller.js";
import getUserRepositories from "../controllers/getUserRepositories.controller.js";
import fetchByYear from "../controllers/fetchByYear.controller.js";
import adminRefresh from "../controllers/adminRefresh.controller.js";
import adminPurge from "../controllers/adminPurge.controller.js";
import adminDeleteYear from "../controllers/adminDeleteYear.controller.js";
import dataAuth from "../middleware/dataAuth.js";
import { multerInstance } from "../../sharedService/upload/multer.js";

const dataRouter = express.Router();

dataRouter.get("/ping", dataPing);

dataRouter.get("/search", searchRepositories);

dataRouter.get("/user/:username", getUserData);

dataRouter.get("/user/:username/repos", getUserRepositories);

// Recap data
dataRouter.get("/fetch/:year", fetchByYear);

// Admin data operations
dataRouter.post(
  "/admin/refresh",
  dataAuth,
  multerInstance.single("image"),
  adminRefresh,
);
dataRouter.post("/admin/purge", dataAuth, adminPurge);
dataRouter.post("/admin/delete", dataAuth, adminDeleteYear);

export default dataRouter;

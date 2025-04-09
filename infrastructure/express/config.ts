import router from "./routes/routes";
import { Application } from "express-serve-static-core";
import express from "express";

export default function configExpress(app: Application) {
  app.use(express.json());
  app.use(router);
}

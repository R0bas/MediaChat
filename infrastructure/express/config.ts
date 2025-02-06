import express from "express";
import router from "./routes/routes";
import { Application } from "express-serve-static-core";

export default function configExpress(app: Application) {
    app.use(express.json());
    app.use(router);
}
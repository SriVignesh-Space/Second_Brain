import express from "express";
import { deleteContent, getAllContent, postContent } from "../controller/contentController.js";

const contentRouter = express.Router()

contentRouter.get("/", getAllContent)

contentRouter.post("/", postContent)

contentRouter.delete("/:id", deleteContent)

export default contentRouter
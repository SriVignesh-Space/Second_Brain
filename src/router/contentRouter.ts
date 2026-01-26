import express from "express";
import { deleteContent, getAllContent, postContent, updateContent } from "../controller/contentController.js";

const contentRouter = express.Router()

contentRouter.get("/", getAllContent)

contentRouter.post("/", postContent)

contentRouter.put("/:id", updateContent)

contentRouter.delete("/:id", deleteContent)

export default contentRouter
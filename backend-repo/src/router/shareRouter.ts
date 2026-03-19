import express from 'express'
import { getContent, getSharedContents, shareContent, stopShareContent } from '../controller/shareController.js';
const shareRouter = express.Router();

shareRouter.get("/share", getSharedContents)

shareRouter.post("/share", shareContent)

shareRouter.get("/:sharelink", getContent)

shareRouter.delete("/share", stopShareContent)

export default shareRouter
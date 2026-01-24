import express from 'express'
import { getContent, getSharedContents, shareContent } from '../controller/shareController.js';
const shareRouter = express.Router();

shareRouter.get("/share", getSharedContents)

shareRouter.post("/share", shareContent)

shareRouter.get("/:sharelink", getContent)

export default shareRouter
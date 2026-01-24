import mongoose from "mongoose";
import { ContentModel, type contentDBType } from "../model/ContentModel.js";

async function getContentByID(contentIds: string[]): Promise<contentDBType[]> {
  const objectIds = contentIds.map((id) => new mongoose.Types.ObjectId(id));

  const content = await ContentModel.find({
    _id: { $in: objectIds },
  });

  return content;
}

export default getContentByID;
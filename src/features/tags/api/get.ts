import { tagApiProvider } from "../constants";
import { TagsParams } from "../types";

export const getTagsClient = (params: TagsParams) => tagApiProvider.getTagsClient(params);

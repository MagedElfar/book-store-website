import { tagApiProvider } from "../constants/api";
import { TagsParams } from "../types/request";

export const getTagsClient = (params: TagsParams) => tagApiProvider.getTagsClient(params);

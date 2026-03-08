import type { GetManyResponse } from "@/shared/types";

import type { TagsParams } from "./request";
import type { Tag } from "./tag";


export interface TagApiProvider {
    getTagsClient: (params: TagsParams) => Promise<GetManyResponse<Tag>>;
}
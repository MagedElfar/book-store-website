import { bookApiProvider } from "../constants/api"
import { BookParams } from "../types/request"

export const getBooBySlugApi = (slug: string) => bookApiProvider.getBookBySlug(slug)

export const getBooKsApi = (params: BookParams) => bookApiProvider.getBooks(params)


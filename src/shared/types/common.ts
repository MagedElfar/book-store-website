export type DialogState<T> =
    | { type: "create" }
    | { type: "edit"; data: T }
    | { type: "delete"; data: T }
    | { type: "view"; data: T }
    | { type: null };

export type SupportedLang = "ar" | "en"



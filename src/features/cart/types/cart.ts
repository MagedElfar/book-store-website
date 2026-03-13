import { Book } from "@/features/books/types/book";

export interface CartItem {
    bookId: string;
    book: Book;
    quantity: number;
}
// app/[locale]/books/layout.tsx
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { prefetchInfiniteCategory } from "@/features/categories";
import { prefetchInfiniteAuthors } from "@/features/authors";
import { prefetchInfiniteTags } from "@/features/tags";

export default async function BooksLayout({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient();

    await Promise.all([
        prefetchInfiniteCategory(queryClient),
        prefetchInfiniteAuthors(queryClient),
        prefetchInfiniteTags(queryClient)
    ])

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {children}
        </HydrationBoundary>
    );
}
// app/[locale]/books/layout.tsx
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { prefetchInfiniteAuthors } from "@/features/authors";
import { prefetchInfiniteCategory } from "@/features/categories";
import { prefetchInfiniteTags } from "@/features/tags";
import { GlobalLoadingProvider } from "@/providers/GlobalLoaderProvider";

export default async function BooksLayout({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient();

    await Promise.all([
        prefetchInfiniteCategory(queryClient),
        prefetchInfiniteAuthors(queryClient),
        prefetchInfiniteTags(queryClient)
    ])

    return (
        <GlobalLoadingProvider>
            <HydrationBoundary state={dehydrate(queryClient)}>
                {children}
            </HydrationBoundary>
        </GlobalLoadingProvider>
    );
}
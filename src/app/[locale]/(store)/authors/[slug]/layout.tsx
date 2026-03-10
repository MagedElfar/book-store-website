// app/[locale]/books/layout.tsx
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { prefetchInfiniteCategory } from "@/features/categories";
import { prefetchInfiniteTags } from "@/features/tags";

interface Props {
    children: React.ReactNode
}

export default async function AuthorLayout({ children }: Props) {
    const queryClient = new QueryClient();

    await Promise.all([
        prefetchInfiniteCategory(queryClient),
        prefetchInfiniteTags(queryClient)
    ])

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {children}
        </HydrationBoundary>
    );
}
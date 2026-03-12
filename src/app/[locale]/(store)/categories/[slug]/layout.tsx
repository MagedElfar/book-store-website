// app/[locale]/books/layout.tsx
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { prefetchInfiniteAuthors } from "@/features/authors/lib/react-query";
import { prefetchInfiniteTags } from "@/features/tags/lib/react-query";


interface Props {
    children: React.ReactNode
}

export default async function CategoryLayout({ children }: Props) {
    const queryClient = new QueryClient();

    await Promise.all([
        prefetchInfiniteAuthors(queryClient),
        prefetchInfiniteTags(queryClient)
    ])

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {children}
        </HydrationBoundary>
    );
}
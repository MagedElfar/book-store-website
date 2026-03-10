// app/[locale]/books/layout.tsx
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { prefetchInfiniteAuthors } from "@/features/authors";
import { prefetchInfiniteTags } from "@/features/tags";
import { GlobalLoadingProvider } from "@/providers/GlobalLoaderProvider";

interface Props {
    params: Promise<{ slug?: string }>
    children: React.ReactNode
}

export default async function CategoriesLayout({ children, params }: Props) {
    const queryClient = new QueryClient();
    const { slug } = await params

    if (slug) {
        await Promise.all([
            prefetchInfiniteAuthors(queryClient),
            prefetchInfiniteTags(queryClient)
        ])
    }

    return (
        <GlobalLoadingProvider>
            <HydrationBoundary state={dehydrate(queryClient)}>
                {children}
            </HydrationBoundary>
        </GlobalLoadingProvider>
    );
}
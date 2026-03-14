import { PageLayout } from "@/shared/components/layout/PageLayout";
import { BookListSectionSkeleton } from "@/shared/components/loading/BookListSectionSkeleton";
import { SectionHeaderSkeleton } from "@/shared/components/loading/SectionHeaderSkeleton";

export default function LoadingBooksPage() {
    return (
        <PageLayout>

            <SectionHeaderSkeleton withActions />

            <BookListSectionSkeleton />
        </PageLayout>
    );
}
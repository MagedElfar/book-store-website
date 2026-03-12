import { AuthorCard } from "@/features/authors/components/AuthorCard";
import { Author } from "@/features/authors/types/author";
import { SectionTitle } from "@/shared/components/ui/SectionTitle";

interface AuthorsProps {
    authors: Author[];
    title: string;
}

export const AuthorsSection = ({ authors, title }: AuthorsProps) => {
    return (
        <section className="main-sec-space bg-white dark:bg-[#09090b] overflow-hidden">
            <div className="container mx-auto px-4">
                <SectionTitle title={title} />
                <div className="relative group">
                    <div className="w-full flex justify-start lg:justify-center overflow-x-auto no-scrollbar pb-8 pt-4 
                                    [mask-image:_linear-gradient(to_right,transparent_0,_black_10%,_black_90%,transparent_100%)] 
                                    lg:[mask-image:none]">

                        <div className="flex flex-nowrap lg:flex-wrap items-start justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 px-10 lg:px-0">
                            {authors.map((author) => (
                                <div
                                    key={author.id}
                                    className="shrink-0 w-[90px] sm:w-[110px] md:w-[130px] lg:w-[150px] transition-all duration-300 hover:z-10"
                                >
                                    <AuthorCard author={author} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:hidden absolute left-0 top-1/2 -translate-y-1/2 w-4 h-20 bg-gradient-to-r from-white/80 dark:from-[#09090b]/80 to-transparent pointer-events-none" />
                    <div className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2 w-4 h-20 bg-gradient-to-l from-white/80 dark:from-[#09090b]/80 to-transparent pointer-events-none" />
                </div>
            </div>
        </section>
    );
};
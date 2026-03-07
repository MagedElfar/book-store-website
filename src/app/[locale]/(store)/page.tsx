import { getAuthors } from "@/features/authors";
import { getBannersApi } from "@/features/banners";
import { getBooKsApi } from "@/features/books";
import { getCategories } from "@/features/categories";
import { BookSliderSection, HeroSection, FeaturedCategoriesSection, SpecialPromoSection, AuthorsSection } from "@/features/home/sections";
import { getAppTranslation } from "@/shared/lib";
import Image from "next/image";

// export const dynamic = "force-static"
export const revalidate = 3600

export default async function Home() {
  const { t: tHome } = await getAppTranslation("home")

  const [
    banners,
    bestSellingBooks,
    offersBooks,
    newBooks,
    featuredCategories,
    authors
  ] = await Promise.all([
    getBannersApi(),
    getBooKsApi({ sortBy: "sales_count", limit: 10 }),
    getBooKsApi({ isOffers: true, limit: 10 }),
    getBooKsApi({ sortBy: "newest", limit: 10 }),
    getCategories({ is_featured: true, limit: 8 }),
    getAuthors({ sortBy: "most_books", limit: 8 })

  ])

  return <>
    <HeroSection banners={banners.items} />
    <FeaturedCategoriesSection
      categories={featuredCategories.items}
      title={tHome("sections.featuredCategories")}
    />
    <BookSliderSection title={tHome("sections.bestSelling")} books={bestSellingBooks.items} />
    <SpecialPromoSection />
    <BookSliderSection title={tHome("sections.offers")} books={offersBooks.items} />
    <AuthorsSection authors={authors.items} title={tHome("sections.authors")} />
    <BookSliderSection title={tHome("sections.newArrivals")} books={newBooks.items} />
  </>;
}

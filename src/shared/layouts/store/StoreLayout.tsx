
import { Category } from "@/features/categories/types/category";

import { Footer } from "./sections/Footer";
import { MobileMenu } from "./sections/MobileMenu";
import { StoreHeader } from "./sections/StoreHeader";

interface StoreLayoutProps {
    children: React.ReactNode
    navCategories: Category[]
}

export function StoreLayout({ children, navCategories }: StoreLayoutProps) {
    return (
        <div className="relative flex min-h-screen flex-col">
            <StoreHeader navCategories={navCategories} />
            <main className="flex-1">
                {children}
            </main>
            <MobileMenu categories={navCategories} />
            <Footer />
        </div>
    );
}
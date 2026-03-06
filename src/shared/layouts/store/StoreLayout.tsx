import { Category } from "@/features/categories";
import { MobileMenu, StoreHeader } from "./sections";

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
        </div>
    );
}
import { Category } from "@/features/categories";
import { cn } from "@/lib/utils";

import { NavItems } from "./NavItems";

interface Props {
    navCategories: Category[]
}

export const BottomBar = ({ navCategories }: Props) => {

    return (
        <div className={cn(
            "h-12 border-b shadow-sm sticky top-20 z-40 overflow-x-auto no-scrollbar hidden md:block transition-colors",
            "bg-orange-500 border-orange-600",
            "dark:bg-zinc-900 dark:border-orange-900/50 backdrop-blur-md"
        )}>
            <div className="container mx-auto h-full flex justify-center items-center px-4">
                <NavItems categories={navCategories} />
            </div>
        </div>
    );
};
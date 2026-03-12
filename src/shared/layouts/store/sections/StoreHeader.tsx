import { Category } from "@/features/categories/types/category";

import { BottomBar } from "./BottomBar";
import { TopBar } from "./TopBar";

interface Props {
    navCategories: Category[]
}

export const StoreHeader = ({ navCategories }: Props) => {
    return (
        <header className="sticky top-0 z-50 w-full">
            <TopBar />
            <BottomBar navCategories={navCategories} />
        </header>
    );
};
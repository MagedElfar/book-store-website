import { Category } from "@/features/categories";
import { TopBar } from "./TopBar";
import { BottomBar } from "./BottomBar";

interface Props {
    navCategories: Category[]
}

export const StoreHeader = ({ navCategories }: Props) => {
    return (
        <header className="sticky top-0 z-50 w-full">
            <TopBar navCategories={navCategories} />
            <BottomBar navCategories={navCategories} />
        </header>
    );
};
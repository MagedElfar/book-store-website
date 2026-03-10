import { LangSwitcher, ThemeToggle } from "@/shared/components";

import { Logo } from "../../common";
import { CartIcon, SearchBar, UserAccountBox } from "../components";
import { MobileMenuButton } from "../components/MobileMenuButton";



export const TopBar = () => {
    return (
        <div className="h-16 md:h-20 border-b sticky top-0 z-50 bg-slate-50/95 dark:bg-zinc-950/95 backdrop-blur-md shadow-sm flex items-center">
            <div className="container mx-auto px-4 flex items-center justify-between gap-4">

                <div className="flex items-center gap-2">
                    <Logo />
                </div>

                {/* 2. Middle Section: Search (Desktop Only) */}
                <div className="hidden md:flex flex-1 max-w-2xl">
                    <SearchBar />
                </div>

                {/* 3. Right Section: Desktop Settings & All-device Actions */}
                <div className="flex items-center gap-2 md:gap-4">
                    <div className="hidden md:flex items-center gap-1 border-e pe-3 me-1 dark:border-zinc-800">
                        <LangSwitcher />
                        <ThemeToggle />
                    </div>

                    <div className="flex items-center gap-2 md:gap-3">
                        <CartIcon />
                        <UserAccountBox />
                    </div>

                    <MobileMenuButton />
                </div>

            </div>
        </div>
    );
};
"use client"

import { useMobileMenu } from "@/store/use-mobile-menu";
import { Menu } from "lucide-react";

export function MobileMenuButton() {
    const openMenu = useMobileMenu((state) => state.open);

    return (
        <button
            onClick={openMenu}
            className="md:hidden p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
            aria-label="Open Menu"
        >
            <Menu size={24} />
        </button>

    )
}

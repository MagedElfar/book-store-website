import { LangSwitcher, ThemeToggle } from "@/shared/components";

interface Props {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
    return (
        <main className="min-h-screen w-full bg-white dark:bg-zinc-950 grid grid-rows-[auto_1fr] transition-colors duration-300">
            {/* Header: Language & Mode Switches */}
            <header className="w-full p-4 flex justify-end items-center gap-2">
                <LangSwitcher />
                <ThemeToggle />
            </header>

            <section className="flex items-center justify-center p-6">
                <div className="w-full max-w-[420px] space-y-8 animate-in fade-in zoom-in duration-500">
                    {children}
                </div>
            </section>
        </main>
    );
}
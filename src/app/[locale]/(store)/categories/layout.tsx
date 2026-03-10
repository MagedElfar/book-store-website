// app/[locale]/books/layout.tsx

import { GlobalLoadingProvider } from "@/providers/GlobalLoaderProvider";

interface Props {
    children: React.ReactNode
}

export default async function CategoriesLayout({ children }: Props) {


    return (
        <GlobalLoadingProvider>
            {children}
        </GlobalLoadingProvider>
    );
}
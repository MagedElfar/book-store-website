// app/[locale]/books/layout.tsx

import { GlobalLoadingProvider } from "@/providers/GlobalLoaderProvider";

interface Props {
    children: React.ReactNode
}

export default async function AuthorLayout({ children }: Props) {


    return (
        <GlobalLoadingProvider>
            {children}
        </GlobalLoadingProvider>
    );
}
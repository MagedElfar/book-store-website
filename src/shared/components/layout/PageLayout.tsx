import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

export function PageLayout({ children }: Props) {
    return (
        <div className="min-h-screen">
            <div className="container mx-auto main-sec-space px-4">
                {children}
            </div>
        </div>
    )
}

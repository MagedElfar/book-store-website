import React, { ReactNode } from 'react'

interface Props {
    title: string
    description?: string
    children?: ReactNode
}

export function SectionHeader({ title, description, children }: Props) {
    return <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                {title}
            </h1>
            {description && <p className="text-slate-500 dark:text-zinc-400 max-w-md">
                {description}
            </p>}
        </div>
        {children}
    </header>


}

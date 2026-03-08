import React from 'react'

interface Props {
    title: string
    description?: string
}

export function SectionHeader({ title, description }: Props) {
    return <div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {title}
        </h1>
        {description && <p className="text-slate-500 dark:text-zinc-400 max-w-md">
            {description}
        </p>}
    </div>
}

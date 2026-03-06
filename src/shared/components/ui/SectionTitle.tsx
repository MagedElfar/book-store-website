import React from 'react'

interface Props {
    title: string
}

export function SectionTitle({ title }: Props) {
    return <div className="flex items-center gap-3 mb-10">
        <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-zinc-50 tracking-tight uppercase italic">
            {title}
        </h2>
    </div>
}

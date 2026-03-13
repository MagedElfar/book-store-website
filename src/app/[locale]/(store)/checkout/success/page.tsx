import React from 'react'

import { SuccessRedirect } from '@/shared/components/feedback/SuccessRedirect'
import { PageLayout } from '@/shared/components/layout/PageLayout'
import { paths } from '@/shared/config/paths'
import { getAppTranslation } from '@/shared/lib/getTranslations'

interface Props {
    searchParams: Promise<Record<string, string>>
}

export default async function Page({ searchParams }: Props) {
    const { orderId } = await searchParams
    const { t } = await getAppTranslation("order")
    return (
        <PageLayout>
            <SuccessRedirect
                title={t("feedback.successOrder")}
                content={t("feedback.succesOrderContent", { id: orderId })}
                btnText={t("actions.countioShopping")}
                redirectPath={paths.books.root}
            />
        </PageLayout>
    )
}

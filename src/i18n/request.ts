import { getRequestConfig } from 'next-intl/server';

import { messagesData } from './messages';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    if (!locale || !routing.locales.includes(locale as any)) {
        locale = routing.defaultLocale;
    }

    return {
        locale: locale as (typeof routing.locales)[number],
        messages: messagesData[locale as keyof typeof messagesData],
        timeZone: 'Africa/Cairo'
    };
});
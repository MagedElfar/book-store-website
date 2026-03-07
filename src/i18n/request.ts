import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { messagesData } from './messages';

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
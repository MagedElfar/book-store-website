import { getRequestConfig } from 'next-intl/server';

import { messagesData } from './messages';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
    // 1. استلم الـ locale من الـ URL (ده اللي بيخليه Static)
    let locale = await requestLocale;

    // 2. تأكد إنه لغة مدعومة، ولو مش موجود استخدم الـ Default
    if (!locale || !routing.locales.includes(locale as any)) {
        locale = routing.defaultLocale;
    }

    return {
        // السطر ده هو "كلمة السر" عشان الـ Build ميفشلش
        locale: locale as "en" | "ar",
        messages: messagesData[locale as keyof typeof messagesData],
        timeZone: 'Africa/Cairo',
    };
});
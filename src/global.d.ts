import { messagesData } from '@/i18n/messages';
import { routing } from '@/i18n/routing';

type Messages = typeof messagesData.en;

declare module 'next-intl' {
    interface AppConfig {
        Locale: (typeof routing.locales)[number];
        Messages: Messages;
    }
}

declare global {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface IntlMessages extends Messages { }
}

export { };
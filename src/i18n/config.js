import i18next from 'i18next';

i18next.init({
    fallbackLng: 'en',
    resources: {
        en: {
            global: require('../locales/en/global.json')
        },
        es: {
            global: require('../locales/es/global.json')
        },
    },
    ns: ['global'],
    defaultNS: 'global',
    returnObjects: true,
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
        escapeValue: false,
    },
    react: {
        wait: true,
    },
});

i18next.languages = ['en','es'];

export default i18next;
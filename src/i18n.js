import { register, init, getLocaleFromNavigator } from 'svelte-i18n'

register('int-en', () => import('../locales/int-en.json'));

register('eu-ru', () => import('../locales/eu-ru.json'));
register('eu-ua', () => import('../locales/eu-ua.json'));

init({
  fallbackLocale: 'int-en',
  initialLocale: getLocaleFromNavigator(),
});
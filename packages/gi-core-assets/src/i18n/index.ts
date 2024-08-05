import locale from '@aligov/global-locale';
import stringFormat from '@aligov/global-string-format';
import type { Description, FormatOptions, StringData, Variable } from '@aligov/global-string-format/lib/string-format';

let intl;
const resources: StringData = {};

/**
 * Load locale resources. Note that resources will be merged with existing resources.
 * @param strings - locale resources
 */
function loadResources(strings: StringData) {
  Object.entries(strings).forEach(([key, value]) => {
    if (!resources[key]) {
      resources[key] = {};
    }
    Object.assign(resources[key], value);
  });
  update();
}

/**
 * Update instance of intl universal
 */
function update() {
  const language = locale.getLocale().lang;
  stringFormat.init(language, resources);
}

/**
 * Change current language
 * @param langTag - language tag
 */
function changeLanguage(langTag: string) {
  locale.setLang(langTag);
  update();
}

/**
 * Format string by key
 * For example:
 * $i18n.t('jsx.home.title'),
 * $i18n.t({
 *    id: 'jsx.home.hello',
 *    defaultMessage: 'Hello {name}' // not required
 * },{
 *  name: 'Alice'
 * })
 * More syntax: https://formatjs.io/guides/message-syntax/
 * @param id - key of message or Description object
 * @param variable - variables to replace in message
 * @param options - options for format
 * @returns format message
 */
function t(id: string | Description, variable: Variable = {}, options?: FormatOptions) {
  if (!intl) update();
  const des = typeof id === 'string' ? { id } : id;
  return stringFormat.format(des, variable, options);
}

const $i18n = { loadResources, changeLanguage, t, language: locale.getLocale().lang };

export default $i18n;

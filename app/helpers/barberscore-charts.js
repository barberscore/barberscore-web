import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';

export function barberscoreSupport() {
  return htmlSafe(`<a href='mailto:charts@barberscore.com'>charts@barberscore.com</a>`)
}

export default helper(barberscoreSupport);

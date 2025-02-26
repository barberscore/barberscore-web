import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';

export function barberscoreSupport() {
  return htmlSafe(`<a href='mailto:charts@barberscore.com'>charts@barberscore.com</a>`)
}

export default helper(barberscoreSupport);

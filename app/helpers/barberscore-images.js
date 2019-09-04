import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';

export function customerService() {
  return htmlSafe(`<a href='mailto:images@barbershop.org'>images@barbershop.org</a>`)
}

export default helper(customerService);

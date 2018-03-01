import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';

export function customerService() {
  return htmlSafe(`<a href='https://members.barbershop.org'>Member Center</a>`)
}

export default helper(customerService);

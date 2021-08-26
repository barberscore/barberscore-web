import { helper } from '@ember/component/helper';

export function isBsAdmin(params) {
  if (params[0].includes('BS Admin') || params[0].includes('CA')) {
    return true;
  }
  return false;
}

export default helper(isBsAdmin);

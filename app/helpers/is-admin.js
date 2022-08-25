import { helper } from '@ember/component/helper';

export function isBsAdmin(params) {
  if (params[0].includes('BS Admin') || params[0].includes('CA') || params[0].includes('PC') || params[0].includes('ADM')) {
    return true;
  }
  return false;
}

export default helper(isBsAdmin);

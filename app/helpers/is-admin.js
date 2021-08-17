import { helper } from '@ember/component/helper';

export function isBsAdmin(params) {
  if (params[0].includes('BS Admin')) {
    return true;
  }
  return false;
}

export default helper(isBsAdmin);

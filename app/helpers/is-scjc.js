import { helper } from '@ember/component/helper';

export function isScjc(params) {
  if (params[0].includes('BS Admin')) {
    return true;
  }
  return false;
}

export default helper(isScjc);

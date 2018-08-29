import { helper } from '@ember/component/helper';

export function oneIndexed(params) {
  if (params[0]) {
    return params[0] + 1;
  }
}

export default helper(oneIndexed);

import { helper } from '@ember/component/helper';

export function capitalizeWord(params) {
  if (params[0]) {
    return String(params[0][0]).toUpperCase() + String(params[0]).slice(1);
  }
}

export default helper(capitalizeWord);

import { helper } from '@ember/component/helper';

export function capitalizeWord(params) {
  if (params[0]) {
    return params[0].capitalize();
  }
}

export default helper(capitalizeWord);

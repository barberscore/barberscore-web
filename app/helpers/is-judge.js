import { helper } from '@ember/component/helper';

export function isJudge(params) {
  if ((params[0].length > '1' || !params[0].includes('Manager')) && !params[0].includes('BS Admin') && !params[0].includes('CA') && !params[0].includes('PC') && !params[0].includes('ADM')) {
    return true;
  }
  return false;
}

export default helper(isJudge);

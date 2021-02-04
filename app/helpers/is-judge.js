import { helper } from '@ember/component/helper';

export function isJudge(params) {
  if (params[0].length > '1' || !params[0].includes('Manager')) {
    return true;
  }
  return false;
}

export default helper(isJudge);

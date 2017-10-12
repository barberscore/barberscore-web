import { helper } from '@ember/component/helper';

export function yesNo(params) {
  let value = params[0];
  let out = '';
  if (value !== undefined) {
    if (value) {
      out = 'Yes';
    } else {
      out = 'No';
    }
  } else {
    out = '';
  }

  return out;
}

export default helper(yesNo);

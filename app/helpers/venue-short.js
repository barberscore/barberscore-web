import { helper } from '@ember/component/helper';

export function venueShort(params) {
  if (params[0].get('city')) {
    return params[0].get('city') + ', ' + params[0].get('state');
  } else {
    return "";
  }
}

export default helper(venueShort);

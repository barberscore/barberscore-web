import { helper } from '@ember/component/helper';

export function fooBar(params) {
  if (params[0]) {
    let penaltyMap = {
      10: 'Primarily Patriotic/Religious Intent',
      30: 'Instrumental Accompaniment',
      40: 'Chorus Exceeding 4-Part Texture',
      50: 'Sound Equipment or Electronic Enhancement',
    }
    return penaltyMap[params[0]];
  }
}

export default helper(fooBar);

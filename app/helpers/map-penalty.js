import { helper } from '@ember/component/helper';

export function fooBar(params) {
  if (params[0]) {
    let penaltyMap = {
      30: 'Repeating Substantial Portions of a Song',
      32: 'Instrumental Accompaniment',
      34: 'Chorus Exceeding 4-Part Texture',
      36: 'Excessive Melody Not in Inner Part',
      38: 'Lack of Characteristic Chord Progression',
      39: 'Excessive Lyrics < 4 parts',
      40: 'Primarily Patriotic/Religious Intent',
      50: 'Sound Equipment or Electronic Enhancement',
    }
    return penaltyMap[params[0]];
  }
}

export default helper(fooBar);

import { not } from '@ember/object/computed';
import { computed } from '@ember/object';
import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default Model.extend({
  status: attr('outcome-status'),
  num: attr('number'),
  winner: attr('string'),

  awardId: attr('string'),
  name: attr('string'),
  kind: attr('award-kind'),
  gender: attr('award-gender'),
  level: attr('award-level'),
  season: attr('award-season'),
  description: attr('string'),
  district: attr('award-district'),
  division: attr('award-division'),
  age: attr('award-age'),
  isNovice: attr('boolean'),
  isSingle: attr('boolean'),
  size: attr('string'),
  sizeRange: attr('string'),
  scope: attr('string'),
  scopeRange: attr('string'),
  treeSort: attr('string'),
  printed: attr('boolean'),
  printOnFinalsOss: attr('boolean'),

  round: belongsTo('round', {async: true, inverse: 'outcomes'}),
  appearances: hasMany('appearance', {async: true, inverse: 'outcomes'}),
  permissions: attr(),

  isFinals: computed(
    'round',
    function() {
      if (this.round.get('kind') == 'Finals') {
        return true;
      }
      return false;
    }
  ),

  isDisabled: not(
    'permissions.write'
  ),

  disablePrinted: computed(
    'round',
    function() {
      if (this.round.get('status') == 'Published') {
        return true;
      }
      return this.get('printOnFinalsOss');
    }
  ),

  order: computed(
    'num',
    'treeSort',
    function() {
      if (this.treeSort) {
        return this.treeSort;
      } else {
        return this.num;
      }
    }
  ),

});

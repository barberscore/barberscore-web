import Component from '@ember/component';
import { sort } from '@ember/object/computed';
import config from '../config/environment';
import { computed } from '@ember/object';

export default Component.extend({
  sortedAppearancesProperties: [
    'roundNum:desc',
  ],
  sortedAppearances: sort(
    'model.appearances',
    'sortedAppearancesProperties',
  ),
  apiHost: config.APP.API_HOST,
  csa: computed(
    'apiHost',
    'model',
    function() {
      return this.get('apiHost')+this.get('model.csa');
    }
  ),
});

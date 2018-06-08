import Component from '@ember/component';
import config from '../config/environment';
import { computed } from '@ember/object';

export default Component.extend({
  apiHost: config.APP.API_HOST,
  legacy: computed(
    'apiHost',
    'model',
    function() {
      return this.get('apiHost')+this.get('model.legacy');
    }
  ),
  drcj: computed(
    'apiHost',
    'model',
    function() {
      return this.get('apiHost')+this.get('model.drcj');
    }
  ),
  contact: computed(
    'apiHost',
    'model',
    function() {
      return this.get('apiHost')+this.get('model.contact');
    }
  )
});

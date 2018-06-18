import Component from '@ember/component';
import config from '../config/environment';
import { computed } from '@ember/object';

export default Component.extend({
  apiHost: config.APP.API_HOST,
  oss: computed(
    'apiHost',
    'model',
    function() {
      return this.get('apiHost')+this.get('model.session.oss');
    }
  ),
});

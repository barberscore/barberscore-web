import Component from '@ember/component';
import config from '../config/environment';
import { computed } from '@ember/object';

export default Component.extend({
  apiHost: config.APP.API_HOST,
  oss: computed(
    'apiHost',
    'model',
    function() {
      return this.get('apiHost')+this.get('model.oss');
    }
  ),
  sa: computed(
    'apiHost',
    'model',
    function() {
      return this.get('apiHost')+this.get('model.sa');
    }
  ),
  announcements: computed(
    'apiHost',
    'model',
    function() {
      return this.get('apiHost')+this.get('model.announcements');
    }
  ),
  sung: computed(
    'apiHost',
    'model',
    function() {
      return this.get('apiHost')+this.get('model.sung');
    }
  ),
});

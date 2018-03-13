import Component from '@ember/component';
import config from '../config/environment';
import { computed } from '@ember/object';

export default Component.extend({
  apiHost: config.APP.API_HOST_DIRECT,
  legacy: computed(
    'apiHost',
    'model',
    function() {
      return this.get('apiHost')+"/api/session/"+this.get('model.id')+"/legacy";
    }
  ),
  drcj: computed(
    'apiHost',
    'model',
    function() {
      return this.get('apiHost')+"/api/session/"+this.get('model.id')+"/drcj";
    }
  ),
  contact: computed(
    'apiHost',
    'model',
    function() {
      return this.get('apiHost')+"/api/session/"+this.get('model.id')+"/contact";
    }
  )
});

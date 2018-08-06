import Component from '@ember/component';
import config from '../config/environment';

export default Component.extend({
  actions: {
    clickRoster() {
      let apiHost = config.APP.API_HOST;
      let modelId = this.get('model.id');
      let url = `${apiHost}/api/group/${modelId}/roster`;
     return window.open(url);
    },
  },
});

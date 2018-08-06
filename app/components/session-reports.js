import Component from '@ember/component';
import config from '../config/environment';

export default Component.extend({
  actions: {
    clickLegacy() {
      let apiHost = config.APP.API_HOST;
      let modelId = this.get('model.id');
      let url = `${apiHost}/api/session/${modelId}/legacy`;
     return window.open(url);
    },
    clickDrcj() {
      let apiHost = config.APP.API_HOST;
      let modelId = this.get('model.id');
      let url = `${apiHost}/api/session/${modelId}/drcj`;
     return window.open(url);
    },
    clickContact() {
      let apiHost = config.APP.API_HOST;
      let modelId = this.get('model.id');
      let url = `${apiHost}/api/session/${modelId}/contact`;
     return window.open(url);
    },
  },
});

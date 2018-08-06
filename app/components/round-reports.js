import Component from '@ember/component';
import config from '../config/environment';

export default Component.extend({
  actions: {
    clickOss() {
      let apiHost = config.APP.API_HOST;
      let modelId = this.get('model.id');
      let url = `${apiHost}/api/round/${modelId}/ossdraft`;
     return window.open(url);
    },
    clickSa() {
      let apiHost = config.APP.API_HOST;
      let modelId = this.get('model.id');
      let url = `${apiHost}/api/round/${modelId}/sadraft`;
     return window.open(url);
    },
    clickAnnouncements() {
      let apiHost = config.APP.API_HOST;
      let modelId = this.get('model.id');
      let url = `${apiHost}/api/round/${modelId}/announcements`;
     return window.open(url);
    },
    clickSung() {
      let apiHost = config.APP.API_HOST;
      let modelId = this.get('model.id');
      let url = `${apiHost}/api/round/${modelId}/sung`;
     return window.open(url);
    },
  }
});

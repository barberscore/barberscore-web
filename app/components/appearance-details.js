import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import config from '../config/environment';

export default Component.extend({
  flashMessages: service(),
  autosave: task(function* (value){
    this.get('model').set('pos', value);
    yield timeout(1000);
    try {
      yield this.get('model').save();
      this.get('flashMessages').success("Saved");
    } catch(e) {
      e.errors.forEach((error) => {
        this.get('flashMessages').danger(error.detail);
      })
    }
  }).restartable(),
  actions: {
    clickCsa() {
      let apiHost = config.APP.API_HOST;
      let modelId = this.get('model.competitor.id');
      let url = `${apiHost}/api/competitor/${modelId}/csadraft`;
     return window.open(url);
    },
  },
});

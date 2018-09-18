import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  router: service(),
  actions: {
    trans(model) {
      return this.get('router').transitionTo(this.currentRouteName, model.get('id'));
    }
  }
});

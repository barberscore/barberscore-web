import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { later } from '@ember/runloop';

export default Component.extend({
  router: service(),
  disableButtons: false,
  actions: {
    trans(model) {
      const that = this;
      this.set('disableButtons', true);
      later(() => {
        that.set('disableButtons', false);
      }, 500);
      this.router.transitionTo(this.router.currentRouteName, model.get('id'));
    }
  }
});

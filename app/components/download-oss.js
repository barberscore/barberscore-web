import Component from '@ember/component';
import { task } from 'ember-concurrency';

export default Component.extend({
  ossdraft: task(function *() {
    try {
      let pdf = yield this.model.ossdraft();
      this.saveFileAs('oss.pdf', pdf, 'application/pdf');
    } catch(e) {
      console.log(e);
    }
  }).drop(),
});

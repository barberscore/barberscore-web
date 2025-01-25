import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  flashMessages: service(),
  tagName: 'span',
  variance: task(function *() {
    let pdf = yield this.model.variance();
    let fileName = `${this.model.name} Variance Report`;
    this.saveFileAs(fileName, pdf, 'application/pdf');
    this.flashMessages.success("Downloaded!");
  }).drop(),
});

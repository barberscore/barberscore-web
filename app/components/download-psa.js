import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  flashMessages: service(),
  psa: task(function *() {
    let pdf = yield this.model.psa();
    let fileName = `${this.model.conventionName} ${this.model.sessionKind} ${this.model.roundKind} ${this.model.personName} PSA`;
    this.saveFileAs(fileName, pdf, 'application/pdf');
    this.flashMessages.success("Downloaded!");
  }).drop(),
});

import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  flashMessages: service(),
  fileDownload: service(),
  psa: task(function *() {
    let fileName = `${this.model.conventionName} ${this.model.sessionKind} ${this.model.roundKind} ${this.model.personName} PSA`;
    this.fileDownload.downloadFile(this.model, 'psa', fileName, 'application/pdf');
    this.flashMessages.success("Downloaded!");
  }).drop(),
});

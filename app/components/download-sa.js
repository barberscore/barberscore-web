import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  flashMessages: service(),
  fileDownload: service(),
  sa: task(function *() {
    let model = this.model;
    let fileName = `${model.scoresheetFilename} SA.pdf`;
    yield this.fileDownload.downloadFile(this.model, 'sa', fileName, 'application/pdf');
    this.flashMessages.success("Downloaded!");
  }).drop(),
});

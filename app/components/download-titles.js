import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  flashMessages: service(),
  fileDownload: service(),
  titles: task(function *() {
    // let pdf = yield this.model.titles();
    let fileName = `${this.model.nomen} Titles Report`;
    // this.saveFileAs(fileName, pdf, 'application/pdf');
    this.fileDownload.downloadFile(this.model, 'titles', fileName, 'application/pdf');
    this.flashMessages.success("Downloaded!");
  }).drop(),
});

import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  flashMessages: service(),
  fileDownload: service(),
  tagName: 'span',
  variance: task(function *() {
    let fileName = `${this.model.name} Variance Report`;
    yield this.fileDownload.downloadFile(this.model, 'variance', fileName, 'application/pdf');
    this.flashMessages.success("Downloaded!");
  }).drop(),
});

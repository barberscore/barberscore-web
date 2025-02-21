import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  flashMessages: service(),
  fileDownload: service(),
  announcements: task(function *() {
    let fileName = `${this.model.nomen} Announcements`;
    this.fileDownload.downloadFile(this.model, 'announcements', fileName, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    // this.saveFileAs(fileName, docx, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    this.flashMessages.success("Downloaded!");
  }).drop(),
});

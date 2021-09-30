import Component from '@ember/component';
import { task } from 'ember-concurrency';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';
import { inject as service } from '@ember/service';

export default Component.extend(FileSaverMixin,{
  flashMessages: service(),
  bbstix: task(function *() {
    let docx = yield this.model.bbstix();
    let fileName = `${this.model.bbstixBaseFilename}_BBStix`;
    this.saveFileAs(fileName, docx, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    this.flashMessages.success("Downloaded!");
  }).drop(),
});

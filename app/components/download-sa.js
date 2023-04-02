import Component from '@ember/component';
import { task } from 'ember-concurrency';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';
import { inject as service } from '@ember/service';

export default Component.extend(FileSaverMixin,{
  flashMessages: service(),
  sa: task(function *() {
    let model = yield this.model.reload();
    let pdf = yield this.model.sa();
    let fileName = `${model.scoresheetFilename} SA`;
    this.saveFileAs(fileName, pdf, 'application/pdf');
    this.flashMessages.success("Downloaded!");
  }).drop(),
});

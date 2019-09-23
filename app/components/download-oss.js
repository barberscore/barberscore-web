import Component from '@ember/component';
import { task } from 'ember-concurrency';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';
import { inject as service } from '@ember/service';

export default Component.extend(FileSaverMixin,{
  flashMessages: service(),
  oss: task(function *() {
    let pdf = yield this.model.oss();
    let fileName = `${this.model.nomen} OSS`;
    this.saveFileAs(fileName, pdf, 'application/pdf');
    this.flashMessages.success("Downloaded!");
  }).drop(),
});

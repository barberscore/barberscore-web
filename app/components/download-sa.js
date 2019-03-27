import Component from '@ember/component';
import { task } from 'ember-concurrency';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';

export default Component.extend(FileSaverMixin,{
  sa: task(function *() {
    let pdf = yield this.model.sa();
    this.saveFileAs('sa.pdf', pdf, 'application/pdf');
  }).drop(),
});

import Component from '@ember/component';
import { task } from 'ember-concurrency';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';

export default Component.extend(FileSaverMixin,{
  psa: task(function *() {
    let pdf = yield this.model.psa();
    this.saveFileAs('psa.pdf', pdf, 'application/pdf');
  }).drop(),
});

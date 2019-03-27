import Component from '@ember/component';
import { task } from 'ember-concurrency';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';

export default Component.extend(FileSaverMixin,{
  sung: task(function *() {
    let pdf = yield this.model.sung();
    this.saveFileAs('sung.pdf', pdf, 'application/pdf');
  }).drop(),
});

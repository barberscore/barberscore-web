import Component from '@ember/component';
import { task } from 'ember-concurrency';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';

export default Component.extend(FileSaverMixin,{
  contact: task(function *() {
    let xlsx = yield this.model.contact();
    let fileName = `${this.model.conventionName} ${this.model.kind} Session Contact Report`;
    this.saveFileAs(fileName, xlsx, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  }).drop(),
});

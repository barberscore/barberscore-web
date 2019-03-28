import Component from '@ember/component';
import { task } from 'ember-concurrency';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';

export default Component.extend(FileSaverMixin,{
  csa: task(function *() {
    let pdf = yield this.model.csa();
    let fileName = `${this.model.conventionName} ${this.model.sessionKind} Session ${this.model.groupName} CSA`;
    this.saveFileAs(fileName, pdf, 'application/pdf');
  }).drop(),
});

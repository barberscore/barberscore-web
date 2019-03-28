import Component from '@ember/component';
import { task } from 'ember-concurrency';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';

export default Component.extend(FileSaverMixin,{
  oss: task(function *() {
    let pdf = yield this.model.oss();
    let fileName = `${this.model.conventionName} ${this.model.sessionKind} ${this.model.kind} OSS`;
    this.saveFileAs(fileName, pdf, 'application/pdf');
  }).drop(),
});

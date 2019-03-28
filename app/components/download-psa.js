import Component from '@ember/component';
import { task } from 'ember-concurrency';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';

export default Component.extend(FileSaverMixin,{
  psa: task(function *() {
    let pdf = yield this.model.psa();
    let fileName = `${this.model.conventionName} ${this.model.sessionKind} ${this.model.roundKind} ${this.model.personName} PSA`;
    this.saveFileAs(fileName, pdf, 'application/pdf');
  }).drop(),
});

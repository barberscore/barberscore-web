import Component from '@ember/component';
import { task } from 'ember-concurrency';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';
import { inject as service } from '@ember/service';

export default Component.extend(FileSaverMixin,{
  flashMessages: service(),
  csa: task(function *() {
    let pdf = yield this.model.csa();
    let groupName = this.model.name.replace(/[^a-zA-Z0-9_ ]/gi, '');
    let fileName = `${groupName} CSA`;
    this.saveFileAs(fileName, pdf, 'application/pdf');
    this.flashMessages.success("Downloaded!");
  }).drop(),
});

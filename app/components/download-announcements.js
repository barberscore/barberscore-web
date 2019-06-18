import Component from '@ember/component';
import { task } from 'ember-concurrency';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';
import { inject as service } from '@ember/service';

export default Component.extend(FileSaverMixin,{
  flashMessages: service(),
  announcements: task(function *() {
    let docx = yield this.model.announcements();
    let fileName = `${this.model.conventionName} ${this.model.sessionKind} ${this.model.kind} Announcements`;
    this.saveFileAs(fileName, docx, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    this.flashMessages.success("Downloaded!");
  }).drop(),
});

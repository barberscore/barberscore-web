import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  flashMessages: service(),
  announcements: task(function *() {
    let docx = yield this.model.announcements();
    let fileName = `${this.model.nomen} Announcements`;
    this.saveFileAs(fileName, docx, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    this.flashMessages.success("Downloaded!");
  }).drop(),
});

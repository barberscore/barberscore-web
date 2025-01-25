import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  flashMessages: service(),
  bbstix: task(function *() {
    let txt = yield this.model.bbstix();
    let fileName = `${this.model.baseFilename}_BBStix`;
    this.saveFileAs(fileName, txt, 'text/plain');
    this.flashMessages.success("Downloaded!");
  }).drop(),
});

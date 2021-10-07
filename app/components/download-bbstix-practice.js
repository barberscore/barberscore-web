import Component from '@ember/component';
import { task } from 'ember-concurrency';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';
import { inject as service } from '@ember/service';

export default Component.extend(FileSaverMixin,{
  flashMessages: service(),
  bbstixPractice: task(function *() {
    let txt = yield this.model.bbstixPractice();
    let fileName = `${this.model.baseFilename}_BBStix2`;
    this.saveFileAs(fileName, txt, 'text/plain');
    this.flashMessages.success("Downloaded!");
  }).drop(),
});

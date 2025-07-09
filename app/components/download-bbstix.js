import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  isLoading: false,
  fileDownload: service(),
  flashMessages: service(),
  actions: {
    downloadBbstix: async function() {
      this.set('isLoading', true);
      let fileName = `${this.model.baseFilename}_BBStix`;
      await this.fileDownload.downloadFile(this.model, 'bbstix', fileName);
      this.set('isLoading', false);
      this.flashMessages.success("Downloaded!");
    }
  }
});

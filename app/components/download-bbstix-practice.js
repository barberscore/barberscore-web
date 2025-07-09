import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  isLoading: false,
  fileDownload: service(),
  flashMessages: service(),
  actions: {
    downloadBbstixPractice: async function() {
      this.set('isLoading', true);
      let fileName = `${this.model.baseFilename}_BBStix2`;
      await this.fileDownload.downloadFile(this.model, 'bbstix_practice', fileName);
      this.set('isLoading', false);
      this.flashMessages.success("Downloaded!");
    }
  }
});

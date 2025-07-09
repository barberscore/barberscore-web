import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  flashMessages: service(),
  fileDownload: service(),
  csa: task(function *() {
    let round = yield this.model.round.reload();
    let orderOfApperance = String(this.model.num).padStart(2, '0');
    let groupName = this.model.name.replace(/[^a-zA-Z0-9_ ]/gi, '');
    let revisionPostfix = '';
    if (round.revisionNumber > 0) {
      revisionPostfix = ' - ' + round.revisionNomen;
    }
    let fileName = `${orderOfApperance} ${groupName} CSA${revisionPostfix}`;
    yield this.fileDownload.downloadFile(this.model, 'csa', fileName, 'application/pdf');
    this.flashMessages.success("Downloaded!");
  }).drop(),
});

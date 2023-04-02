import Component from '@ember/component';
import { task } from 'ember-concurrency';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';
import { inject as service } from '@ember/service';

export default Component.extend(FileSaverMixin,{
  flashMessages: service(),
  csa: task(function *() {
    let pdf = yield this.model.csa();
    let round = yield this.model.round.reload();
    let orderOfApperance = String(this.model.num).padStart(2, '0');
    let groupName = this.model.name.replace(/[^a-zA-Z0-9_ ]/gi, '');
    let revisionPostfix = '';
    if (round.revisionNumber > 0) {
      revisionPostfix = ' - ' + round.revisionNomen;
    }
    let fileName = `${orderOfApperance} ${groupName} CSA${revisionPostfix}`;
    this.saveFileAs(fileName, pdf, 'application/pdf');
    this.flashMessages.success("Downloaded!");
  }).drop(),
});

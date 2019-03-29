import Component from '@ember/component';
import { task } from 'ember-concurrency';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';
import { inject as service } from '@ember/service';

export default Component.extend(FileSaverMixin,{
  flashMessages: service(),
  csa: task(function *() {
    let competitor = yield this.model.competitor;
    let pdf = yield competitor.csa();
    let fileName = `${competitor.conventionName} ${competitor.sessionKind} Session ${competitor.groupName} CSA`;
    this.saveFileAs(fileName, pdf, 'application/pdf');
    this.flashMessages.success("Downloaded!");
  }).drop(),
});

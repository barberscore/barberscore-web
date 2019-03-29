import Component from '@ember/component';
import { task } from 'ember-concurrency';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';
import { inject as service } from '@ember/service';

export default Component.extend(FileSaverMixin,{
  flashMessages: service(),
  drcj: task(function *() {
    let xlsx = yield this.model.drcj();
    let fileName = `${this.model.conventionName} ${this.model.kind} Session DRCJ Report`;
    this.saveFileAs(fileName, xlsx, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    this.flashMessages.success("Downloaded!");
  }).drop(),
});

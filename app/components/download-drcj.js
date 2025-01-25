import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  flashMessages: service(),
  drcj: task(function *() {
    let xlsx = yield this.model.drcj();
    let fileName = `${this.model.nomen} Session DRCJ Report`;
    this.saveFileAs(fileName, xlsx, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    this.flashMessages.success("Downloaded!");
  }).drop(),
});

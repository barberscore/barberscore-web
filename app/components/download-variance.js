import Component from '@ember/component';
import { task } from 'ember-concurrency';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';
import { inject as service } from '@ember/service';

export default Component.extend(FileSaverMixin,{
  flashMessages: service(),
  tagName: 'span',
  variance: task(function *() {
    try {
      let pdf = yield this.model.variance();
      let fileName = `${this.model.conventionName} ${this.model.sessionKind} ${this.model.kind} ${this.model.groupName} Variance Report`;
      this.saveFileAs(fileName, pdf, 'application/pdf');
      this.flashMessages.success("Downloaded!");
    } catch(e) {console.log(e);}
  }).drop(),
});

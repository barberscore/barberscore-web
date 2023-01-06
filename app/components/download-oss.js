import Component from '@ember/component';
import { computed } from '@ember/object';
import { task } from 'ember-concurrency';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';
import { inject as service } from '@ember/service';

export default Component.extend(FileSaverMixin,{
  flashMessages: service(),
  filename: computed(
    'model',
    function() {
      return `${this.model.nomen} OSS`
        .replace(/ /g,'-')
        .replace(/_/g,'-')
        .replace(/[^\w-]+/g,'')
        .replace(/--+/g,'-');
    }
  ),
  oss: task(function *(paperSize) {
    let pdf = yield this.model.oss({ paperSize: paperSize });
    let fileName = this.filename;
    this.saveFileAs(fileName, pdf, 'application/pdf');
    this.flashMessages.success("Downloaded!");
  }).drop(),
});

import Component from '@ember/component';
import { task } from 'ember-concurrency';
import FileSaverMixin from 'ember-cli-file-saver/mixins/file-saver';
import { inject as service } from '@ember/service';

export default Component.extend(FileSaverMixin,{
  flashMessages: service(),
  filename: function(name) {
    return `${name} OSS`
    .replace(/ /g,'-')
    .replace(/_/g,'-')
    .replace(/[^\w-]+/g,'')
    .replace(/--+/g,'-');
  },
  oss: task(function *(paperSize) {
    let model = yield this.model.reload();
    let pdf = yield this.model.oss({ paperSize: paperSize });
    let fileName = this.filename(model.scoresheetFilename);
    this.saveFileAs(fileName, pdf, 'application/pdf');
    this.flashMessages.success("Downloaded!");
  }).drop(),
});

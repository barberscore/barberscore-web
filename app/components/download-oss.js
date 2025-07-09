import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  flashMessages: service(),
  fileDownload: service(),
  filename: function(name) {
    return `${name} OSS`
    .replace(/ /g,'-')
    .replace(/_/g,'-')
    .replace(/[^\w-]+/g,'')
    .replace(/--+/g,'-');
  },
  oss: task(function *(paperSize) {
    let model = this.model;
    let fileName = this.filename(model.scoresheetFilename);
    yield this.fileDownload.downloadFile(this.model, 'oss', fileName, 'application/pdf', { paperSize: paperSize });
    this.flashMessages.success("Downloaded!");
  }).drop(),
});

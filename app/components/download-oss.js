import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  flashMessages: service(),
  fileDownload: service(),
  store: service(),
  filename: function(name, sessionKind, roundKind) {
    let suffix = `${(sessionKind || '').charAt(0)}${(roundKind || '').charAt(0)}`;
    return `${name} ${suffix} OSS`
    .replace(/ /g,'-')
    .replace(/_/g,'-')
    .replace(/[^\w-]+/g,'')
    .replace(/--+/g,'-');
  },
  oss: task(function *(paperSize) {
    let model = this.model;
    let sessionKind = model.sessionKind || '';
    let conventionName = '';
    if (model.conventionId) {
      let convention = this.store.peekRecord('convention', model.conventionId);
      if (convention) {
        conventionName = convention.get('nomen') || '';
      }
    }
    let baseName = `${conventionName} ${sessionKind} ${model.kind}`.trim();
    let fileName = this.filename(baseName);
    yield this.fileDownload.downloadFile(this.model, 'oss', fileName, 'application/pdf', { paperSize: paperSize });
    this.flashMessages.success("Downloaded!");
  }).drop(),
});

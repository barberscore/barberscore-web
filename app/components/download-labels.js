import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { filterBy } from '@ember/object/computed';
import { task } from 'ember-concurrency';

export default Component.extend({
  init: function(){
    this._super();
    this.setPanelists();
    this.setAppearances();
  },
  currentUser: service(),
  fileDownload: service(),
  store: service(),
  router: service(),
  flashMessages: service(),
  setPanelists: function() {
    const that = this;
    this.get('model.panelists').then(function(panelists) {
      panelists = panelists.filter(function(panelist) {
        return panelist.isScoring;
      });
      that.set('filteredPanelists', panelists);
    });
  },
  setAppearances: function() {
    const that = this;
    this.get('model.appearances').then(function(appearances) {
      appearances = appearances.map(function(app) {
        return app;
      });
      that.set('appearances', appearances);
    });
  },
  labelsModal: false,
  labelsModalError: false,
  isReversed: false,
  postfix: "",
  judges: null,
  groups: null,
  filteredPanelists: [],
  panelists: [],
  appearances: [],
  getAppearances: task(function *() {
    let appearances = yield this.model.get('appearances');
    return appearances;
  }).drop(),
  labels: task(function *() {
    try {
      /* let rtf = yield this.model.labels({
        'postfix': this.get('postfix'),
        'judges': this.get('judges'),
        'groups': this.get('groups'),
        'isReversed': this.get('isReversed'),
      });
      let postfix = `${this.get('postfix')}`.trim();

      this.saveFileAs(fileName, rtf, 'application/rtf'); */
      let fileName = `${this.model.baseFilename}_Lbls${(postfix ? '_' + postfix : '')}.rtf`;
      let data = {
        'postfix': this.get('postfix'),
        'judges': this.get('judges'),
        'groups': this.get('groups'),
        'isReversed': this.get('isReversed'),
      };
      this.fileDownload.downloadFile(this.model, 'labels', fileName, 'application/rtf', data, 'POST');

      this.set('labelsModal', false);
      this.set('labelsModalError', false);
      this.set('postfix', "");
      this.set('judges', null);
      this.set('groups', null);
      this.set('isReversed', false);
      this.flashMessages.success("Downloaded!");
    } catch(e) {
      this.flashMessages.danger(e);
      this.set('labelsModalError', true);
    }
  }).drop()
});

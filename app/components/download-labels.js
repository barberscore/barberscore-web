import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { filterBy } from '@ember/object/computed';
import { task } from 'ember-concurrency';

export default Component.extend({
  init: function(){
    this._super();
    this.panelists = this.filteredPanelists;
    this.appearances = this.model.get('appearances');
  },
  currentUser: service(),
  store: service(),
  router: service(),
  flashMessages: service(),
  labelsModal: false,
  labelsModalError: false,
  isReversed: false,
  postfix: "",
  judges: null,
  groups: null,
  filteredPanelists: filterBy(
      'model.panelists',
      'isScoring',
  ),
  panelists: {},
  appearances: {},
  getAppearances: task(function *() {
    let appearances = yield this.model.get('appearances');
    return appearances;
  }).drop(),
  labels: task(function *() {
    try {
      let rtf = yield this.model.labels({
        'postfix': this.get('postfix'),
        'judges': this.get('judges'),
        'groups': this.get('groups'),
        'isReversed': this.get('isReversed'),
      });
      let postfix = `${this.get('postfix')}`.trim();
      let fileName = `${this.model.baseFilename}_Lbls${(postfix ? '_' + postfix : '')}.rtf`;

      this.saveFileAs(fileName, rtf, 'application/rtf');
      this.set('labelsModal', false);
      this.set('labelsModalError', false);
      this.set('postfix', "");
      this.set('judges', null);
      this.set('groups', null);
      this.set('isReversed', false);
      this.flashMessages.success("Downloaded!");
    } catch(e) {
      this.flashMessages.error(e);
      this.set('labelsModalError', true);
    }
  }).drop()
});

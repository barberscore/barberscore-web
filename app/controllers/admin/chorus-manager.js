import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  collapseChorus: false,
  actions: {
    collapseHeader() {
      this.toggleProperty('collapseChorus');
    },
    transitionGroup(group) {
      this.transitionToRoute('admin.chorus-manager.chorus', group);
    },
    searchGroup(term) {
      return new Ember.RSVP.Promise((resolve, reject) => {
        Ember.run.debounce(this, this._performSearch, term, resolve, reject, 600);
      });
    },
  },
  _performSearch(term, resolve, reject) {
    if (Ember.isBlank(term)) { return resolve([]); }
    this.get('store').query('group', {'nomen__icontains': term, 'kind': 2})
      .then(data => resolve(data), reject);
  }
});

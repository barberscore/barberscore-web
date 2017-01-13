import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',
  store: Ember.inject.service(),
  statusOptions: [
      'New',
      'Scheduled',
      'Confirmed',
      'Validated',
      'Final',
  ],
  actions: {
    searchAssignment(term) {
      return new Ember.RSVP.Promise((resolve, reject) => {
        Ember.run.debounce(this, this._performSearch, term, resolve, reject, 600);
      });
    },
  },
  _performSearch(term, resolve, reject) {
    if (Ember.isBlank(term)) { return resolve([]); }
    this.get('store').query('judge', {'nomen__icontains': term})
      .then(data => resolve(data), reject);
  }
});

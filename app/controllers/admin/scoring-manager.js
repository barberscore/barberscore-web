import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  sessionSortProperties: [
    'convention.start_date:asc',
  ],
  sortedSessions: Ember.computed.sort(
    'model',
    'sessionSortProperties'
  ),
  actions: {
    sortBy(sessionSortProperties) {
      this.set('sessionSortProperties', [sessionSortProperties]);
    },
    transitionSession(session) {
      this.transitionToRoute('admin.contest-manager.session', session);
    },
    searchSession(term) {
      return new Ember.RSVP.Promise((resolve, reject) => {
        Ember.run.debounce(this, this._performSearch, term, resolve, reject, 600);
      });
    },
  },
  _performSearch(term, resolve, reject) {
    if (Ember.isBlank(term)) { return resolve([]); }
    this.get('store').query('session', {'nomen__icontains': term})
      .then(data => resolve(data), reject);
  }
});

import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    saveRecord(submission) {
      this.model.set('chart', submission.get('chart'));
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.save()
      .then(() => {
        // flashMessages.success('Success');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
    searchSubmission(term) {
      return new Ember.RSVP.Promise((resolve, reject) => {
        Ember.run.debounce(this, this._performSearch, term, resolve, reject, 600);
      });
    }
  },
  _performSearch(term, resolve, reject) {
    if (Ember.isBlank(term)) { return resolve([]); }
    this.get('store').query('submission', {'performer__id': this.model.get('performance.performer.id')})
      .then(data => resolve(data), reject);
  },
  foos: function() {
     return this.model.get('performance.performer.submissions');
  }
});

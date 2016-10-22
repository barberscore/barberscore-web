import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    saveJudge() {
      var judge = this.get('store').createRecord('judge', {
        person: this.get('person'),
        category: this.get('category'),
        kind: this.get('kind'),
        status: this.get('status'),
      });
      const flashMessages = Ember.get(this, 'flashMessages');
      judge.save()
      .then(() => {
        this.set('person', null);
        this.set('category', null);
        this.set('kind', null);
        this.set('status', null);
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
    searchPerson(term) {
      return new Ember.RSVP.Promise((resolve, reject) => {
        Ember.run.debounce(this, this._performSearch, term, resolve, reject, 600);
      });
    },
  },
  judgeKind: [
    'Certified',
    'Candidate',
  ],
  judgeStatus: [
    'Active',
    'Inactive',
  ],
  judgeCategory: [
    'Admin',
    'Music',
    'Presentation',
    'Singing',
  ],
  _performSearch(term, resolve, reject) {
    if (Ember.isBlank(term)) { return resolve([]); }
    this.get('store').query('person', {'name__icontains': term})
      .then(data => resolve(data), reject);
  }
});

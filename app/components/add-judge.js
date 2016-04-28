import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    saveJudge() {
      var judge = this.get('store').createRecord('judge', {
        session: this.get('model'),
        certification: this.get('certification'),
        kind: "Official",
        category: this.get('certification.category'),
      });
      const flashMessages = Ember.get(this, 'flashMessages');
      judge.save()
      .then(() => {
        flashMessages.success('Judge Added');
        this.set('certification', null);
        this.set('kind', null);
        this.set('category', null);
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
    searchJudge(term) {
      return new Ember.RSVP.Promise((resolve, reject) => {
        Ember.run.debounce(this, this._performSearch, term, resolve, reject, 600);
      });
    },
  },
  judgeKind: [
    'Official',
    'Practice',
  ],
  judgeCategory: [
    'Music',
    'Presentation',
    'Singing',
  ],
  _performSearch(term, resolve, reject) {
    if (Ember.isBlank(term)) { return resolve([]); }
    this.get('store').query('certification', {'name__icontains': term})
      .then(data => resolve(data), reject);
  }
});

import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    saveRecord() {
      const flashMessages = Ember.get(this, 'flashMessages');
      var assistant = this.get('store').createRecord('assistant', {
        session: this.get('session'),
        person: this.get('person'),
        kind: this.get('kind'),
      });
      assistant.save()
      .then(() => {
        flashMessages.success('Assistant Added');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
    searchPerson(term) {
      return new Ember.RSVP.Promise((resolve, reject) => {
        Ember.run.debounce(this, this._performSearch, term, 'person', resolve, reject, 600);
      });
    },
  },
  _performSearch(term, model, resolve, reject) {
    if (Ember.isBlank(term)) { return resolve([]); }
    this.get('store').query(model, {'name__icontains': term})
      .then(data => resolve(data), reject);
  },
  assistantKind: [
    'Official',
    'Practice',
    'Composite',
  ],
});

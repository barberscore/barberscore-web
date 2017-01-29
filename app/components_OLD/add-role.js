import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    saveRole() {
var role = this.get('store').createRecord('role', {
        group: this.get('group'),
        person: this.get('person'),
        part: this.get('part'),
      });
      role.save()
      .then(() => {
        // this.get('flashMessages').success('Success');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
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
    this.get('store').query(model, {'nomen__icontains': term})
      .then(data => resolve(data), reject);
  },
  rolePart: [
    'Tenor',
    'Lead',
    'Baritone',
    'Bass',
    'Director',
  ],
});

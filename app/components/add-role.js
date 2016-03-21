import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    saveRecord() {
      const flashMessages = Ember.get(this, 'flashMessages');
      // var organization = this.get('group').organization;
      // console.log(organization);
      var role = this.get('store').createRecord('role', {
        performer: this.get('performer'),
        person: this.get('person'),
        part: this.get('part'),
      });
      role.save()
      .then(() => {
        // flashMessages.success('Success');
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
  rolePart: [
    'Tenor',
    'Lead',
    'Baritone',
    'Bass',
    'Director',
  ],
});

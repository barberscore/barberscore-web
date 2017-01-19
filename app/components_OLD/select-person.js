import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    saveRecord(person) {
      this.model.set('person', person);
      isCollapsed:      this.model.save()
      .then(() => {
        // this.get('flashMessages').success('Success');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    },
    searchPerson(term) {
      return new Ember.RSVP.Promise((resolve, reject) => {
        Ember.run.debounce(this, this._performSearch, term, resolve, reject, 600);
      });
    }
  },
  _performSearch(term, resolve, reject) {
    if (Ember.isBlank(term)) { return resolve([]); }
    this.get('store').query('person', {'name__icontains': term})
      .then(data => resolve(data), reject);
  },
});

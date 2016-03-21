import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    saveRecord(person) {
      this.model.set('person', person);
      // const flashMessages = Ember.get(this, 'flashMessages');
      this.model.save();
      // .then(() => {
        // // flashMessages.success('Success');
      // })
      // .catch(() => {
        // flashMessages.danger('Error');
      // });
    },
    searchJudge(term) {
      return new Ember.RSVP.Promise((resolve, reject) => {
        Ember.run.debounce(this, this._performSearch, term, resolve, reject, 600);
      });
    }
  },
  _performSearch(term, resolve, reject) {
    if (Ember.isBlank(term)) { return resolve([]); }
    this.get('store').query('person', {'name__icontains': term, 'certifications__category': '1,2,3'})
      .then(data => resolve(data), reject);
  },
});

import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    searchVenue(term) {
      return new Ember.RSVP.Promise((resolve, reject) => {
        Ember.run.debounce(this, this._performSearch, term, resolve, reject, 600);
      });
    },
   createVenue(venueName) {
      let newVenue = this.get('store').createRecord('venue', {
        name: venueName,
      });
      newVenue.save();
      this.set('venue', newVenue);
    },
  },
  _performSearch(term, resolve, reject) {
    if (Ember.isBlank(term)) { return resolve([]); }
    this.get('store').query('venue', {'name__icontains': term})
      .then(data => resolve(data), reject);
  },
});

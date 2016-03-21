import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    saveRecord() {
      const flashMessages = Ember.get(this, 'flashMessages');
      // var organization = this.get('group').organization;
      // console.log(organization);
      var contest = this.get('store').createRecord('contest', {
        session: this.get('session'),
        award: this.get('award'),
      });
      contest.save()
      .then(() => {
        // flashMessages.success('Success');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
    searchAward(term) {
      return new Ember.RSVP.Promise((resolve, reject) => {
        Ember.run.debounce(this, this._performSearch, term, 'award', resolve, reject, 600);
      });
    },
  },
  _performSearch(term, model, resolve, reject) {
    if (Ember.isBlank(term)) { return resolve([]); }
    this.get('store').query(model, {'name__icontains': term})
      .then(data => resolve(data), reject);
  }
});

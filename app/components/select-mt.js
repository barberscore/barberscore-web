import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    searchGroup(term) {
      return new Ember.RSVP.Promise((resolve, reject) => {
        Ember.run.debounce(this, this._performSearch, term, resolve, reject, 600);
      });
    },
   createGroup(groupName) {
      let newGroup = this.get('store').createRecord('group', {
        name: groupName,
      });
      newGroup.save();
      this.set('group', newGroup);
    },
  },
  _performSearch(term, resolve, reject) {
    if (Ember.isBlank(term)) { return resolve([]); }
    this.get('store').query('group', {'nomen__icontains': term})
      .then(data => resolve(data), reject);
  },
});

import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    saveRecord(group) {
      isCollapsed:      var performer = this.get('store').createRecord('performer', {
        session: this.get('session'),
        group: group,
      });
      performer.save()
      .then(() => {
        this.set('group', null);
        this.get('flashMessages').success('Success');
      })
      .catch((error) => {
        performer.deleteRecord();
        console.log(error);
        this.get('flashMessages').danger('Error');
      });
    },
    searchGroup(term) {
      let kind = (this.get('session.kind') === 'Chorus') ? 2 : 1;
      return new Ember.RSVP.Promise((resolve, reject) => {
        Ember.run.debounce(this, this._performSearch, term, 'group', kind, resolve, reject, 600);
      });
    },
    searchOrganization(term) {
      return new Ember.RSVP.Promise((resolve, reject) => {
        Ember.run.debounce(this, this._performSearch, term, 'organization', resolve, reject, 600);
      });
    }
  },
  _performSearch(term, model, kind, resolve, reject) {
    if (Ember.isBlank(term)) { return resolve([]); }
    this.get('store').query(model, {'nomen__icontains': term, 'kind': kind, 'status': 10})
      .then(data => resolve(data), reject);
  }
});

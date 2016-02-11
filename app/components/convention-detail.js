import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  isDisabled: true,
  actions: {
    editConvention: function() {
      this.set('isDisabled', false);
    },
    saveRecord: function() {
      this.get('model').save();
    },
    searchRepo(term) {
      return this.get('store').query('person', {'name__icontains': term});
    }
  },
  statusChoices: [
    'New',
    'Started',
    'Finished',
    'Final'
  ],
  kindChoices: [
    'International',
    'Midwinter',
    'Fall',
    'Spring',
    'Video',
  ],
});

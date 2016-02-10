import Ember from 'ember';

export default Ember.Component.extend({
  isDisabled: true,
  actions: {
    editConvention: function() {
      this.set('isDisabled', false);
      this.set('organizationChoices', function () {
        this.store.findAll('organization');
      }
    },
    saveRecord: function() {
      this.get('model').save();
    },
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
  organizationChoices: this.store.findAll('organization').toArray()
});

import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    saveRecord() {
      const flashMessages = Ember.get(this, 'flashMessages');
      var convention = this.get('store').createRecord('convention', {
        level: this.get('level'),
        year: this.get('year'),
      });
      convention.save()
      .then(() => {
        flashMessages.success('Convention Added');
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    }
  },
  levelChoices: [
    'International',
    'District',
    'Division',
  ],
});


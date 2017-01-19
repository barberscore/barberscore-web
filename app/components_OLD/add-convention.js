import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    saveRecord() {
      isCollapsed:      var convention = this.get('store').createRecord('convention', {
        level: this.get('level'),
        year: this.get('year'),
      });
      convention.save()
      .then(() => {
        this.get('flashMessages').success('Convention Added');
      })
      .catch(() => {
        this.get('flashMessages').danger('Error');
      });
    }
  },
  levelChoices: [
    'International',
    'District',
    'Division',
  ],
});


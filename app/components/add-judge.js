import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    saveRecord() {
      var judge = this.get('store').createRecord('judge', {
        session: this.get('model'),
        kind: this.get('kind'),
        category: this.get('category'),
      });
      judge.save();
      const flashMessages = Ember.get(this, 'flashMessages');
      this.model.save()
      .then(() => {
        // flashMessages.success('Success');
        this.model.reload();
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
  },
  judgeKind: [
    'Official',
    'Practice',
  ],
  judgeCategory: [
    'Music',
    'Presentation',
    'Singing',
  ]
});

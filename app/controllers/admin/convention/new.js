import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  actions: {
    cancelConvention() {
      this.model.rollbackAttributes();
      this.set('isEditing', false);
    },
    saveConvention() {
      const flashMessages = Ember.get(this, 'flashMessages');
      var convention = this.store.createRecord('convention', {
        drcj: this.get('drcj'),
        venue: this.get('venue'),
        season: this.get('venue'),
        date: {},
      });
      convention.save()
      .then(response => {
        flashMessages.success('Saved');
        this.store.pushPayload('convention', response);
        this.transitionToRoute('admin.convention', convention);
      })
      .catch(() => {
        flashMessages.danger('Error');
      });
    },
    updateDate(start, end) {
      this.model.set('date.lower', start);
      this.model.set('date.upper', end);
    },
  }
});

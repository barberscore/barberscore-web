import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  openModal: false,
  actions: {
    saveChart(){
      this.get('model').save()
      .then(() => {
        this.set('openModal', false);
        this.get('flashMessages').success('Saved');
      });
    },
    clearChart() {
      this.get('model').deleteRecord();
      this.set('openModal', false);
    },
  },
});

import Ember from 'ember';

export default Ember.Component.extend({
  isOpen: false,
  actions: {
    openModal() {
      this.set('isOpen', true);
    }
  }
});

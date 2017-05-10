import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  actions: {
    deactivateOfficer() {
      this.get('model').deactivate()
      .then((response) => {
        this.get('store').pushPayload('officer', response);
        this.get('flashMessages').success("Deactivated");
      });
    },
  }
});
